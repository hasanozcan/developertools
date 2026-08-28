import { describe, it, expect } from 'vitest';
import { compareLlmCosts } from './multiLlmTokenComparator';

describe('multiLlmTokenComparator', () => {
  it('calculates token counts and costs for major LLM providers', () => {
    const text = 'Explain quantum computing in simple terms for beginners.';
    const res = compareLlmCosts(text);
    expect(res.wordCount).toBe(8);
    expect(res.models.length).toBeGreaterThanOrEqual(7);
    expect(res.models.find((m) => m.id === 'gpt-4o')).toBeDefined();
    expect(res.models.find((m) => m.id === 'deepseek-v3')).toBeDefined();
  });
});
