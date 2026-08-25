import { describe, expect, it } from 'vitest';
import { verifyHmacSignature } from './webhookSignatureVerifier';

describe('webhookSignatureVerifier', () => {
  it('computes HMAC signature', () => {
    const res = verifyHmacSignature('{"event":"payment_intent.succeeded"}', 'whsec_test', 'invalid');
    expect(res.valid).toBe(false);
    expect(res.computed).toContain('sha256=');
  });
});
