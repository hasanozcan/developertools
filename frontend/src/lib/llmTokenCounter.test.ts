import { describe, it, expect } from 'vitest';
import { estimateTokens, estimateCost } from './llmTokenCounter';

describe('llmTokenCounter', () => {
  it('estimates tokens and statistics for input text', () => {
    const text = 'Hello world! This is a test for OpenAI GPT-4o token counting.';
    const stats = estimateTokens(text);
    expect(stats.tokens).toBeGreaterThan(5);
    expect(stats.characters).toBe(text.length);
    expect(stats.words).toBe(11);
    expect(stats.lines).toBe(1);
  });

  it('calculates API inference cost accurately', () => {
    const cost = estimateCost(1_000_000, 'gpt-4o', false);
    expect(cost.costUSD).toBe(2.5);
    expect(cost.formattedCost).toBe('$2.5000');
  });
});
