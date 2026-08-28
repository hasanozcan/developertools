import { describe, it, expect } from 'vitest';
import { estimateEmbeddingCost } from './embeddingTokenCostEstimator';

describe('embeddingTokenCostEstimator', () => {
  it('calculates embedding costs per million tokens', () => {
    const cost = estimateEmbeddingCost(1_000_000);
    expect(cost.textEmbedding3Small).toBe(0.02);
  });
});
