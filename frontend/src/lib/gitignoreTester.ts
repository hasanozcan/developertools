type GlobToken =
  | { kind: 'doubleStar' }
  | { kind: 'star' }
  | { kind: 'qmark' }
  | { kind: 'char'; value: string };

const MAX_PATTERN_LENGTH = 500;
const MAX_PATH_LENGTH = 4096;

function tokenizeGlob(pattern: string): GlobToken[] {
  const tokens: GlobToken[] = [];
  for (let i = 0; i < pattern.length; i++) {
    const ch = pattern[i];
    if (ch === '*') {
      if (pattern[i + 1] === '*') {
        while (pattern[i + 1] === '*') i++;
        if (tokens[tokens.length - 1]?.kind !== 'doubleStar') {
          tokens.push({ kind: 'doubleStar' });
        }
      } else {
        tokens.push({ kind: 'star' });
      }
    } else if (ch === '?') {
      tokens.push({ kind: 'qmark' });
    } else {
      tokens.push({ kind: 'char', value: ch });
    }
  }
  return tokens;
}

function matchGlobLinear(pattern: string, filePath: string): boolean {
  if (!pattern || pattern.length > MAX_PATTERN_LENGTH || filePath.length > MAX_PATH_LENGTH) {
    return false;
  }

  const anchoredStart = pattern.startsWith('/') || pattern.endsWith('/');
  const normalizedPattern = pattern.startsWith('/') ? pattern.slice(1) : pattern;
  const tokens = tokenizeGlob(normalizedPattern);
  const n = filePath.length;

  let dp = new Array<boolean>(n + 1).fill(!anchoredStart);
  dp[0] = true;

  for (const token of tokens) {
    const next = new Array<boolean>(n + 1).fill(false);

    if (token.kind === 'doubleStar') {
      next[0] = dp[0];
      for (let j = 1; j <= n; j++) {
        next[j] = dp[j] || next[j - 1];
      }
    } else if (token.kind === 'star') {
      next[0] = dp[0];
      for (let j = 1; j <= n; j++) {
        next[j] = dp[j] || (filePath[j - 1] !== '/' && next[j - 1]);
      }
    } else if (token.kind === 'qmark') {
      for (let j = 1; j <= n; j++) {
        next[j] = dp[j - 1] && filePath[j - 1] !== '/';
      }
    } else {
      for (let j = 1; j <= n; j++) {
        next[j] = dp[j - 1] && filePath[j - 1] === token.value;
      }
    }

    dp = next;
  }

  return dp.some(Boolean);
}

export function testGitignorePatterns(
  patterns: string[],
  filePaths: string[],
): { path: string; ignored: boolean; matchedPattern?: string }[] {
  const cleanPatterns = patterns.map((p) => p.trim()).filter((p) => p && !p.startsWith('#'));

  return filePaths.map((filePath) => {
    let ignored = false;
    let matchedPattern: string | undefined;

    for (const pattern of cleanPatterns) {
      const isNegated = pattern.startsWith('!');
      const cleanPat = isNegated ? pattern.slice(1) : pattern;

      if (matchGlobLinear(cleanPat, filePath)) {
        ignored = !isNegated;
        matchedPattern = pattern;
      }
    }

    return { path: filePath, ignored, matchedPattern };
  });
}
