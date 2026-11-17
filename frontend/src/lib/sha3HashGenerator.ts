import { sha3 } from 'hash-wasm';

export type Sha3Variant = 'sha3-224' | 'sha3-256' | 'sha3-384' | 'sha3-512';

const SHA3_BITS_BY_VARIANT: Record<Sha3Variant, 224 | 256 | 384 | 512> = {
  'sha3-224': 224,
  'sha3-256': 256,
  'sha3-384': 384,
  'sha3-512': 512,
};

/**
 * Computes a real FIPS 202 SHA-3 digest using hash-wasm.
 */
export async function generateSha3Hash(
  text: string,
  variant: Sha3Variant = 'sha3-256',
): Promise<string> {
  const bits = SHA3_BITS_BY_VARIANT[variant];
  if (!bits) {
    throw new Error(`Unsupported SHA-3 variant: ${String(variant)}`);
  }
  return sha3(text, bits);
}
