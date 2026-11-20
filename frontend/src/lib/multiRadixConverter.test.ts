import { describe, expect, it } from 'vitest';
import { convertMultiRadix } from './multiRadixConverter';

describe('multiRadixConverter', () => {
  it('simultaneously converts numbers across all number bases', () => {
    const res = convertMultiRadix('255', 10);
    expect(res.isValid).toBe(true);
    expect(res.hex).toBe('FF');
    expect(res.binary).toBe('11111111');
    expect(res.octal).toBe('377');
    expect(res.decimal).toBe('255');
  });

  it('converts from binary, octal, and hex radixes and rejects invalid digits', () => {
    expect(convertMultiRadix('11111111', 2).decimal).toBe('255');
    expect(convertMultiRadix('377', 8).hex).toBe('FF');
    expect(convertMultiRadix('deadbeef', 16).decimal).toBe('3735928559');

    const badBinary = convertMultiRadix('1012', 2);
    expect(badBinary.isValid).toBe(false);
    expect(badBinary.error).toContain('base-2');
  });
});
