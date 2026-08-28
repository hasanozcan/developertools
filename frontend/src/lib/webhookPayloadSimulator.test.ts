import { describe, it, expect } from 'vitest';
import { generateMockWebhook } from './webhookPayloadSimulator';

describe('webhookPayloadSimulator', () => {
  it('generates stripe webhook payload', () => {
    expect(generateMockWebhook('stripe').type).toBe('payment_intent.succeeded');
  });
});
