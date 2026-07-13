export type CspSeverity = 'high' | 'medium' | 'info';

export interface CspDirective {
  name: string;
  values: string[];
}

export const CSP_FINDING_CODES = [
  'duplicateDirective',
  'missingDefaultSrc',
  'missingScriptRestriction',
  'unsafeEval',
  'unsafeInlineMitigated',
  'unsafeInline',
  'wildcardScript',
  'dataScript',
  'broadSchemeScript',
  'broadOrInsecureSource',
  'missingObjectSrc',
  'unsafeObjectSrc',
  'missingBaseUri',
  'missingFrameAncestors',
  'deprecatedReportUri',
  'baselineOk',
] as const;

export type CspFindingCode = (typeof CSP_FINDING_CODES)[number];
export type CspFindingParams = Readonly<Record<string, string | number>>;

export interface CspFinding {
  severity: CspSeverity;
  code: CspFindingCode;
  params?: CspFindingParams;
  /** English compatibility text for non-UI consumers. */
  message: string;
}

export class CspError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CspError';
  }
}

const HEADER_PREFIX = /^content-security-policy(?:-report-only)?\s*:\s*/i;
const DIRECTIVE_NAME = /^[a-z][a-z0-9-]*$/i;
const HEADER_CONTROL_CHARACTER = /[\0\r\n]/;
const VALUELESS_DIRECTIVES = new Set(['upgrade-insecure-requests', 'block-all-mixed-content']);
const SOURCE_LIST_DIRECTIVES = new Set([
  'default-src',
  'script-src',
  'script-src-elem',
  'script-src-attr',
  'style-src',
  'style-src-elem',
  'style-src-attr',
  'img-src',
  'font-src',
  'connect-src',
  'media-src',
  'object-src',
  'manifest-src',
  'worker-src',
  'child-src',
  'frame-src',
  'prefetch-src',
  'base-uri',
  'form-action',
  'frame-ancestors',
]);
const QUOTED_SOURCE_KEYWORDS = new Set([
  "'none'",
  "'self'",
  "'unsafe-inline'",
  "'unsafe-eval'",
  "'strict-dynamic'",
  "'unsafe-hashes'",
  "'report-sample'",
  "'wasm-unsafe-eval'",
  "'trusted-types-eval'",
  "'inline-speculation-rules'",
]);
const NONCE_OR_HASH_SOURCE =
  /^'(?:nonce-[A-Za-z0-9+/_-]+={0,2}|sha(?:256|384|512)-[A-Za-z0-9+/_-]+={0,2})'$/;

function uniqueValues(values: string[]): string[] {
  const seen = new Set<string>();
  return values.filter((value) => {
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

function validateDirectiveValues(name: string, values: string[]): void {
  for (const value of values) {
    const containsQuote = value.includes("'") || value.includes('"');
    const hasBalancedSingleQuotes =
      value.startsWith("'") && value.endsWith("'") && value.slice(1, -1).indexOf("'") < 0;

    if (containsQuote && !hasBalancedSingleQuotes) {
      throw new CspError(`Malformed quoted value for ${name}: ${value}.`);
    }
    if (
      SOURCE_LIST_DIRECTIVES.has(name) &&
      hasBalancedSingleQuotes &&
      !QUOTED_SOURCE_KEYWORDS.has(value.toLowerCase()) &&
      !NONCE_OR_HASH_SOURCE.test(value)
    ) {
      throw new CspError(`Invalid quoted source expression for ${name}: ${value}.`);
    }
  }
}

export function parseCsp(input: string): CspDirective[] {
  if (HEADER_CONTROL_CHARACTER.test(input)) {
    throw new CspError(
      'CSP header values cannot contain NUL, carriage-return, or newline characters.',
    );
  }

  const value = input.trim().replace(HEADER_PREFIX, '');
  if (!value) throw new CspError('Enter at least one CSP directive.');

  const directives: CspDirective[] = [];
  for (const rawDirective of value.split(';')) {
    const part = rawDirective.trim();
    if (!part) continue;

    const tokens = part.split(/\s+/);
    const name = tokens.shift()?.toLowerCase() || '';
    if (!DIRECTIVE_NAME.test(name)) {
      throw new CspError(`Invalid CSP directive name: ${name || '(empty)'}.`);
    }

    const values = tokens.map((token) => token.trim()).filter(Boolean);
    if (values.some((token) => token.includes(';'))) {
      throw new CspError(`Invalid semicolon in a value for ${name}.`);
    }
    if (VALUELESS_DIRECTIVES.has(name) && values.length > 0) {
      throw new CspError(`${name} is a valueless directive.`);
    }
    validateDirectiveValues(name, values);

    directives.push({ name, values });
  }

  if (directives.length === 0) throw new CspError('Enter at least one CSP directive.');
  return directives;
}

export function formatCsp(directives: CspDirective[]): string {
  const seen = new Set<string>();
  return directives
    .filter(({ name }) => {
      const normalized = name.toLowerCase();
      if (seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    })
    .map(({ name, values }) => {
      const normalizedName = name.toLowerCase();
      const normalizedValues = uniqueValues(values.map((value) => value.trim()).filter(Boolean));
      return `${normalizedName}${normalizedValues.length ? ` ${normalizedValues.join(' ')}` : ''}`;
    })
    .join('; ');
}

export function setCspDirective(
  directives: CspDirective[],
  name: string,
  values: string[],
): CspDirective[] {
  const normalizedName = name.trim().toLowerCase();
  if (!DIRECTIVE_NAME.test(normalizedName)) {
    throw new CspError(`Invalid CSP directive name: ${normalizedName || '(empty)'}.`);
  }
  if (values.some((value) => HEADER_CONTROL_CHARACTER.test(value) || value.includes(';'))) {
    throw new CspError('Directive values cannot contain control characters or semicolons.');
  }
  const normalizedValues = uniqueValues(values.map((value) => value.trim()).filter(Boolean));
  if (VALUELESS_DIRECTIVES.has(normalizedName) && normalizedValues.length > 0) {
    throw new CspError(`${normalizedName} is a valueless directive.`);
  }
  validateDirectiveValues(normalizedName, normalizedValues);

  const replacement = { name: normalizedName, values: normalizedValues };
  const firstIndex = directives.findIndex((directive) => directive.name === normalizedName);
  const withoutExisting = directives.filter((directive) => directive.name !== normalizedName);
  if (firstIndex < 0) return [...directives, replacement];
  withoutExisting.splice(Math.min(firstIndex, withoutExisting.length), 0, replacement);
  return withoutExisting;
}

function valuesFor(directives: CspDirective[], name: string): string[] | undefined {
  return directives.find((directive) => directive.name === name)?.values;
}

function hasSource(values: string[] | undefined, source: string): boolean {
  return Boolean(values?.some((value) => value.toLowerCase() === source));
}

export function analyzeCsp(directives: CspDirective[]): CspFinding[] {
  const findings: CspFinding[] = [];
  const counts = new Map<string, number>();
  for (const directive of directives) {
    counts.set(directive.name, (counts.get(directive.name) || 0) + 1);
  }
  for (const [name, count] of counts) {
    if (count > 1) {
      findings.push({
        severity: 'medium',
        code: 'duplicateDirective',
        params: { directive: name, count },
        message: `${name} appears ${count} times. Browsers ignore later duplicate directives, so keep one explicit value.`,
      });
    }
  }

  const defaultSources = valuesFor(directives, 'default-src');
  if (!defaultSources) {
    findings.push({
      severity: 'high',
      code: 'missingDefaultSrc',
      message: 'Missing default-src leaves fetch directives without an explicit fallback policy.',
    });
  }

  const scriptSources = valuesFor(directives, 'script-src') || defaultSources;
  if (!scriptSources) {
    findings.push({
      severity: 'high',
      code: 'missingScriptRestriction',
      message: 'No script-src or default-src restriction is present.',
    });
  } else {
    if (hasSource(scriptSources, "'unsafe-eval'")) {
      findings.push({
        severity: 'high',
        code: 'unsafeEval',
        message: "script-src allows 'unsafe-eval', which enables string-to-code execution paths.",
      });
    }
    if (hasSource(scriptSources, "'unsafe-inline'")) {
      const hasNonceOrHash = scriptSources.some((source) => NONCE_OR_HASH_SOURCE.test(source));
      findings.push({
        severity: hasNonceOrHash ? 'medium' : 'high',
        code: hasNonceOrHash ? 'unsafeInlineMitigated' : 'unsafeInline',
        message: hasNonceOrHash
          ? "script-src includes 'unsafe-inline'. A valid nonce or hash can cause browsers to ignore it, but removing the keyword is clearer."
          : "script-src allows 'unsafe-inline' without a nonce or hash.",
      });
    }
    if (hasSource(scriptSources, '*')) {
      findings.push({
        severity: 'high',
        code: 'wildcardScript',
        message: 'script-src allows every network host with *.',
      });
    }
    if (hasSource(scriptSources, 'data:')) {
      findings.push({
        severity: 'high',
        code: 'dataScript',
        message: 'script-src allows data: URLs.',
      });
    }
    const broadSchemeSources = scriptSources.filter(
      (source) => /^[a-z][a-z0-9+.-]*:$/i.test(source) && source.toLowerCase() !== 'data:',
    );
    if (broadSchemeSources.length > 0) {
      findings.push({
        severity: 'high',
        code: 'broadSchemeScript',
        params: { sources: broadSchemeSources.join(', ') },
        message: `script-src allows entire URL schemes (${broadSchemeSources.join(', ')}). Prefer explicit hosts, nonces, or hashes.`,
      });
    }
  }

  for (const directive of directives) {
    if (directive.values.some((value) => value === '*' || /^http:/i.test(value))) {
      const sources = directive.values
        .filter((value) => value === '*' || /^http:/i.test(value))
        .join(', ');
      findings.push({
        severity: directive.name === 'script-src' ? 'high' : 'medium',
        code: 'broadOrInsecureSource',
        params: { directive: directive.name, sources },
        message: `${directive.name} contains a broad or insecure source (${sources}).`,
      });
    }
  }

  const objectSources = valuesFor(directives, 'object-src');
  if (!objectSources) {
    findings.push({
      severity: 'medium',
      code: 'missingObjectSrc',
      message: "Add object-src 'none' unless plugins are required.",
    });
  } else if (!(objectSources.length === 1 && hasSource(objectSources, "'none'"))) {
    findings.push({
      severity: 'medium',
      code: 'unsafeObjectSrc',
      message: "object-src is safest as the single source 'none'.",
    });
  }

  if (!valuesFor(directives, 'base-uri')) {
    findings.push({
      severity: 'medium',
      code: 'missingBaseUri',
      message: "Add base-uri 'self' or 'none' to restrict base URL changes.",
    });
  }
  if (!valuesFor(directives, 'frame-ancestors')) {
    findings.push({
      severity: 'medium',
      code: 'missingFrameAncestors',
      message: "Add frame-ancestors 'none' or an explicit allowlist to control embedding.",
    });
  }
  if (valuesFor(directives, 'report-uri')) {
    findings.push({
      severity: 'info',
      code: 'deprecatedReportUri',
      message:
        'report-uri is deprecated. Prefer report-to while retaining report-uri only for legacy coverage.',
    });
  }

  if (findings.length === 0) {
    findings.push({
      severity: 'info',
      code: 'baselineOk',
      message:
        'No common baseline issue was detected. Test the policy in Report-Only mode before enforcing it.',
    });
  }
  return findings;
}
