export interface AesConfig {
  algorithm: 'AES-GCM' | 'AES-CBC';
  keySizeBits: 128 | 256;
}

export function formatAesKeyHex(bits: number): string {
  const hexChars = '0123456789abcdef';
  const len = bits / 4;
  let out = '';
  for (let i = 0; i < len; i++) {
    out += hexChars[Math.floor(Math.random() * 16)];
  }
  return out;
}
