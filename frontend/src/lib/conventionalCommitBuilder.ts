export interface CommitConfig {
  type: 'feat' | 'fix' | 'docs' | 'style' | 'refactor' | 'perf' | 'test' | 'chore' | 'ci';
  scope?: string;
  description: string;
  body?: string;
  isBreakingChange?: boolean;
  breakingChangeDescription?: string;
}

export function buildConventionalCommit(config: CommitConfig): string {
  const { type, scope, description, body, isBreakingChange, breakingChangeDescription } = config;

  const scopeStr = scope?.trim() ? `(${scope.trim()})` : '';
  const breakingMark = isBreakingChange ? '!' : '';
  const header = `${type}${scopeStr}${breakingMark}: ${description.trim()}`;

  const parts = [header];
  if (body?.trim()) {
    parts.push('', body.trim());
  }

  if (isBreakingChange) {
    parts.push('', `BREAKING CHANGE: ${breakingChangeDescription || description}`);
  }

  return parts.join('\n');
}
