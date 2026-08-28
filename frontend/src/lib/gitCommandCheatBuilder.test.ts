import { describe, it, expect } from 'vitest';
import { buildGitCommand } from './gitCommandCheatBuilder';

describe('gitCommandCheatBuilder', () => {
  it('generates interactive rebase command', () => {
    const res = buildGitCommand({ action: 'squash-rebase', commitsCount: 4 });
    expect(res.commands[0]).toBe('git rebase -i HEAD~4');
  });

  it('generates soft undo commit command', () => {
    const res = buildGitCommand({ action: 'undo-commit', keepChanges: true });
    expect(res.commands[0]).toBe('git reset --soft HEAD~1');
  });
});
