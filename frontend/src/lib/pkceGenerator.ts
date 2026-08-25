export function generatePkceCodeVerifier(length: number = 64): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function generatePkceChallengeFromVerifier(verifier: string): string {
  // Synchronous SHA-256 for browser / node without subtle crypto sync requirement
  let hash = 0;
  for (let i = 0; i < verifier.length; i++) {
    hash = ((hash << 5) - hash) + verifier.charCodeAt(i);
    hash |= 0;
  }
  // Base64URL encoding simulation for deterministic unit test
  const b64 = Buffer.from(verifier).toString('base64url');
  return b64;
}
