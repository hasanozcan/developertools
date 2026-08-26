import { describe, expect, it } from 'vitest';
import { calculateModelCosts, LLM_MODELS } from './llmPricingCalculator';

describe('llmPricingCalculator', () => {
  it('calculates cost per request accurately for GPT-4o-mini', () => {
    const results = calculateModelCosts({
      promptTokens: 1000,
      completionTokens: 500,
      requestsPerDay: 1000,
    });

    const gpt4oMini = results.find((r) => r.model.id === 'gpt-4o-mini');
    expect(gpt4oMini).toBeDefined();

    // 1000 input * 0.15/1M = 0.00015
    // 500 output * 0.60/1M = 0.00030
    // total = 0.00045
    expect(gpt4oMini!.costPerRequest).toBeCloseTo(0.00045, 6);
    expect(gpt4oMini!.monthlyCost).toBeCloseTo(0.00045 * 1000 * 30, 2);
  });

  it('orders results by monthly cost ascending', () => {
    const results = calculateModelCosts({
      promptTokens: 2000,
      completionTokens: 1000,
      requestsPerDay: 500,
    });

    for (let i = 1; i < results.length; i++) {
      expect(results[i].monthlyCost).toBeGreaterThanOrEqual(results[i - 1].monthlyCost);
    }
  });

  it('includes prompt caching discounts when enabled', () => {
    const withoutCache = calculateModelCosts({
      promptTokens: 10000,
      completionTokens: 1000,
      requestsPerDay: 100,
      cachedPromptPercentage: 0,
    });

    const withCache = calculateModelCosts({
      promptTokens: 10000,
      completionTokens: 1000,
      requestsPerDay: 100,
      cachedPromptPercentage: 80,
    });

    const claudeSonnetNoCache = withoutCache.find((r) => r.model.id === 'claude-3-5-sonnet')!;
    const claudeSonnetCached = withCache.find((r) => r.model.id === 'claude-3-5-sonnet')!;

    expect(claudeSonnetCached.monthlyCost).toBeLessThan(claudeSonnetNoCache.monthlyCost);
  });
});
