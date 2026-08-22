import { describe, it, expect } from 'vitest';
import { buildConventionalCommit } from './conventionalCommitBuilder';

describe('conventionalCommitBuilder', () => {
  it('builds standard Conventional Commit message string', () => {
    const msg = buildConventionalCommit({
      type: 'feat',
      scope: 'auth',
      description: 'add oauth2 provider login',
      isBreakingChange: true,
      breakingChangeDescription: 'requires client id environment variable',
    });

    expect(msg).toContain('feat(auth)!: add oauth2 provider login');
    expect(msg).toContain('BREAKING CHANGE:');
  });
});
