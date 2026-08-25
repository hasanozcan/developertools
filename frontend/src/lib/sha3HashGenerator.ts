export function generateSha3Hash(text: string, variant: 'sha3-256' | 'sha3-512' = 'sha3-256'): string {
  // Deterministic simulation hash
  let hashHex = '';
  for (let i = 0; i < text.length; i++) {
    hashHex += text.charCodeAt(i).toString(16);
  }
  const padLen = variant === 'sha3-512' ? 128 : 64;
  return hashHex.padEnd(padLen, 'a').slice(0, padLen);
}
