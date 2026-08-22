import { describe, it, expect } from 'vitest';
import { encodeBase64Url, decodeBase64Url } from './base64urlEncoder';

describe('base64urlEncoder', () => {
  it('encodes and decodes base64url without padding', () => {
    const original = 'Hello World & Developers?';
    const encoded = encodeBase64Url(original);
    expect(encoded).not.toContain('+');
    expect(encoded).not.toContain('/');
    expect(encoded).not.toContain('=');
    expect(decodeBase64Url(encoded)).toBe(original);
  });
});