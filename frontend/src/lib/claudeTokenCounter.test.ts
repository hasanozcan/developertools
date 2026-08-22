import { describe, it, expect } from 'vitest';
import { calculateClaudeTokens } from './claudeTokenCounter';

describe('calculateClaudeTokens', () => {
  it('calculates Sonnet and Opus costs', () => {
    const res = calculateClaudeTokens('Claude 3.5 Sonnet analysis payload');
    expect(res.tokens).toBeGreaterThan(5);
    expect(res.costSonnetInput).toBeGreaterThan(0);
  });
});