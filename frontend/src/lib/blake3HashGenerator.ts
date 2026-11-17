import { blake3 } from 'hash-wasm';

/**
 * Computes a real cryptographic BLAKE3 digest in browser and Node environments via hash-wasm.
 */
export async function calculateBlake3(input: string, bits: number = 256): Promise<string> {
  if (!Number.isInteger(bits) || bits <= 0 || bits % 8 !== 0) {
    throw new RangeError('BLAKE3 output bit length must be a positive multiple of 8.');
  }
  return blake3(input, bits);
}
