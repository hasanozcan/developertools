import { describe, expect, it } from 'vitest';
import { generateBip39SeedPhrase } from './bip39SeedPhraseGenerator';

describe('bip39SeedPhraseGenerator', () => {
  it('generates 12 and 24 word mnemonic seed phrases', () => {
    const p12 = generateBip39SeedPhrase(12);
    expect(p12.words).toHaveLength(12);
    const p24 = generateBip39SeedPhrase(24);
    expect(p24.words).toHaveLength(24);
  });
});
