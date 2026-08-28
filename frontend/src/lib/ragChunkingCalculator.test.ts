import { describe, it, expect } from 'vitest';
import { chunkText, estimateEmbeddingCost } from './ragChunkingCalculator';

describe('ragChunkingCalculator', () => {
  it('chunks text with sliding window overlap', () => {
    const text = 'A'.repeat(1000);
    const chunks = chunkText(text, 400, 100);
    expect(chunks.length).toBe(3);
    expect(chunks[0].charCount).toBe(400);
  });

  it('calculates embedding cost accurately', () => {
    expect(estimateEmbeddingCost(1_000_000, 0.02)).toBeCloseTo(0.02);
  });
});
