export interface SemverParsed {
  major: number;
  minor: number;
  patch: number;
  prerelease?: string;
  build?: string;
}

export function parseSemver(version: string): SemverParsed | null {
  const match = version.trim().match(/^v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+([0-9A-Za-z.-]+))?$/);
  if (!match) return null;
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
    prerelease: match[4],
    build: match[5],
  };
}

export function bumpSemver(version: string, type: 'major' | 'minor' | 'patch'): string {
  const parsed = parseSemver(version);
  if (!parsed) return version;

  if (type === 'major') {
    return `${parsed.major + 1}.0.0`;
  } else if (type === 'minor') {
    return `${parsed.major}.${parsed.minor + 1}.0`;
  } else {
    return `${parsed.major}.${parsed.minor}.${parsed.patch + 1}`;
  }
}

export function satisfiesRange(version: string, range: string): boolean {
  const v = parseSemver(version);
  if (!v) return false;

  const r = range.trim();

  // Caret ^1.2.3 (allow non-zero major compatible: >=1.2.3 <2.0.0)
  if (r.startsWith('^')) {
    const target = parseSemver(r.slice(1));
    if (!target) return false;
    if (target.major > 0) {
      return v.major === target.major && (v.minor > target.minor || (v.minor === target.minor && v.patch >= target.patch));
    }
    // 0.x
    return v.major === 0 && v.minor === target.minor && v.patch >= target.patch;
  }

  // Tilde ~1.2.3 (allow patch-level changes: >=1.2.3 <1.3.0)
  if (r.startsWith('~')) {
    const target = parseSemver(r.slice(1));
    if (!target) return false;
    return v.major === target.major && v.minor === target.minor && v.patch >= target.patch;
  }

  // Exact or wildcard
  if (r === '*' || r === 'x' || r === 'X') return true;

  const target = parseSemver(r);
  if (target) {
    return v.major === target.major && v.minor === target.minor && v.patch === target.patch;
  }

  return true;
}
