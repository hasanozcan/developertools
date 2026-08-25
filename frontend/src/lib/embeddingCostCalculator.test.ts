import { describe, expect, it } from 'vitest';
import { calculateEmbeddingCost, EMBEDDING_MODELS } from './embeddingCostCalculator';

describe('embeddingCostCalculator', () => {
  it('calculates cost correctly for 1M tokens', () => {
    const res = calculateEmbeddingCost(1_000_000, 'text-embedding-3-small');
    expect(res.estimatedCostUsd).toBe(0.02);
    expect(res.dimensions).toBe(1536);
  });
});
