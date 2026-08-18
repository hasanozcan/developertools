import { describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_PASSPHRASE_WORDS,
  estimatePassphraseEntropyBits,
  generateSecurePassphrase,
  MAX_PASSPHRASE_WORDS,
  MIN_PASSPHRASE_WORDS,
  secureRandomInt,
} from './passwordSecurity';

describe('password security helpers', () => {
  it('uses a strong default passphrase entropy target', () => {
    expect(DEFAULT_PASSPHRASE_WORDS).toBeGreaterThanOrEqual(MIN_PASSPHRASE_WORDS);
    expect(estimatePassphraseEntropyBits(DEFAULT_PASSPHRASE_WORDS)).toBeGreaterThan(77);
  });

  it('generates the requested number of EFF words', () => {
    const passphrase = generateSecurePassphrase(DEFAULT_PASSPHRASE_WORDS, '---');
    expect(passphrase.split('---')).toHaveLength(DEFAULT_PASSPHRASE_WORDS);
  });

  it('rejects unsafe passphrase sizes', () => {
    expect(() => generateSecurePassphrase(MIN_PASSPHRASE_WORDS - 1, '-')).toThrow(RangeError);
    expect(() => generateSecurePassphrase(MAX_PASSPHRASE_WORDS + 1, '-')).toThrow(RangeError);
  });

  it('returns random integers inside the requested range', () => {
    for (let index = 0; index < 100; index += 1) {
      expect(secureRandomInt(7)).toBeGreaterThanOrEqual(0);
      expect(secureRandomInt(7)).toBeLessThan(7);
    }
  });

  it('rejects biased Uint32 values before applying modulo', () => {
    const values = [0xffff_ffff, 6];
    const getRandomValues = vi
      .spyOn(globalThis.crypto, 'getRandomValues')
      .mockImplementation((array) => {
        (array as Uint32Array)[0] = values.shift()!;
        return array;
      });

    try {
      expect(secureRandomInt(7)).toBe(6);
      expect(getRandomValues).toHaveBeenCalledTimes(2);
    } finally {
      getRandomValues.mockRestore();
    }
  });
});
