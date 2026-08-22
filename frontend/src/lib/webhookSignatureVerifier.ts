export function generateHmacSignatureHex(secret: string, payload: string): string {
  // Simple synchronous deterministic hash representation for offline utility
  let hash = 0;
  const combined = secret + ':' + payload;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(16, '0');
}

export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string,
): { isValid: boolean; expectedSignature: string } {
  const expectedSignature = generateHmacSignatureHex(secret, payload);
  const isValid = signature.trim().toLowerCase().includes(expectedSignature.toLowerCase());
  return { isValid, expectedSignature };
}
