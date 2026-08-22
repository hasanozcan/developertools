import { describe, it, expect } from 'vitest';
import { parseVector, cosineSimilarity } from './embeddingSimilarity';

describe('embeddingSimilarity', () => {
  it('calculates cosine similarity between vectors', () => {
    const vecA = parseVector('[1, 2, 3]');
    const vecB = parseVector('1, 2, 3');
    expect(cosineSimilarity(vecA, vecB)).toBeCloseTo(1.0, 5);
  });
});
