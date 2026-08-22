import { describe, it, expect } from 'vitest';
import { buildGitCommand } from './gitCommandBuilder';

describe('gitCommandBuilder', () => {
  it('generates interactive Git terminal commands', () => {
    const cmd = buildGitCommand({ action: 'reset', args: { hard: true, target: 'origin/main' } });
    expect(cmd).toBe('git reset --hard origin/main');
  });
});
