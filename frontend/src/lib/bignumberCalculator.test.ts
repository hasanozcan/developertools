import { describe, expect, it } from 'vitest';
import { calculateBigInt } from './bignumberCalculator';

describe('bignumberCalculator', () => {
  it('performs exact arbitrary-precision arithmetic across all operators', () => {
    const a = '999999999999999999999999999999';
    const b = '1';
    expect(calculateBigInt(a, b, '+')).toBe('1000000000000000000000000000000');
    expect(calculateBigInt('100', '33', '-')).toBe('67');
    expect(calculateBigInt('12345678901234567890', '2', '*')).toBe('24691357802469135780');
    expect(calculateBigInt('100', '7', '/')).toBe('14');
    expect(calculateBigInt('100', '7', '%')).toBe('2');
  });

  it('computes BigInt exponentiation (**) accurately', () => {
    expect(calculateBigInt('2', '128', '**')).toBe('340282366920938463463374607431768211456');
    expect(calculateBigInt('10', '0', '**')).toBe('1');
    expect(calculateBigInt('2', '-1', '**')).toContain('Error:');
  });

  it('guards division/modulo by zero and rejects invalid integer strings', () => {
    expect(calculateBigInt('10', '0', '/')).toContain('Division by zero');
    expect(calculateBigInt('10', '0', '%')).toContain('Modulo by zero');
    expect(() => calculateBigInt('abc', '1', '+')).toThrow(/Invalid integer/);
  });
});
