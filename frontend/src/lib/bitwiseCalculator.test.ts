import { describe, it, expect } from 'vitest';
import { calculateBitwise } from './bitwiseCalculator';

describe('bitwiseCalculator', () => {
  it('calculates bitwise operations with binary/hex outputs', () => {
    const res = calculateBitwise(0b1100, 0b1010, 'AND');
    expect(res.decimalResult).toBe(8); // 1000
    expect(res.hexResult).toBe('0x8');
  });
});
