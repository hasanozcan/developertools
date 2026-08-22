import { describe, it, expect } from 'vitest';
import { calculateBigInt } from './bignumberCalculator';

describe('bignumberCalculator', () => {
  it('performs exact arbitrary-precision arithmetic without rounding errors', () => {
    const a = '999999999999999999999999999999';
    const b = '1';
    const res = calculateBigInt(a, b, '+');
    expect(res).toBe('1000000000000000000000000000000');
  });
});
