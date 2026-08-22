import { describe, it, expect } from 'vitest';
import { calculateDeepSeekTokens } from './deepseekTokenCounter';

describe('calculateDeepSeekTokens', () => {
  it('handles empty input', () => {
    const res = calculateDeepSeekTokens('');
    expect(res.tokens).toBe(0);
    expect(res.characters).toBe(0);
  });

  it('calculates token counts and costs correctly', () => {
    const res = calculateDeepSeekTokens('Hello world, writing DeepSeek R1 reasoning prompts for code generation.');
    expect(res.tokens).toBeGreaterThan(10);
    expect(res.costV3Input).toBeGreaterThan(0);
    expect(res.costR1Output).toBeGreaterThan(0);
  });
});