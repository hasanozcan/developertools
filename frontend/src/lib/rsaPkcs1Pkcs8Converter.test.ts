import { describe, it, expect } from 'vitest';
import { detectRsaKeyFormat } from './rsaPkcs1Pkcs8Converter';

describe('rsaPkcs1Pkcs8Converter', () => {
  it('identifies PKCS#1 and PKCS#8 headers', () => {
    expect(detectRsaKeyFormat('-----BEGIN RSA PRIVATE KEY-----')).toBe('PKCS#1');
    expect(detectRsaKeyFormat('-----BEGIN PRIVATE KEY-----')).toBe('PKCS#8');
  });
});
