const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

export function encodeBase58(text: string): string {
  if (!text) return '';
  const bytes = new TextEncoder().encode(text);
  let zeroCount = 0;
  while (zeroCount < bytes.length && bytes[zeroCount] === 0) {
    zeroCount++;
  }

  // Convert bytes array to big integer representation
  let num = BigInt(0);
  for (let i = 0; i < bytes.length; i++) {
    num = (num << BigInt(8)) + BigInt(bytes[i]);
  }

  let encoded = '';
  while (num > BigInt(0)) {
    const rem = Number(num % BigInt(58));
    num = num / BigInt(58);
    encoded = BASE58_ALPHABET[rem] + encoded;
  }

  return '1'.repeat(zeroCount) + encoded;
}

export function decodeBase58(base58String: string): string {
  if (!base58String) return '';
  let zeroCount = 0;
  while (zeroCount < base58String.length && base58String[zeroCount] === '1') {
    zeroCount++;
  }

  let num = BigInt(0);
  for (let i = 0; i < base58String.length; i++) {
    const char = base58String[i];
    const idx = BASE58_ALPHABET.indexOf(char);
    if (idx === -1) {
      throw new Error(`Invalid Base58 character "${char}"`);
    }
    num = num * BigInt(58) + BigInt(idx);
  }

  const bytes: number[] = [];
  while (num > BigInt(0)) {
    bytes.unshift(Number(num & BigInt(255)));
    num = num >> BigInt(8);
  }

  for (let i = 0; i < zeroCount; i++) {
    bytes.unshift(0);
  }

  return new TextDecoder().decode(new Uint8Array(bytes));
}
