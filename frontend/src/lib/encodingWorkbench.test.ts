import { describe, expect, it } from 'vitest';
import { convertEncoding } from './encodingWorkbench';

describe('encoding workbench conversions', () => {
  it('encodes and decodes Base64 as UTF-8', () => {
    expect(convertEncoding('Hello', 'base64', 'encode')).toBe('SGVsbG8=');
    const encoded = convertEncoding('Merhaba 🌍', 'base64', 'encode');
    expect(convertEncoding(encoded, 'base64', 'decode')).toBe('Merhaba 🌍');
  });

  it('encodes and decodes URL components', () => {
    expect(convertEncoding('a b&c', 'url', 'encode')).toBe('a%20b%26c');
    expect(convertEncoding('a%20b%26c', 'url', 'decode')).toBe('a b&c');
  });

  it('encodes and decodes hexadecimal UTF-8 bytes', () => {
    expect(convertEncoding('Hi', 'hex', 'encode')).toBe('4869');
    expect(convertEncoding('48 69', 'hex', 'decode')).toBe('Hi');
    const encoded = convertEncoding('✓', 'hex', 'encode');
    expect(convertEncoding(encoded, 'hex', 'decode')).toBe('✓');
    const emoji = convertEncoding('👋', 'hex', 'encode');
    expect(emoji).toBe('f09f918b');
    expect(convertEncoding(emoji, 'hex', 'decode')).toBe('👋');
  });

  it('encodes and decodes binary UTF-8 bytes', () => {
    expect(convertEncoding('A', 'binary', 'encode')).toBe('01000001');
    expect(convertEncoding('01000001', 'binary', 'decode')).toBe('A');
    const emoji = convertEncoding('👋', 'binary', 'encode');
    expect(convertEncoding(emoji, 'binary', 'decode')).toBe('👋');
  });

  it('escapes and unescapes JSON string content', () => {
    const source = 'Line 1\n"quoted"';
    const escaped = convertEncoding(source, 'json-string', 'encode');
    expect(escaped).toBe('Line 1\\n\\"quoted\\"');
    expect(convertEncoding(escaped, 'json-string', 'decode')).toBe(source);
  });

  it.each([
    ['not base64!', 'base64'],
    ['abc', 'hex'],
    ['01012', 'binary'],
    ['%', 'url'],
    ['\\uZZZZ', 'json-string'],
  ] as const)('rejects invalid %s input for %s', (input, format) => {
    expect(() => convertEncoding(input, format, 'decode')).toThrow();
  });
});
