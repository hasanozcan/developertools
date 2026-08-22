import { describe, expect, it } from 'vitest';
import { encodeQuotedPrintable, decodeQuotedPrintable } from './quotedPrintableEncoder';

describe('quotedPrintableEncoder', () => {
  it('encodes and decodes ASCII and UTF-8 strings correctly', () => {
    const input = 'Hello World! Café & Résumé = Great';
    const encoded = encodeQuotedPrintable(input);
    expect(encoded).toContain('=3D');
    expect(decodeQuotedPrintable(encoded)).toBe(input);
  });

  it('handles empty input', () => {
    expect(encodeQuotedPrintable('')).toBe('');
    expect(decodeQuotedPrintable('')).toBe('');
  });
});
