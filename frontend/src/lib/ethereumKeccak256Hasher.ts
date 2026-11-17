import { keccak } from 'hash-wasm';

export interface Keccak256Result {
  input: string;
  methodSig: string;
  keccak256Hex: string;
}

/**
 * Computes the Ethereum Keccak-256 hash (pre-NIST padding) and 4-byte ABI selector.
 */
export async function computeKeccak256(input: string): Promise<Keccak256Result> {
  const hex = await keccak(input, 256);
  return {
    input,
    methodSig: `0x${hex.slice(0, 8)}`,
    keccak256Hex: `0x${hex}`,
  };
}
