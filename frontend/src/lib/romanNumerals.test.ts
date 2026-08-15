// @vitest-environment node

import { describe, expect, it } from 'vitest';
import { numberToRoman, parseRomanNumberInput, romanToNumber } from './romanNumerals';

describe('Roman numeral conversion', () => {
  it('round-trips canonical values', () => {
    expect(numberToRoman(2024)).toBe('MMXXIV');
    expect(romanToNumber('MMXXIV')).toBe(2024);
  });

  it.each(['IIII', 'VX', 'IC', 'MCMC'])('rejects non-canonical Roman numeral %s', (value) => {
    expect(() => romanToNumber(value)).toThrow(/invalid/i);
  });

  it('rejects trailing characters in decimal input', () => {
    expect(() => parseRomanNumberInput('12abc')).toThrow(/valid whole number/i);
    expect(parseRomanNumberInput('12')).toBe(12);
  });
});
