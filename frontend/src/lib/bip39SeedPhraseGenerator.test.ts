import { describe, expect, it, vi, afterEach } from 'vitest';
import { generateBip39SeedPhrase } from './bip39SeedPhraseGenerator';
import { BIP39_WORDLIST } from './bip39Wordlist';
import { validateMnemonic } from './bip39';

describe('bip39SeedPhraseGenerator', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('generates valid checksummed 12 and 24 word BIP-39 seed phrases without Math.random', () => {
    vi.spyOn(Math, 'random').mockImplementation(() => {
      throw new Error('Unsafe randomness');
    });

    const wordlistSet = new Set(BIP39_WORDLIST);
    expect(BIP39_WORDLIST).toHaveLength(2048);

    const p12 = generateBip39SeedPhrase(12);
    expect(p12.words).toHaveLength(12);
    expect(p12.mnemonic).toBe(p12.words.join(' '));
    expect(p12.words.every((word) => wordlistSet.has(word))).toBe(true);
    expect(validateMnemonic(p12.mnemonic).isValid).toBe(true);
    expect(validateMnemonic(p12.mnemonic).checksumValid).toBe(true);

    const p24 = generateBip39SeedPhrase(24);
    expect(p24.words).toHaveLength(24);
    expect(p24.mnemonic).toBe(p24.words.join(' '));
    expect(p24.words.every((word) => wordlistSet.has(word))).toBe(true);
    expect(validateMnemonic(p24.mnemonic).isValid).toBe(true);
    expect(validateMnemonic(p24.mnemonic).checksumValid).toBe(true);
  });
});
