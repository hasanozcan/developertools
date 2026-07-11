import { long as EFF_LONG_WORDLIST } from '@wordlist/english-eff/long';

export const MIN_PASSPHRASE_WORDS = 6;
export const DEFAULT_PASSPHRASE_WORDS = 6;
export const MAX_PASSPHRASE_WORDS = 12;

const UINT32_RANGE = 0x1_0000_0000;

export function secureRandomInt(maxExclusive: number): number {
  if (!Number.isSafeInteger(maxExclusive) || maxExclusive <= 0 || maxExclusive > UINT32_RANGE) {
    throw new RangeError('maxExclusive must be an integer between 1 and 2^32');
  }

  const limit = UINT32_RANGE - (UINT32_RANGE % maxExclusive);
  const randomValue = new Uint32Array(1);

  do {
    crypto.getRandomValues(randomValue);
  } while (randomValue[0] >= limit);

  return randomValue[0] % maxExclusive;
}

export function generateSecurePassphrase(wordCount: number, separator: string): string {
  if (
    !Number.isSafeInteger(wordCount) ||
    wordCount < MIN_PASSPHRASE_WORDS ||
    wordCount > MAX_PASSPHRASE_WORDS
  ) {
    throw new RangeError(
      `wordCount must be between ${MIN_PASSPHRASE_WORDS} and ${MAX_PASSPHRASE_WORDS}`,
    );
  }

  return Array.from(
    { length: wordCount },
    () => EFF_LONG_WORDLIST[secureRandomInt(EFF_LONG_WORDLIST.length)],
  ).join(separator);
}

export function estimatePassphraseEntropyBits(wordCount: number): number {
  return wordCount * Math.log2(EFF_LONG_WORDLIST.length);
}
