import { describe, it, expect } from 'vitest';
import { encodeBcd } from './bcdBinaryCodedDecimalConverter';

describe('bcdBinaryCodedDecimalConverter', () => {
  it('encodes digits into 4-bit BCD nibbles', () => {
    expect(encodeBcd(42)).toBe('0100 0010');
  });
});
