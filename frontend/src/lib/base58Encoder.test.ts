import { describe, it, expect } from 'vitest';
import { encodeBase58, decodeBase58 } from './base58Encoder';

describe('base58Encoder', () => {
  it('encodes and decodes strings using Base58 encoding', () => {
    const text = 'Hello Bitcoin & Solana';
    const encoded = encodeBase58(text);
    expect(encoded).toBeDefined();

    const decoded = decodeBase58(encoded);
    expect(decoded).toBe(text);
  });
});
