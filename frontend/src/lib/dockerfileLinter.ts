export interface DockerfileLintRule {
  line: number;
  severity: 'warning' | 'info' | 'error';
  message: string;
}

export function lintDockerfile(dockerfileText: string): DockerfileLintRule[] {
  const lines = dockerfileText.split(/\r?\n/);
  const issues: DockerfileLintRule[] = [];
  let hasFrom = false;

  lines.forEach((rawLine, idx) => {
    const lineNum = idx + 1;
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) return;

    if (line.startsWith('FROM')) {
      hasFrom = true;
      if (line.endsWith(':latest')) {
        issues.push({ line: lineNum, severity: 'warning', message: 'Avoid using ":latest" tag in production base images.' });
      }
    }

    if (/RUN\s+apt-get\s+update(?![^\n]*&&\s*apt-get\s+install)/i.test(line)) {
      issues.push({ line: lineNum, severity: 'warning', message: 'Combine "apt-get update" with "apt-get install" in a single RUN step to avoid caching issues.' });
    }

    if (/ADD\s+http/i.test(line)) {
      issues.push({ line: lineNum, severity: 'info', message: 'Use "curl" or "wget" with RUN instead of ADD for remote URLs.' });
    }
  });

  if (!hasFrom) {
    issues.push({ line: 1, severity: 'error', message: 'Missing required FROM instruction.' });
  }

  return issues;
}
