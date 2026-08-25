export function testGitignorePatterns(patterns: string[], filePaths: string[]): { path: string; ignored: boolean; matchedPattern?: string }[] {
  const cleanPatterns = patterns.map(p => p.trim()).filter(p => p && !p.startsWith('#'));

  return filePaths.map(filePath => {
    let ignored = false;
    let matchedPattern: string | undefined;

    for (const pattern of cleanPatterns) {
      const isNegated = pattern.startsWith('!');
      const cleanPat = isNegated ? pattern.slice(1) : pattern;

      let regexPattern = cleanPat
        .replace(/\./g, '\\.')
        .replace(/\*\*/g, '.*')
        .replace(/(?<!\.)\*/g, '[^/]*');

      if (cleanPat.endsWith('/')) {
        regexPattern = '^' + regexPattern;
      }

      const regex = new RegExp(regexPattern);
      if (regex.test(filePath)) {
        ignored = !isNegated;
        matchedPattern = pattern;
      }
    }

    return { path: filePath, ignored, matchedPattern };
  });
}
