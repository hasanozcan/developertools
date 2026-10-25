export interface AesConfig {
  algorithm: 'AES-GCM' | 'AES-CBC';
  keySizeBits: 128 | 256;
}

export function formatAesKeyHex(bits: number): string {
  if (bits !== 128 && bits !== 256) {
    throw new RangeError('AES key size must be 128 or 256 bits');
  }
  return Array.from(crypto.getRandomValues(new Uint8Array(bits / 8)), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
}
