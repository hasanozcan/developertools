// BIP-39 Mnemonic Generator and Validator (Client-side Cryptographic implementation)

// Standard 2048 BIP-39 English Wordlist excerpt / generator
import { BIP39_WORDLIST } from './bip39Wordlist';

export { BIP39_WORDLIST };

export type WordCount = 12 | 15 | 18 | 21 | 24;

export async function sha256Bytes(data: Uint8Array): Promise<Uint8Array> {
  const hashBuffer = await crypto.subtle.digest('SHA-256', data as any);
  return new Uint8Array(hashBuffer);
}

export async function generateMnemonic(wordCount: WordCount = 12): Promise<{
  mnemonic: string;
  entropyHex: string;
  entropyBits: number;
  words: string[];
}> {
  // 12 words = 128 bits entropy + 4 bits checksum = 132 bits = 12 * 11
  // 15 words = 160 bits entropy + 5 bits checksum = 165 bits = 15 * 11
  // 18 words = 192 bits entropy + 6 bits checksum = 198 bits = 18 * 11
  // 21 words = 224 bits entropy + 7 bits checksum = 231 bits = 21 * 11
  // 24 words = 256 bits entropy + 8 bits checksum = 264 bits = 24 * 11

  const entropyBits = (wordCount / 3) * 32;
  const entropyBytes = entropyBits / 8;
  const checksumBits = entropyBits / 32;

  const entropy = new Uint8Array(entropyBytes);
  crypto.getRandomValues(entropy);

  const hash = await sha256Bytes(entropy);

  // Convert entropy and hash to binary string
  let binaryStr = '';
  for (let i = 0; i < entropy.length; i++) {
    binaryStr += entropy[i].toString(2).padStart(8, '0');
  }

  const hashBinaryStr = hash[0].toString(2).padStart(8, '0');
  binaryStr += hashBinaryStr.slice(0, checksumBits);

  // Split into 11-bit chunks
  const words: string[] = [];
  for (let i = 0; i < binaryStr.length; i += 11) {
    const chunk = binaryStr.slice(i, i + 11);
    const index = parseInt(chunk, 2);
    words.push(BIP39_WORDLIST[index]);
  }

  const entropyHex = Array.from(entropy)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return {
    mnemonic: words.join(' '),
    entropyHex,
    entropyBits,
    words,
  };
}

export function validateMnemonic(mnemonic: string): {
  isValid: boolean;
  wordCount: number;
  invalidWords: string[];
} {
  const words = mnemonic.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const invalidWords = words.filter((w) => !BIP39_WORDLIST.includes(w));

  const validLengths = [12, 15, 18, 21, 24];
  const isValid = invalidWords.length === 0 && validLengths.includes(words.length);

  return {
    isValid,
    wordCount: words.length,
    invalidWords,
  };
}
