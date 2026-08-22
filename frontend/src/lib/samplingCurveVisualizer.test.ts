import { describe, it, expect } from 'vitest';
import { computeSoftmaxWithTemperature } from './samplingCurveVisualizer';

describe('samplingCurveVisualizer', () => {
  it('computes softmax probabilities and applies top-p and top-k filtering', () => {
    const logits = [
      { token: 'TypeScript', logit: 4.0 },
      { token: 'JavaScript', logit: 3.0 },
      { token: 'Python', logit: 2.0 },
      { token: 'Rust', logit: 1.0 },
    ];

    const result = computeSoftmaxWithTemperature(logits, 0.7, 0.9, 3);
    expect(result[0].token).toBe('TypeScript');
    expect(result[0].sampledProb).toBeGreaterThan(result[1].sampledProb);
    expect(result[0].includedInTopK).toBe(true);
  });
});
