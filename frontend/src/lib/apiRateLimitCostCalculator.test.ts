import { describe, it, expect } from 'vitest';
import { calculateTokenBucket } from './apiRateLimitCostCalculator';

describe('apiRateLimitCostCalculator', () => {
  it('computes fill rate per second', () => {
    expect(calculateTokenBucket(600).fillRatePerSec).toBe(10);
  });
});
