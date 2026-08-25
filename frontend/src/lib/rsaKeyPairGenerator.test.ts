import { describe, expect, it } from 'vitest';
import { generateRsaKeyPairSummary } from './rsaKeyPairGenerator';

describe('rsaKeyPairGenerator', () => {
  it('generates RSA public and private key pem', () => {
    const res = generateRsaKeyPairSummary(2048);
    expect(res.publicKey).toContain('BEGIN PUBLIC KEY');
    expect(res.privateKey).toContain('BEGIN RSA PRIVATE KEY');
  });
});
