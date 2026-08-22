import { describe, it, expect } from 'vitest';
import { deriveSeedHexSimple } from './bip39SeedDeriver';

describe('bip39SeedDeriver', () => {
  it('derives 64-character seed hex string from mnemonic phrase', () => {
    const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
    const seed = deriveSeedHexSimple(mnemonic);
    expect(seed).toHaveLength(64);
  });
});
