import { DEFAULT_PASSPHRASE_WORDS, generateSecurePassphrase } from './passwordSecurity';

export function generateDicewarePassphrase(wordCount = DEFAULT_PASSPHRASE_WORDS, separator = '-'): string {
  return generateSecurePassphrase(wordCount, separator);
}
