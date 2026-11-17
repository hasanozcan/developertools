// @vitest-environment node
import { webcrypto } from 'node:crypto';
import { beforeAll, describe, it, expect } from 'vitest';
import { computeTotp } from './totpAuthenticatorSimulator';

beforeAll(() => {
  Object.defineProperty(globalThis, 'crypto', { configurable: true, value: webcrypto });
});

describe('computeTotp', () => {
  // RFC 6238 Appendix B test secret for SHA-1: ASCII "12345678901234567890"
  const rfc6238Sha1Secret = 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ';

  it('matches RFC 6238 SHA-1 Appendix B test vectors', async () => {
    const t59 = await computeTotp(rfc6238Sha1Secret, 30, 59, 8);
    expect(t59.code).toBe('94287082');
    expect(t59.remainingSeconds).toBe(1);

    const t1111111109 = await computeTotp(rfc6238Sha1Secret, 30, 1111111109, 8);
    expect(t1111111109.code).toBe('07081804');

    const t59_6 = await computeTotp(rfc6238Sha1Secret, 30, 59, 6);
    expect(t59_6.code).toBe('287082');
  });

  it('generates 6-digit code with valid remaining countdown seconds and rejects invalid Base32', async () => {
    const res = await computeTotp('JBSWY3DPEHPK3PXP');
    expect(res.code).toMatch(/^\d{6}$/);
    expect(res.remainingSeconds).toBeGreaterThanOrEqual(1);
    expect(res.remainingSeconds).toBeLessThanOrEqual(30);

    await expect(computeTotp('not-valid-base32!')).rejects.toThrow(/Base32/i);
  });
});
