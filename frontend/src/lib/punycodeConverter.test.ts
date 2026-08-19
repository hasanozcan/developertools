import { describe, it, expect } from 'vitest';
import { convertDomainToPunycode, convertPunycodeToDomain, punycodeEncode, punycodeDecode } from './punycodeConverter';

describe('punycodeConverter', () => {
  it('should encode non-ASCII domain labels to Punycode', () => {
    const encoded = punycodeEncode('münchen');
    expect(encoded).toBe('mnchen-3ya');
    const full = convertDomainToPunycode('münchen.de');
    expect(full).toBe('xn--mnchen-3ya.de');
  });

  it('should decode Punycode domain to Unicode', () => {
    const decoded = punycodeDecode('mnchen-3ya');
    expect(decoded).toBe('münchen');
    const full = convertPunycodeToDomain('xn--mnchen-3ya.de');
    expect(full).toBe('münchen.de');
  });
});
