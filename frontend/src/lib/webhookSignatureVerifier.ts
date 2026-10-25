import { generateHmac, verifyHmac } from './hmac';

export async function verifyHmacSignature(payload: string, secret: string, signature: string) {
  const computed = 'sha256=' + await generateHmac(payload, secret);
  const match = /^(?:sha256=)?([0-9a-f]{64})$/i.exec(signature.trim());
  const valid = !!match && await verifyHmac(payload, secret, match[1]);
  return { valid, isValid: valid, computed, expectedSignature: computed };
}

export function verifyWebhookSignature(payload: string, signature: string, secret: string) {
  return verifyHmacSignature(payload, secret, signature);
}
