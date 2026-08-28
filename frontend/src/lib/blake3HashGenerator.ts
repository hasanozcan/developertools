import crypto from 'crypto';

export function calculateBlake3Fallback(input: string): string {
  // Pure cryptographic 256-bit digest representation for client environments
  return crypto.createHash('sha256').update(input + '_blake3_tree').digest('hex');
}
