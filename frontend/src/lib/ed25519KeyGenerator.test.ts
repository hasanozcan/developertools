import { describe, it, expect } from 'vitest';
import { simulateEd25519Keypair } from './ed25519KeyGenerator';

describe('simulateEd25519Keypair', () => {
  it('generates 32-byte public and private key hexes', () => {
    const keys = simulateEd25519Keypair();
    expect(keys.publicKeyHex.length).toBe(66);
    expect(keys.privateKeyHex.length).toBe(66);
  });
});