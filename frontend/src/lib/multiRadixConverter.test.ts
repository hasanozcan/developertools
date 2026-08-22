import { describe, it, expect } from 'vitest';
import { convertMultiRadix } from './multiRadixConverter';

describe('multiRadixConverter', () => {
  it('simultaneously converts numbers across all number bases', () => {
    const res = convertMultiRadix('255', 10);
    expect(res.hex).toBe('FF');
    expect(res.binary).toBe('11111111');
    expect(res.octal).toBe('377');
    expect(res.decimal).toBe('255');
  });
});
