import { describe, it, expect } from 'vitest';
import { calculateGrowth } from './percentageGrowthCalculator';

describe('percentageGrowthCalculator', () => {
  it('calculates metric percentage increases and decreases', () => {
    const res = calculateGrowth(50, 75);
    expect(res.percentageChange).toBe(50);
    expect(res.formatted).toBe('+50.00%');
    expect(res.isIncrease).toBe(true);
  });
});
