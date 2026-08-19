import { describe, it, expect } from 'vitest';
import { base32Encode, base32Decode } from './base32Encoder';

describe('base32Encoder', () => {
  it('should encode string to RFC 4648 Base32', () => {
    const encoded = base32Encode('Hello');
    expect(encoded).toBe('JBSWY3DP');
  });

  it('should decode Base32 back to string', () => {
    const decoded = base32Decode('JBSWY3DP');
    expect(decoded).toBe('Hello');
  });
});
