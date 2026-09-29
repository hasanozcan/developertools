import { describe, it, expect } from 'vitest';
import {
  base64ToBase64Url,
  base64UrlToBase64,
  decodeBase64Url,
  encodeBase64Url,
} from './base64urlEncoder';

describe('base64urlEncoder', () => {
  it('encodes and decodes base64url without padding', () => {
    const original = 'Hello World & Developers?';
    const encoded = encodeBase64Url(original);
    expect(encoded).not.toContain('+');
    expect(encoded).not.toContain('/');
    expect(encoded).not.toContain('=');
    expect(decodeBase64Url(encoded)).toBe(original);
  });

  it('round-trips non-Latin text as UTF-8', () => {
    const original = 'Türkçe ✓ 日本語 🔒';
    expect(decodeBase64Url(encodeBase64Url(original))).toBe(original);
  });

  it('converts standard base64 to the url-safe variant', () => {
    expect(base64ToBase64Url('a+b/c==')).toBe('a-b_c');
  });

  it('converts base64url back to padded standard base64', () => {
    expect(base64UrlToBase64('ab-_')).toBe('ab+/');
    expect(base64UrlToBase64('YQ')).toBe('YQ==');
  });

  it('rejects invalid base64url input', () => {
    expect(() => base64UrlToBase64('abc$')).toThrow('not valid Base64url');
    expect(() => decodeBase64Url('A')).toThrow();
  });
});
