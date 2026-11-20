export interface ParsedSemver {
  major: number;
  minor: number;
  patch: number;
  prerelease: Array<number | string>;
  build: string[];
  raw: string;
}

interface Comparator {
  op: '=' | '<' | '<=' | '>' | '>=';
  version: ParsedSemver;
  isSentinel?: boolean;
}

export interface SemverEvaluationResult {
  valid: boolean;
  matches: boolean;
  targetVersion: string;
  range: string;
  normalizedClauses: string[];
  error?: string;
}

const STRICT_SEMVER_RE =
  /^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;

const PARTIAL_SEMVER_RE =
  /^v?(0|[1-9]\d*|x|X|\*)(?:\.(0|[1-9]\d*|x|X|\*)(?:\.(0|[1-9]\d*|x|X|\*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?)?)?$/;

function parsePrereleaseIdentifiers(pre?: string): Array<number | string> | null {
  if (!pre) return [];
  const parts = pre.split('.');
  const parsed: Array<number | string> = [];
  for (const part of parts) {
    if (!part) return null;
    if (/^\d+$/.test(part)) {
      if (part.length > 1 && part.startsWith('0')) {
        return null; // SemVer 2.0.0 §9 forbids leading zeros on numeric prerelease IDs.
      }
      parsed.push(Number(part));
    } else {
      parsed.push(part);
    }
  }
  return parsed;
}

export function parseSemver(version: string): ParsedSemver | null {
  const trimmed = (version || '').trim();
  const match = STRICT_SEMVER_RE.exec(trimmed);
  if (!match) return null;

  const prerelease = parsePrereleaseIdentifiers(match[4]);
  if (prerelease === null) return null;

  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    prerelease,
    build: match[5] ? match[5].split('.') : [],
    raw: trimmed,
  };
}

export function compareSemver(a: ParsedSemver, b: ParsedSemver): -1 | 0 | 1 {
  if (a.major !== b.major) return a.major < b.major ? -1 : 1;
  if (a.minor !== b.minor) return a.minor < b.minor ? -1 : 1;
  if (a.patch !== b.patch) return a.patch < b.patch ? -1 : 1;

  const aPre = a.prerelease;
  const bPre = b.prerelease;
  if (aPre.length === 0 && bPre.length === 0) return 0;
  if (aPre.length === 0) return 1;
  if (bPre.length === 0) return -1;

  const max = Math.max(aPre.length, bPre.length);
  for (let i = 0; i < max; i++) {
    if (i >= aPre.length) return -1;
    if (i >= bPre.length) return 1;
    const x = aPre[i];
    const y = bPre[i];
    if (x === y) continue;
    if (typeof x === 'number' && typeof y === 'number') {
      return x < y ? -1 : 1;
    }
    if (typeof x === 'number') return -1;
    if (typeof y === 'number') return 1;
    return x < y ? -1 : 1;
  }
  return 0;
}

function makeVersion(
  major: number,
  minor: number,
  patch: number,
  prerelease: Array<number | string> = [],
): ParsedSemver {
  return {
    major,
    minor,
    patch,
    prerelease,
    build: [],
    raw: `${major}.${minor}.${patch}${prerelease.length > 0 ? `-${prerelease.join('.')}` : ''}`,
  };
}

interface PartialVersion {
  major?: number;
  minor?: number;
  patch?: number;
  prerelease: Array<number | string>;
}

function parsePartialVersion(raw: string): PartialVersion | null {
  const match = PARTIAL_SEMVER_RE.exec(raw.trim());
  if (!match) return null;

  const isWildcard = (token?: string) => !token || token === 'x' || token === 'X' || token === '*';
  const major = isWildcard(match[1]) ? undefined : Number(match[1]);
  const minor = major === undefined || isWildcard(match[2]) ? undefined : Number(match[2]);
  const patch = minor === undefined || isWildcard(match[3]) ? undefined : Number(match[3]);

  const prerelease = parsePrereleaseIdentifiers(match[4]);
  if (prerelease === null) return null;

  return { major, minor, patch, prerelease };
}

function expandComparatorToken(token: string): Comparator[] {
  const trimmed = token.trim();
  if (!trimmed) return [];

  if (trimmed === '*' || trimmed.toLowerCase() === 'x') {
    return [{ op: '>=', version: makeVersion(0, 0, 0), isSentinel: true }];
  }

  // Caret range ^
  if (trimmed.startsWith('^')) {
    const partial = parsePartialVersion(trimmed.slice(1));
    if (!partial) throw new Error(`Invalid caret range "${trimmed}".`);
    if (partial.major === undefined) {
      return [{ op: '>=', version: makeVersion(0, 0, 0), isSentinel: true }];
    }
    const lower = makeVersion(
      partial.major,
      partial.minor ?? 0,
      partial.patch ?? 0,
      partial.prerelease,
    );
    let upper: ParsedSemver;
    if (partial.major > 0) {
      upper = makeVersion(partial.major + 1, 0, 0, [0]);
    } else if (partial.minor === undefined) {
      upper = makeVersion(1, 0, 0, [0]);
    } else if (partial.minor > 0) {
      upper = makeVersion(0, partial.minor + 1, 0, [0]);
    } else if (partial.patch === undefined) {
      upper = makeVersion(0, 1, 0, [0]);
    } else {
      upper = makeVersion(0, 0, partial.patch + 1, [0]);
    }
    return [
      { op: '>=', version: lower },
      { op: '<', version: upper, isSentinel: true },
    ];
  }

  // Tilde range ~
  if (trimmed.startsWith('~')) {
    const partial = parsePartialVersion(trimmed.slice(1));
    if (!partial) throw new Error(`Invalid tilde range "${trimmed}".`);
    if (partial.major === undefined) {
      return [{ op: '>=', version: makeVersion(0, 0, 0), isSentinel: true }];
    }
    const lower = makeVersion(
      partial.major,
      partial.minor ?? 0,
      partial.patch ?? 0,
      partial.prerelease,
    );
    const upper =
      partial.minor === undefined
        ? makeVersion(partial.major + 1, 0, 0, [0])
        : makeVersion(partial.major, partial.minor + 1, 0, [0]);

    return [
      { op: '>=', version: lower },
      { op: '<', version: upper, isSentinel: true },
    ];
  }

  const opMatch = /^(>=|<=|>|<|=)?(.*)$/.exec(trimmed);
  if (!opMatch) throw new Error(`Invalid comparator "${trimmed}".`);
  const op = (opMatch[1] || '=') as Comparator['op'];
  const partial = parsePartialVersion(opMatch[2]);
  if (!partial) throw new Error(`Invalid version in comparator "${trimmed}".`);

  if (partial.major === undefined) {
    return [{ op: '>=', version: makeVersion(0, 0, 0), isSentinel: true }];
  }

  const isPartial = partial.minor === undefined || partial.patch === undefined;
  if (!isPartial) {
    return [
      {
        op,
        version: makeVersion(partial.major, partial.minor!, partial.patch!, partial.prerelease),
      },
    ];
  }

  // Partial version comparator (e.g. 1.2.x, >=1.2, <2, <=1.2)
  const lower = makeVersion(partial.major, partial.minor ?? 0, 0);
  const nextUpper =
    partial.minor === undefined
      ? makeVersion(partial.major + 1, 0, 0, [0])
      : makeVersion(partial.major, partial.minor + 1, 0, [0]);

  switch (op) {
    case '=':
      return [
        { op: '>=', version: lower },
        { op: '<', version: nextUpper, isSentinel: true },
      ];
    case '>=':
      return [{ op: '>=', version: lower }];
    case '<':
      return [
        {
          op: '<',
          version: makeVersion(partial.major, partial.minor ?? 0, 0, [0]),
          isSentinel: true,
        },
      ];
    case '<=':
      return [{ op: '<', version: nextUpper, isSentinel: true }];
    case '>':
      return [{ op: '>=', version: nextUpper }];
  }
}

function parseComparatorSet(clause: string): Comparator[] {
  const trimmed = clause.trim();
  if (!trimmed) {
    throw new Error('Empty comparator clause in SemVer range.');
  }

  // Handle hyphen range: A - B
  const hyphenParts = trimmed.split(/\s+-\s+/);
  if (hyphenParts.length === 2) {
    const low = parsePartialVersion(hyphenParts[0]);
    const high = parsePartialVersion(hyphenParts[1]);
    if (!low || low.major === undefined || !high || high.major === undefined) {
      throw new Error(`Invalid hyphen range "${trimmed}".`);
    }
    const lowerComp: Comparator = {
      op: '>=',
      version: makeVersion(low.major, low.minor ?? 0, low.patch ?? 0, low.prerelease),
    };
    const upperComp: Comparator =
      high.minor === undefined
        ? { op: '<', version: makeVersion(high.major + 1, 0, 0, [0]), isSentinel: true }
        : high.patch === undefined
          ? { op: '<', version: makeVersion(high.major, high.minor + 1, 0, [0]), isSentinel: true }
          : {
              op: '<=',
              version: makeVersion(high.major, high.minor, high.patch, high.prerelease),
            };
    return [lowerComp, upperComp];
  }

  if (hyphenParts.length > 2) {
    throw new Error(`Invalid hyphen range "${trimmed}".`);
  }

  // Normalize spaces between operator and version (e.g. ">= 1.2.0")
  const normalized = trimmed.replace(/(>=|<=|>|<|=|\^|~)\s+/g, '$1');
  const tokens = normalized.split(/\s+/).filter(Boolean);
  return tokens.flatMap(expandComparatorToken);
}

function matchesSingleComparator(target: ParsedSemver, comp: Comparator): boolean {
  const cmp = compareSemver(target, comp.version);
  switch (comp.op) {
    case '=':
      return cmp === 0;
    case '>':
      return cmp > 0;
    case '>=':
      return cmp >= 0;
    case '<':
      return cmp < 0;
    case '<=':
      return cmp <= 0;
  }
}

function matchesComparatorSet(target: ParsedSemver, comparators: Comparator[]): boolean {
  for (const comp of comparators) {
    if (!matchesSingleComparator(target, comp)) {
      return false;
    }
  }

  if (target.prerelease.length > 0) {
    const allowedTuple = comparators.some(
      (comp) =>
        !comp.isSentinel &&
        comp.version.prerelease.length > 0 &&
        comp.version.major === target.major &&
        comp.version.minor === target.minor &&
        comp.version.patch === target.patch,
    );
    if (!allowedTuple) return false;
  }

  return true;
}

function formatComparator(c: Comparator): string {
  return `${c.op}${c.version.raw}`;
}

export function evaluateSemverRange(
  targetVersion: string,
  rangeExpr: string,
): SemverEvaluationResult {
  const target = parseSemver(targetVersion);
  if (!target) {
    return {
      valid: false,
      matches: false,
      targetVersion,
      range: rangeExpr,
      normalizedClauses: [],
      error: `Invalid SemVer 2.0.0 version "${targetVersion}". Expected MAJOR.MINOR.PATCH.`,
    };
  }

  const trimmedRange = (rangeExpr || '').trim();
  if (!trimmedRange) {
    return {
      valid: false,
      matches: false,
      targetVersion,
      range: rangeExpr,
      normalizedClauses: [],
      error: 'Enter a SemVer range such as ^1.2.0 or >=1.0.0 <2.0.0.',
    };
  }

  try {
    const orClauses = trimmedRange.split(/\s*\|\|\s*/);
    const parsedSets = orClauses.map(parseComparatorSet);
    const normalizedClauses = parsedSets.map((set) => set.map(formatComparator).join(' '));
    const matches = parsedSets.some((set) => matchesComparatorSet(target, set));

    return {
      valid: true,
      matches,
      targetVersion: target.raw,
      range: trimmedRange,
      normalizedClauses,
    };
  } catch (err) {
    return {
      valid: false,
      matches: false,
      targetVersion,
      range: rangeExpr,
      normalizedClauses: [],
      error: err instanceof Error ? err.message : 'Invalid SemVer range expression.',
    };
  }
}

export function satisfiesSemverRange(targetVersion: string, rangeExpr: string): boolean {
  const res = evaluateSemverRange(targetVersion, rangeExpr);
  return res.valid && res.matches;
}

export function matchesCaret(baseVersion: string, targetVersion: string): boolean {
  const cleanBase = (baseVersion || '').trim().replace(/^\^/, '');
  return satisfiesSemverRange(targetVersion, `^${cleanBase}`);
}
