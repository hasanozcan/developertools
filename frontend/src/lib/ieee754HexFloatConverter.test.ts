import { describe, it, expect } from 'vitest';
import { floatToHex } from './ieee754HexFloatConverter';

describe('ieee754HexFloatConverter', () => {
  it('converts single precision float to 32-bit hex', () => {
    expect(floatToHex(1.0)).toBe('0x3F800000');
  });
});
