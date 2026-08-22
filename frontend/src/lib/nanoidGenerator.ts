const DEFAULT_ALPHABET = 'useandom-26T1983_40STLogRowPageFoxKING';

export function generateNanoId(
  size = 21,
  alphabet: string = DEFAULT_ALPHABET,
): string {
  const safeAlphabet = alphabet.length > 0 ? alphabet : DEFAULT_ALPHABET;
  let id = '';
  for (let i = 0; i < size; i++) {
    const idx = Math.floor(Math.random() * safeAlphabet.length);
    id += safeAlphabet[idx];
  }
  return id;
}
