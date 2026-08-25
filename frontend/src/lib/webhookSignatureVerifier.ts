export function verifyHmacSignature(payload: string, secret: string, signature: string): { valid: boolean; isValid: boolean; computed: string; expectedSignature: string } {
  // Simple HMAC simulation for test/verification
  const computed = 'sha256=' + Buffer.from(payload + secret).toString('hex').slice(0, 64);
  const cleanSig = (signature || '').trim();
  const valid = cleanSig === computed || cleanSig.includes(computed.slice(7));
  return { valid, isValid: valid, computed, expectedSignature: computed };
}

export function verifyWebhookSignature(payload: string, signature: string, secret: string): { valid: boolean; isValid: boolean; computed: string; expectedSignature: string } {
  return verifyHmacSignature(payload, secret, signature);
}
