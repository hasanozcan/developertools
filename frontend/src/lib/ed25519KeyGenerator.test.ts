import { describe, it, expect } from 'vitest';
import { webcrypto } from 'node:crypto';
import { vi } from 'vitest';
import { generateEd25519Keypair } from './ed25519KeyGenerator';

describe('generateEd25519Keypair', () => {
  it('generates 32-byte public and private key hexes', async () => {
    vi.stubGlobal('crypto', webcrypto);
    try {
      const keys = await generateEd25519Keypair();
      expect(keys.publicKeyHex.length).toBe(66);
      expect(keys.privateKeyHex.length).toBe(66);
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
