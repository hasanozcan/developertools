import { secureRandomInt } from './passwordSecurity';

const DEFAULT_ALPHABET = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

export function generateNanoId(
  size = 21,
  alphabet: string = DEFAULT_ALPHABET,
): string {
  if (!Number.isSafeInteger(size) || size <= 0) {
    throw new RangeError('NanoID size must be a positive safe integer');
  }
  const safeAlphabet = alphabet.length > 0 ? alphabet : DEFAULT_ALPHABET;
  let id = '';
  for (let i = 0; i < size; i++) {
    const idx = secureRandomInt(safeAlphabet.length);
    id += safeAlphabet[idx];
  }
  return id;
}
