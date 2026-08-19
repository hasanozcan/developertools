import { describe, it, expect } from 'vitest';
import { calculateStringBytes } from './stringByteCounter';

describe('stringByteCounter', () => {
  it('should count ASCII text characters and bytes identically', () => {
    const res = calculateStringBytes('Hello World');
    expect(res.characters).toBe(11);
    expect(res.utf8Bytes).toBe(11);
    expect(res.asciiCount).toBe(11);
    expect(res.words).toBe(2);
  });

  it('should count multi-byte UTF-8 characters and emojis accurately', () => {
    // '🚀' is 1 character, 4 UTF-8 bytes (2 UTF-16 surrogate code units)
    // ' ' is 1 byte
    // 'T' is 1 byte
    // 'ü' is 2 bytes
    // 'r' is 1 byte
    // 'k' is 1 byte
    // 'ç' is 2 bytes
    // 'e' is 1 byte
    // Total = 4 + 1 + 1 + 2 + 1 + 1 + 2 + 1 = 13 bytes
    const res = calculateStringBytes('🚀 Türkçe');
    expect(res.characters).toBe(8);
    expect(res.utf8Bytes).toBe(13);
    expect(res.nonAsciiCount).toBe(4);
  });
});
