import { generateMnemonicSync } from './bip39';

export function generateBip39SeedPhrase(wordCount: 12 | 24 = 12): { words: string[]; mnemonic: string } {
  const { words, mnemonic } = generateMnemonicSync(wordCount);
  return { words, mnemonic };
}
