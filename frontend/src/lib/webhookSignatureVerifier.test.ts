import { webcrypto } from 'node:crypto';
import { describe, expect, it, vi } from 'vitest';
import { verifyHmacSignature } from './webhookSignatureVerifier';

describe('webhookSignatureVerifier', () => {
  it('computes HMAC signature', async () => {
    vi.stubGlobal('crypto', webcrypto);
    try {
      const res = await verifyHmacSignature('{"event":"payment_intent.succeeded"}', 'whsec_test', 'invalid');
      expect(res.valid).toBe(false);
      expect(res.computed).toMatch(/^sha256=[0-9a-f]{64}$/);
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
