import { describe, it, expect } from 'vitest';
import { generateMnemonic, validateMnemonic } from './bip39';

describe('bip39', () => {
  it('generates a valid 12-word BIP-39 mnemonic', async () => {
    const result = await generateMnemonic(12);
    expect(result.words).toHaveLength(12);
    expect(result.entropyBits).toBe(128);

    const validation = validateMnemonic(result.mnemonic);
    expect(validation.isValid).toBe(true);
    expect(validation.invalidWords).toHaveLength(0);
  });

  it('generates a valid 24-word BIP-39 mnemonic', async () => {
    const result = await generateMnemonic(24);
    expect(result.words).toHaveLength(24);
    expect(result.entropyBits).toBe(256);

    const validation = validateMnemonic(result.mnemonic);
    expect(validation.isValid).toBe(true);
  });

  it('detects invalid words in mnemonic', () => {
    const validation = validateMnemonic('abandon ability notarealwordabout apple');
    expect(validation.isValid).toBe(false);
    expect(validation.invalidWords).toContain('notarealwordabout');
  });
});
