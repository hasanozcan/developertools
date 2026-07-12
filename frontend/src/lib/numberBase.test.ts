// @vitest-environment node

import { describe, expect, it } from 'vitest';
import {
  convertIntegerBase,
  convertIntegerToAllBases,
  formatIntegerInBase,
  MAX_INTEGER_DIGITS,
  parseIntegerInBase,
  type NumberBase,
} from './numberBase';

describe('number base conversion', () => {
  it('converts a decimal integer to every supported base', () => {
    expect(convertIntegerToAllBases('255', 'decimal')).toEqual({
      decimal: '255',
      hex: '0xFF',
      octal: '0o377',
      binary: '0b11111111',
    });
  });

  it('accepts matching common prefixes with either letter case', () => {
    expect(convertIntegerBase('0xFF', 'hex', 'decimal')).toBe('255');
    expect(convertIntegerBase('0Xff', 'hex', 'decimal')).toBe('255');
    expect(convertIntegerBase('0o377', 'octal', 'decimal')).toBe('255');
    expect(convertIntegerBase('0O377', 'octal', 'decimal')).toBe('255');
    expect(convertIntegerBase('0b11111111', 'binary', 'decimal')).toBe('255');
    expect(convertIntegerBase('0B11111111', 'binary', 'decimal')).toBe('255');
  });

  it('supports signs and places the sign before an output prefix', () => {
    expect(convertIntegerToAllBases('-255', 'decimal')).toEqual({
      decimal: '-255',
      hex: '-0xFF',
      octal: '-0o377',
      binary: '-0b11111111',
    });
    expect(convertIntegerBase('-0xFF', 'hex', 'decimal')).toBe('-255');
    expect(convertIntegerBase('+0b101', 'binary', 'hex')).toBe('0x5');
    expect(convertIntegerBase('-0', 'decimal', 'hex')).toBe('0x0');
  });

  it('converts integers above the safe Number range without precision loss', () => {
    const maxUnsigned128Bit = '340282366920938463463374607431768211455';
    const hexadecimal = '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';

    expect(convertIntegerBase(maxUnsigned128Bit, 'decimal', 'hex')).toBe(hexadecimal);
    expect(convertIntegerBase(hexadecimal, 'hex', 'decimal')).toBe(maxUnsigned128Bit);
    expect(convertIntegerBase('18446744073709551616', 'decimal', 'binary')).toBe(
      `0b1${'0'.repeat(64)}`,
    );
  });

  it('allows outer whitespace and leading zeroes but validates the whole value', () => {
    expect(convertIntegerBase('  000255  ', 'decimal', 'hex')).toBe('0xFF');
    expect(convertIntegerBase('  -0X00ff  ', 'hex', 'decimal')).toBe('-255');
  });

  it.each<[string, NumberBase]>([
    ['', 'decimal'],
    ['   ', 'decimal'],
    ['+', 'decimal'],
    ['-', 'hex'],
    ['123abc', 'decimal'],
    ['123 trailing', 'decimal'],
    ['1.5', 'decimal'],
    ['1_000', 'decimal'],
    ['102', 'binary'],
    ['0b102', 'binary'],
    ['128', 'octal'],
    ['0o78', 'octal'],
    ['FFzz', 'hex'],
    ['0xFFjunk', 'hex'],
    ['0x', 'hex'],
  ])('rejects invalid %s input for the %s field', (input, base) => {
    expect(() => parseIntegerInBase(input, base)).toThrow();
  });

  it.each<[string, NumberBase]>([
    ['0x10', 'decimal'],
    ['0x10', 'binary'],
    ['0b10', 'hex'],
    ['0o10', 'binary'],
  ])('rejects a prefix that conflicts with the selected base', (input, base) => {
    expect(() => parseIntegerInBase(input, base)).toThrow(/prefix does not match/i);
  });

  it('formats a parsed negative value consistently', () => {
    const value = parseIntegerInBase('-0o10', 'octal');

    expect(formatIntegerInBase(value, 'decimal')).toBe('-8');
    expect(formatIntegerInBase(value, 'hex')).toBe('-0x8');
  });

  it('bounds input before BigInt conversion can block the UI', () => {
    expect(() => parseIntegerInBase('1'.repeat(MAX_INTEGER_DIGITS + 1), 'binary')).toThrow(
      /limited to 10,000 digits/,
    );
    expect(parseIntegerInBase('1'.repeat(MAX_INTEGER_DIGITS), 'binary')).toBeGreaterThan(BigInt(0));
  });
});
