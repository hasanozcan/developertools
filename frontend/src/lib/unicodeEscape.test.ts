import { describe, expect, it } from 'vitest';
import { decodeUnicode, encodeUnicode } from './unicodeEscape';

describe('Unicode escape conversion', () => {
  it('round-trips Unicode text with supplementary code points', () => {
    const input = 'Merhaba dünya 👋 Привет 世界';
    expect(decodeUnicode(encodeUnicode(input, false))).toBe(input);
    expect(encodeUnicode('🚀', false)).toBe(String.raw`\u{1F680}`);
  });

  it.each([
    String.raw`\x41`,
    String.raw`\u0041`,
    String.raw`\u{1F680}`,
    String.raw`\\x41`,
    String.raw`C:\users\new\x41 👋`,
  ])('round-trips literal backslashes when ASCII encoding is enabled: %s', (input) => {
    expect(decodeUnicode(encodeUnicode(input, true))).toBe(input);
  });

  it('decodes braced, fixed, surrogate-pair and byte escapes in one input', () => {
    expect(decodeUnicode(String.raw`\u0041\x42\u{1F680}\uD83D\uDE80`)).toBe('AB🚀🚀');
  });

  it('does not decode an escape produced by a replacement', () => {
    expect(decodeUnicode(String.raw`\u{5C}u0041`)).toBe(String.raw`\u0041`);
    expect(decodeUnicode(String.raw`\u005Cx41`)).toBe(String.raw`\x41`);
  });

  it('preserves unsupported or incomplete escape text', () => {
    const input = String.raw`\uZZZZ \u123 \xG1 \u{} \\`;
    expect(decodeUnicode(input)).toBe(input);
  });

  it('rejects a recognized escape outside the Unicode code-point range', () => {
    expect(() => decodeUnicode(String.raw`\u{110000}`)).toThrow(RangeError);
  });
});
