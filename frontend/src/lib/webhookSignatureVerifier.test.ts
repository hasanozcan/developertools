import { describe, it, expect } from 'vitest';
import { verifyWebhookSignature } from './webhookSignatureVerifier';

describe('webhookSignatureVerifier', () => {
  it('verifies deterministic webhook signature match', () => {
    const secret = 'whsec_secret123';
    const payload = '{"event":"checkout.completed"}';
    const sig = verifyWebhookSignature(payload, '', secret);
    expect(sig.expectedSignature).toBeDefined();

    const verifyMatch = verifyWebhookSignature(payload, sig.expectedSignature, secret);
    expect(verifyMatch.isValid).toBe(true);
  });
});
