export type DnsRecordType = 'A' | 'AAAA' | 'CNAME' | 'MX' | 'TXT' | 'NS';

export const DNS_RECORD_TYPES: DnsRecordType[] = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS'];

const RECORD_TYPE_CODES: Record<DnsRecordType, number> = {
  A: 1,
  NS: 2,
  CNAME: 5,
  MX: 15,
  TXT: 16,
  AAAA: 28,
};

export interface DnsResolverSpec {
  id: string;
  location: string;
  provider: string;
  server: string;
  endpoint: string;
}

export const DOH_RESOLVERS: DnsResolverSpec[] = [
  {
    id: 'google',
    location: 'Global Anycast (Google)',
    provider: 'Google Public DNS',
    server: '8.8.8.8',
    endpoint: 'https://dns.google/resolve',
  },
  {
    id: 'cloudflare',
    location: 'Global Anycast (Cloudflare)',
    provider: 'Cloudflare DNS',
    server: '1.1.1.1',
    endpoint: 'https://cloudflare-dns.com/dns-query',
  },
];

export interface DnsLocationResult {
  location: string;
  provider: string;
  server: string;
  recordType: DnsRecordType;
  answers: string[];
  ttl: number | null;
  rcode: number;
  latencyMs: number;
  ip: string;
  status: 'propagated' | 'mismatch' | 'pending' | 'error';
  error?: string;
}

const DOMAIN_REGEX =
  /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;

export function normalizeDomain(rawDomain: string): string {
  return (rawDomain || '').trim().replace(/\.+$/, '').toLowerCase();
}

export function isValidDomain(rawDomain: string): boolean {
  const domain = normalizeDomain(rawDomain);
  return DOMAIN_REGEX.test(domain);
}

export function buildDohRequestUrl(
  endpoint: string,
  domain: string,
  recordType: DnsRecordType,
): string {
  const url = new URL(endpoint);
  url.searchParams.set('name', domain);
  url.searchParams.set('type', recordType);
  return url.toString();
}

interface DohAnswerEntry {
  type?: number;
  TTL?: number;
  data?: string;
}

interface DohResponsePayload {
  Status?: number;
  Answer?: DohAnswerEntry[];
  Comment?: string;
}

function normalizeAnswerValue(value: string, recordType: DnsRecordType): string {
  const trimmed = value.trim();
  if (recordType === 'TXT') {
    return trimmed.replace(/^"|"$/g, '');
  }
  return trimmed.replace(/\.+$/, '').toLowerCase();
}

export function parseDohResponse(
  payload: unknown,
  recordType: DnsRecordType,
): { answers: string[]; ttl: number | null; rcode: number } {
  const obj = (payload ?? {}) as DohResponsePayload;
  const rcode = typeof obj.Status === 'number' ? obj.Status : 0;
  const rawAnswers = Array.isArray(obj.Answer) ? obj.Answer : [];
  const targetCode = RECORD_TYPE_CODES[recordType];

  const matching = rawAnswers.filter(
    (entry) => entry.type === targetCode && typeof entry.data === 'string',
  );
  const effective =
    matching.length > 0 ? matching : rawAnswers.filter((entry) => typeof entry.data === 'string');

  const answers = effective.map((entry) => String(entry.data).trim());
  const ttls = effective
    .map((entry) => entry.TTL)
    .filter((ttl): ttl is number => typeof ttl === 'number' && Number.isFinite(ttl));

  return {
    answers,
    ttl: ttls.length > 0 ? Math.min(...ttls) : null,
    rcode,
  };
}

export function comparePropagationResults(
  rawResults: Omit<DnsLocationResult, 'status'>[],
  recordType: DnsRecordType,
  expectedAnswer?: string,
): DnsLocationResult[] {
  const expectedNormalized = expectedAnswer?.trim()
    ? normalizeAnswerValue(expectedAnswer, recordType)
    : '';

  const nonErrorSets = rawResults
    .filter((r) => !r.error && r.answers.length > 0)
    .map((r) =>
      r.answers
        .map((ans) => normalizeAnswerValue(ans, recordType))
        .sort()
        .join('|'),
    );

  const allResolversSucceeded = rawResults.every((r) => !r.error);
  const allSetsMatch =
    nonErrorSets.length === rawResults.length &&
    nonErrorSets.length > 0 &&
    new Set(nonErrorSets).size === 1;

  return rawResults.map((entry) => {
    if (entry.error) {
      return { ...entry, status: 'error' };
    }
    if (entry.answers.length === 0) {
      return { ...entry, status: expectedNormalized ? 'mismatch' : 'pending' };
    }

    const normalizedAnswers = entry.answers.map((ans) => normalizeAnswerValue(ans, recordType));
    if (expectedNormalized) {
      return {
        ...entry,
        status: normalizedAnswers.includes(expectedNormalized) ? 'propagated' : 'mismatch',
      };
    }

    if (allResolversSucceeded && allSetsMatch) {
      return { ...entry, status: 'propagated' };
    }

    return { ...entry, status: 'mismatch' };
  });
}

export async function checkDnsPropagation(
  domainInput: string,
  expectedAnswer = '',
  options: {
    recordType?: DnsRecordType;
    fetchFn?: typeof fetch;
    signal?: AbortSignal;
  } = {},
): Promise<DnsLocationResult[]> {
  const domain = normalizeDomain(domainInput);
  if (!isValidDomain(domain)) {
    throw new Error('Enter a valid domain name such as example.com (without http:// or paths).');
  }

  const recordType = options.recordType ?? 'A';
  const fetchImpl = options.fetchFn ?? globalThis.fetch;
  if (typeof fetchImpl !== 'function') {
    throw new Error('Fetch API is unavailable in this environment.');
  }

  const rawResults = await Promise.all(
    DOH_RESOLVERS.map(async (resolver): Promise<Omit<DnsLocationResult, 'status'>> => {
      const url = buildDohRequestUrl(resolver.endpoint, domain, recordType);
      const started = Date.now();
      try {
        const res = await fetchImpl(url, {
          headers: { Accept: 'application/dns-json' },
          signal: options.signal,
        });
        const latencyMs = Math.max(1, Date.now() - started);
        if (!res.ok) {
          return {
            location: resolver.location,
            provider: resolver.provider,
            server: resolver.server,
            recordType,
            answers: [],
            ttl: null,
            rcode: -1,
            latencyMs,
            ip: '',
            error: `HTTP ${res.status} from ${resolver.provider}`,
          };
        }
        const json = (await res.json()) as unknown;
        const parsed = parseDohResponse(json, recordType);
        return {
          location: resolver.location,
          provider: resolver.provider,
          server: resolver.server,
          recordType,
          answers: parsed.answers,
          ttl: parsed.ttl,
          rcode: parsed.rcode,
          latencyMs,
          ip: parsed.answers[0] ?? '',
        };
      } catch (err) {
        return {
          location: resolver.location,
          provider: resolver.provider,
          server: resolver.server,
          recordType,
          answers: [],
          ttl: null,
          rcode: -1,
          latencyMs: Math.max(1, Date.now() - started),
          ip: '',
          error: err instanceof Error ? err.message : 'Network error querying DoH resolver.',
        };
      }
    }),
  );

  return comparePropagationResults(rawResults, recordType, expectedAnswer);
}
