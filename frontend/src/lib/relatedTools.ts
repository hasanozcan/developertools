import { toolCatalog, type Tool } from '@/lib/api';
import { developerAudiences } from '@/lib/developerAudiences';
import { getToolManifest } from '@/lib/toolManifest';
import { toolCollections } from '@/lib/toolCollections';

/**
 * Related-tool graph used for "Related tools" links on every tool page.
 *
 * Relatedness is computed deterministically from catalog data (category, curated
 * collections, developer-audience pages, workflow targets and token overlap of the
 * tool metadata), then lightly rebalanced so that link equity is not concentrated on
 * a few hub tools and every tool receives a minimum number of contextual inbound links.
 *
 * NOTE: this module is loaded lazily from `getToolBySlug` in `api.ts`. It must not be
 * imported statically from `api.ts`, because `toolManifest.ts` reads `toolCatalog` at
 * module-evaluation time and would hit an initialization cycle.
 */

export const RELATED_TOOL_COUNT = 6;
export const MIN_INBOUND_RELATED_LINKS = 3;

/**
 * Hand-curated related tools. These are pinned to the top of the list in the given
 * order. Only add genuine topical picks here; entries that merely repeat catalog order
 * are detected by `isSequentialFiller` and ignored.
 */
export const curatedRelatedToolSlugs: Readonly<Record<string, readonly string[]>> = {
  'json-formatter': ['json-validator', 'json-to-typescript', 'json-csv'],
  'jwt-decoder': ['certificate-decoder', 'hmac-generator', 'base64'],
  'regex-tester': ['regex-escape', 'text-diff', 'case-converter'],
};

const SCORE_WEIGHTS = {
  workflowTarget: 12,
  workflowSource: 6,
  sharedCollection: 3,
  maxSharedCollections: 2,
  sharedAudience: 1,
  maxSharedAudiences: 2,
  sameCategory: 2.5,
  tokenSimilarity: 18,
  dataPipeline: 3,
} as const;

/**
 * Mild, multiplicative damping for tools that would otherwise appear in many related lists:
 * each doubling of excess popularity costs a few percent of relevance, capped so that a
 * clearly better topical match is never displaced by a weak one.
 */
const HUB_DAMPING_PER_LOG2_EXCESS = 0.06;
const MAX_HUB_DAMPING = 0.25;
/**
 * A rebalancing swap is only made when the new link is still relevant: above an absolute
 * floor and at least half as relevant as the link it replaces.
 */
const MIN_REBALANCE_SCORE = 3;
const MIN_REBALANCE_RELEVANCE_RATIO = 0.5;

// prettier-ignore
const STOPWORDS = new Set([
  'a', 'an', 'and', 'any', 'as', 'at', 'between', 'by', 'custom', 'for', 'from', 'in', 'into',
  'is', 'it', 'its', 'of', 'on', 'online', 'or', 'the', 'to', 'tool', 'using', 'via', 'with',
  'your', 'free', 'standard', 'exact', 'local', 'locally', 'modern', 'secure', 'visual',
  'visually', 'simple', 'quick', 'fast', 'instant', 'live', 'preview', 'based',
]);

/**
 * Small synonym lexicon: tokens in the same concept get an extra shared concept token so
 * that e.g. "SHA256" and "BLAKE3", or "timestamp" and "timezone", are recognised as related.
 */
// prettier-ignore
const CONCEPT_LEXICON: Readonly<Record<string, readonly string[]>> = {
  time: [
    'time', 'timestamp', 'date', 'datetime', 'epoch', 'timezone', 'duration', 'cron', 'crontab',
    'schedule', 'clock', 'utc', 'iso8601', 'timer', 'elapsed',
  ],
  hash: [
    'hash', 'hasher', 'hashing', 'checksum', 'digest', 'sha1', 'sha256', 'sha384', 'sha512',
    'sha3', 'md5', 'crc32', 'hmac', 'blake3', 'keccak', 'keccak256', 'bcrypt', 'argon2',
    'argon2id', 'pbkdf2', 'scrypt', 'htpasswd', 'integrity',
  ],
  json: ['json', 'jsonl', 'ndjson', 'jsonpath', 'json5', 'geojson'],
  identifier: ['uuid', 'ulid', 'guid', 'objectid', 'nanoid', 'snowflake'],
  baseencoding: [
    'base64', 'base64url', 'base32', 'base58', 'base85', 'ascii85', 'hex', 'hexadecimal',
    'binary', 'punycode', 'percent', 'urlencode',
  ],
  keys: [
    'rsa', 'ed25519', 'ecdsa', 'pem', 'x509', 'certificate', 'csr', 'pgp', 'gpg', 'ssh',
    'keypair', 'fingerprint', 'pkcs1', 'pkcs8', 'jwk', 'jwks',
  ],
  token: ['jwt', 'jws', 'jwe', 'oauth', 'oidc', 'pkce', 'bearer', 'claim'],
  color: ['color', 'colour', 'rgb', 'rgba', 'hsl', 'oklch', 'palette', 'contrast', 'apca'],
  regex: ['regex', 'regexp', 'pattern'],
};

const conceptByToken = new Map<string, string[]>();
for (const [concept, tokens] of Object.entries(CONCEPT_LEXICON)) {
  for (const token of tokens) {
    conceptByToken.set(token, [...(conceptByToken.get(token) ?? []), concept]);
  }
}

function stem(token: string): string {
  if (token.length <= 3 || /\d/.test(token)) return token;
  if (token.endsWith('ies')) return `${token.slice(0, -3)}y`;
  if (/(sses|shes|ches|xes)$/.test(token)) return token.slice(0, -2);
  if (token.endsWith('s') && !/(ss|us|is)$/.test(token)) return token.slice(0, -1);
  return token;
}

export function tokenize(text: string): string[] {
  return (
    text
      .toLowerCase()
      .replace(/real[\s-]?time/g, ' ')
      .replace(/\bsha[\s-]?(\d)/g, 'sha$1')
      .replace(/\bkeccak[\s-](\d)/g, 'keccak$1')
      .split(/[^a-z0-9]+/)
      // Version markers such as "v4" (UUID v4 vs Tailwind v4) are not topical.
      .filter((token) => token.length > 1 && !STOPWORDS.has(token) && !/^v\d$/.test(token))
      .map(stem)
  );
}

type SparseVector = { ids: number[]; weights: number[] };

interface ToolFeatures {
  index: number;
  tool: Tool;
  collections: Set<string>;
  audiences: Set<string>;
  workflowTargets: Set<string>;
  inputTypes: Set<string>;
  outputTypes: Set<string>;
  vector: SparseVector;
}

export interface RelatedToolGraph {
  /** Ordered related slugs for each tool slug. */
  relatedSlugs: ReadonlyMap<string, readonly string[]>;
  /** Pairwise relevance score (without hub damping) — exposed for diagnostics and tests. */
  score: (fromSlug: string, toSlug: string) => number;
}

/**
 * Returns true when a curated entry is just the next N tools in catalog order (globally
 * or within the tool's category) — i.e. generated filler rather than a genuine pick.
 */
export function isSequentialFiller(
  slug: string,
  entry: readonly string[],
  catalog: readonly Pick<Tool, 'slug' | 'categorySlug'>[] = toolCatalog,
): boolean {
  if (entry.length === 0) return false;
  const tool = catalog.find((candidate) => candidate.slug === slug);
  if (!tool) return false;

  const orders = [
    catalog.map((candidate) => candidate.slug),
    catalog
      .filter((candidate) => candidate.categorySlug === tool.categorySlug)
      .map((candidate) => candidate.slug),
  ];

  return orders.some((order) => {
    const index = order.indexOf(slug);
    if (order.length <= entry.length) return false;
    return entry.every((related, offset) => order[(index + 1 + offset) % order.length] === related);
  });
}

function buildFeatures(catalog: readonly Tool[]): ToolFeatures[] {
  const collectionsBySlug = new Map<string, Set<string>>();
  for (const collection of toolCollections) {
    for (const slug of collection.toolSlugs) {
      const set = collectionsBySlug.get(slug) ?? new Set<string>();
      set.add(collection.slug);
      collectionsBySlug.set(slug, set);
    }
  }

  const collectionToolSlugs = new Map<string, readonly string[]>(
    toolCollections.map((collection) => [collection.slug, collection.toolSlugs]),
  );
  const audiencesBySlug = new Map<string, Set<string>>();
  for (const audience of developerAudiences) {
    const members = new Set<string>(audience.toolSlugs);
    for (const collectionSlug of audience.collectionSlugs) {
      for (const slug of collectionToolSlugs.get(collectionSlug) ?? []) members.add(slug);
    }
    for (const slug of members) {
      const set = audiencesBySlug.get(slug) ?? new Set<string>();
      set.add(audience.slug);
      audiencesBySlug.set(slug, set);
    }
  }

  // Weighted term frequencies per tool.
  const termCounts = catalog.map((tool) => {
    const manifest = getToolManifest(tool.slug);
    const counts = new Map<string, number>();
    const add = (tokens: string[], weight: number) => {
      for (const token of tokens) {
        counts.set(token, Math.max(counts.get(token) ?? 0, weight));
        for (const concept of conceptByToken.get(token) ?? []) {
          const key = `@${concept}`;
          counts.set(key, Math.max(counts.get(key) ?? 0, weight));
        }
      }
    };
    add(tokenize(tool.slug.replace(/-/g, ' ')), 2);
    add(tokenize(tool.name), 2);
    add(tokenize(tool.shortDescription ?? ''), 1);
    add(tokenize((manifest?.searchAliases ?? []).join(' ')), 1);
    for (const type of [...(manifest?.inputTypes ?? []), ...(manifest?.outputTypes ?? [])]) {
      if (type !== 'text') counts.set(`type:${type}`, Math.max(counts.get(`type:${type}`) ?? 0, 1));
    }
    return counts;
  });

  const documentFrequency = new Map<string, number>();
  for (const counts of termCounts) {
    for (const term of counts.keys()) {
      documentFrequency.set(term, (documentFrequency.get(term) ?? 0) + 1);
    }
  }
  const termIds = new Map<string, number>(
    [...documentFrequency.keys()].sort().map((term, id) => [term, id]),
  );

  return catalog.map((tool, index) => {
    const manifest = getToolManifest(tool.slug);
    const entries = [...termCounts[index].entries()]
      .map(([term, weight]) => {
        const df = documentFrequency.get(term) ?? 1;
        // Terms shared by a single tool carry no relational signal.
        const idf = df <= 1 ? 0 : Math.log(catalog.length / df);
        return [termIds.get(term) as number, weight * idf] as const;
      })
      .filter(([, weight]) => weight > 0)
      .sort((left, right) => left[0] - right[0]);
    const norm = Math.hypot(...entries.map(([, weight]) => weight)) || 1;

    return {
      index,
      tool,
      collections: collectionsBySlug.get(tool.slug) ?? new Set<string>(),
      audiences: audiencesBySlug.get(tool.slug) ?? new Set<string>(),
      workflowTargets: new Set<string>(manifest?.workflowTargets ?? []),
      inputTypes: new Set((manifest?.inputTypes ?? []).filter((type) => type !== 'text')),
      outputTypes: new Set((manifest?.outputTypes ?? []).filter((type) => type !== 'text')),
      vector: {
        ids: entries.map(([id]) => id),
        weights: entries.map(([, weight]) => weight / norm),
      },
    };
  });
}

function cosine(left: SparseVector, right: SparseVector): number {
  let i = 0;
  let j = 0;
  let sum = 0;
  while (i < left.ids.length && j < right.ids.length) {
    if (left.ids[i] === right.ids[j]) {
      sum += left.weights[i] * right.weights[j];
      i += 1;
      j += 1;
    } else if (left.ids[i] < right.ids[j]) {
      i += 1;
    } else {
      j += 1;
    }
  }
  return sum;
}

function countShared(left: Set<string>, right: Set<string>): number {
  let shared = 0;
  for (const value of left) if (right.has(value)) shared += 1;
  return shared;
}

function pairScore(from: ToolFeatures, to: ToolFeatures): number {
  let score = 0;
  if (from.workflowTargets.has(to.tool.slug)) score += SCORE_WEIGHTS.workflowTarget;
  if (to.workflowTargets.has(from.tool.slug)) score += SCORE_WEIGHTS.workflowSource;
  score +=
    SCORE_WEIGHTS.sharedCollection *
    Math.min(countShared(from.collections, to.collections), SCORE_WEIGHTS.maxSharedCollections);
  score +=
    SCORE_WEIGHTS.sharedAudience *
    Math.min(countShared(from.audiences, to.audiences), SCORE_WEIGHTS.maxSharedAudiences);
  if (from.tool.categorySlug === to.tool.categorySlug) score += SCORE_WEIGHTS.sameCategory;
  if (countShared(from.outputTypes, to.inputTypes) > 0) score += SCORE_WEIGHTS.dataPipeline;
  score += SCORE_WEIGHTS.tokenSimilarity * cosine(from.vector, to.vector);
  return score;
}

export function buildRelatedToolGraph(
  catalog: readonly Tool[] = toolCatalog,
  curated: Readonly<Record<string, readonly string[]>> = curatedRelatedToolSlugs,
  count: number = RELATED_TOOL_COUNT,
): RelatedToolGraph {
  const size = catalog.length;
  const features = buildFeatures(catalog);
  const indexBySlug = new Map(catalog.map((tool, index) => [tool.slug, index]));
  const scores = new Float64Array(size * size);
  for (let from = 0; from < size; from += 1) {
    for (let to = 0; to < size; to += 1) {
      if (from !== to) scores[from * size + to] = pairScore(features[from], features[to]);
    }
  }
  const score = (from: number, to: number) => scores[from * size + to];

  // Stable ranking: score desc, then catalog order.
  const rankFor = (from: number, weight: (to: number) => number = () => 1) =>
    Array.from({ length: size }, (_, to) => to)
      .filter((to) => to !== from)
      .sort((left, right) => {
        const delta = score(from, right) * weight(right) - score(from, left) * weight(left);
        return Math.abs(delta) > 1e-9 ? delta : left - right;
      });

  const pinned = catalog.map((tool, from) => {
    const entry = curated[tool.slug] ?? [];
    if (isSequentialFiller(tool.slug, entry, catalog)) return [] as number[];
    return [...new Set(entry)]
      .map((slug) => indexBySlug.get(slug))
      .filter((to): to is number => to !== undefined && to !== from)
      .slice(0, count);
  });

  // Pass 1: raw popularity — how often a tool would be picked without damping.
  const popularity = new Array<number>(size).fill(0);
  for (let from = 0; from < size; from += 1) {
    for (const to of rankFor(from).slice(0, count)) popularity[to] += 1;
  }
  const hubWeight = (to: number) =>
    1 -
    Math.min(
      MAX_HUB_DAMPING,
      HUB_DAMPING_PER_LOG2_EXCESS * Math.log2(1 + Math.max(0, popularity[to] - count)),
    );

  // Pass 2: pick with mild hub damping (order-independent).
  const picks = catalog.map((_, from) => {
    const chosen = [...pinned[from]];
    for (const to of rankFor(from, hubWeight)) {
      if (chosen.length >= count) break;
      if (!chosen.includes(to)) chosen.push(to);
    }
    return chosen;
  });

  // Pass 3: make sure every tool has a minimum number of relevant inbound links by
  // swapping out the weakest unpinned pick of a source whose target is well linked.
  const inbound = new Array<number>(size).fill(0);
  for (const list of picks) for (const to of list) inbound[to] += 1;
  const isPinned = (from: number, to: number) =>
    pinned[from].includes(to) || features[from].workflowTargets.has(catalog[to].slug);

  for (let target = 0; target < size; target += 1) {
    const candidates = Array.from({ length: size }, (_, from) => ({
      from,
      relevance: from === target ? 0 : score(from, target),
    })).filter(({ relevance }) => relevance >= MIN_REBALANCE_SCORE);

    while (inbound[target] < MIN_INBOUND_RELATED_LINKS) {
      let best: { from: number; drop: number; loss: number } | undefined;
      for (const { from, relevance } of candidates) {
        if (picks[from].includes(target)) continue;
        for (const drop of picks[from]) {
          if (isPinned(from, drop) || inbound[drop] <= MIN_INBOUND_RELATED_LINKS) continue;
          if (relevance < score(from, drop) * MIN_REBALANCE_RELEVANCE_RATIO) continue;
          const loss = score(from, drop) - relevance;
          if (
            !best ||
            loss < best.loss - 1e-9 ||
            (Math.abs(loss - best.loss) <= 1e-9 &&
              (from < best.from || (from === best.from && drop < best.drop)))
          ) {
            best = { from, drop, loss };
          }
        }
      }
      if (!best) break;
      const list = picks[best.from];
      list[list.indexOf(best.drop)] = target;
      inbound[best.drop] -= 1;
      inbound[target] += 1;
    }
  }

  // Final ordering: curated picks first, then by relevance (catalog order breaks ties).
  const relatedSlugs = new Map<string, readonly string[]>();
  catalog.forEach((tool, from) => {
    const curatedPicks = pinned[from];
    const rest = picks[from]
      .filter((to) => !curatedPicks.includes(to))
      .sort((left, right) => {
        const delta = score(from, right) - score(from, left);
        return Math.abs(delta) > 1e-9 ? delta : left - right;
      });
    relatedSlugs.set(
      tool.slug,
      [...curatedPicks, ...rest].map((to) => catalog[to].slug),
    );
  });

  return {
    relatedSlugs,
    score: (fromSlug, toSlug) => {
      const from = indexBySlug.get(fromSlug);
      const to = indexBySlug.get(toSlug);
      return from === undefined || to === undefined || from === to ? 0 : score(from, to);
    },
  };
}

let cachedGraph: RelatedToolGraph | undefined;

export function getRelatedToolGraph(): RelatedToolGraph {
  cachedGraph ??= buildRelatedToolGraph();
  return cachedGraph;
}

const catalogBySlug = new Map<string, Tool>(toolCatalog.map((tool) => [tool.slug, tool]));

export function getRelatedTools(slug: string, count: number = RELATED_TOOL_COUNT): Tool[] {
  return (getRelatedToolGraph().relatedSlugs.get(slug) ?? [])
    .slice(0, count)
    .map((relatedSlug) => catalogBySlug.get(relatedSlug))
    .filter((tool): tool is Tool => tool !== undefined);
}

export function relatedToolsFor(
  tool: Pick<Tool, 'slug'>,
  count: number = RELATED_TOOL_COUNT,
): Tool[] {
  return getRelatedTools(tool.slug, count);
}
