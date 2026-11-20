export type AesAlgorithm = 'AES-GCM' | 'AES-CBC';
export type AesKeyBits = 128 | 256;

export interface AesConfig {
  algorithm: AesAlgorithm;
  keySizeBits: AesKeyBits;
}

export interface AesEncryptResult {
  ciphertextBase64: string;
  ciphertextHex: string;
  ivHex: string;
  algorithm: AesAlgorithm;
  keySizeBits: AesKeyBits;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function hexToBytes(hex: string, label: string): Uint8Array {
  const clean = (hex || '').trim().toLowerCase();
  if (!clean || clean.length % 2 !== 0 || !/^[0-9a-f]+$/.test(clean)) {
    throw new Error(`${label} must be an even-length hexadecimal string.`);
  }
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

function base64ToBytes(base64: string): Uint8Array {
  const clean = (base64 || '').trim();
  const binary = atob(clean);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

export function formatAesKeyHex(bits: number): string {
  if (bits !== 128 && bits !== 256) {
    throw new RangeError('AES key size must be 128 or 256 bits');
  }
  return bytesToHex(crypto.getRandomValues(new Uint8Array(bits / 8)));
}

export function generateAesIvHex(algorithm: AesAlgorithm): string {
  const byteLength = algorithm === 'AES-GCM' ? 12 : 16;
  return bytesToHex(crypto.getRandomValues(new Uint8Array(byteLength)));
}

function validateKeyAndIv(
  keyHex: string,
  ivHex: string,
  algorithm: AesAlgorithm,
): { keyBytes: Uint8Array; ivBytes: Uint8Array; keySizeBits: AesKeyBits } {
  const keyBytes = hexToBytes(keyHex, 'AES key');
  if (keyBytes.length !== 16 && keyBytes.length !== 32) {
    throw new Error('AES key must be 128 bits (32 hex chars) or 256 bits (64 hex chars).');
  }
  const expectedIvBytes = algorithm === 'AES-GCM' ? 12 : 16;
  const ivBytes = hexToBytes(ivHex, 'IV');
  if (ivBytes.length !== expectedIvBytes) {
    throw new Error(
      `${algorithm} requires a ${expectedIvBytes}-byte (${expectedIvBytes * 2} hex chars) IV.`,
    );
  }
  return {
    keyBytes,
    ivBytes,
    keySizeBits: keyBytes.length === 16 ? 128 : 256,
  };
}

export async function encryptAes(
  plaintext: string,
  keyHex: string,
  algorithm: AesAlgorithm,
  ivHex?: string,
  cryptoApi: Crypto = globalThis.crypto,
): Promise<AesEncryptResult> {
  if (!cryptoApi?.subtle) {
    throw new Error('Web Crypto API (crypto.subtle) is unavailable in this environment.');
  }

  const effectiveIvHex = ivHex?.trim() ? ivHex.trim() : generateAesIvHex(algorithm);
  const { keyBytes, ivBytes, keySizeBits } = validateKeyAndIv(keyHex, effectiveIvHex, algorithm);

  const key = await cryptoApi.subtle.importKey(
    'raw',
    toArrayBuffer(keyBytes),
    { name: algorithm },
    false,
    ['encrypt'],
  );

  const encoded = new TextEncoder().encode(plaintext);
  const encryptedBuffer = await cryptoApi.subtle.encrypt(
    { name: algorithm, iv: toArrayBuffer(ivBytes) },
    key,
    toArrayBuffer(encoded),
  );
  const cipherBytes = new Uint8Array(encryptedBuffer);

  return {
    ciphertextBase64: bytesToBase64(cipherBytes),
    ciphertextHex: bytesToHex(cipherBytes),
    ivHex: bytesToHex(ivBytes),
    algorithm,
    keySizeBits,
  };
}

export async function decryptAes(
  ciphertext: string,
  keyHex: string,
  ivHex: string,
  algorithm: AesAlgorithm,
  inputFormat: 'base64' | 'hex' = 'base64',
  cryptoApi: Crypto = globalThis.crypto,
): Promise<string> {
  if (!cryptoApi?.subtle) {
    throw new Error('Web Crypto API (crypto.subtle) is unavailable in this environment.');
  }

  const { keyBytes, ivBytes } = validateKeyAndIv(keyHex, ivHex, algorithm);
  const cipherBytes =
    inputFormat === 'hex' ? hexToBytes(ciphertext, 'Ciphertext') : base64ToBytes(ciphertext);

  const key = await cryptoApi.subtle.importKey(
    'raw',
    toArrayBuffer(keyBytes),
    { name: algorithm },
    false,
    ['decrypt'],
  );

  try {
    const decryptedBuffer = await cryptoApi.subtle.decrypt(
      { name: algorithm, iv: toArrayBuffer(ivBytes) },
      key,
      toArrayBuffer(cipherBytes),
    );
    return new TextDecoder().decode(new Uint8Array(decryptedBuffer));
  } catch {
    throw new Error(
      `Decryption failed for ${algorithm}. Verify the key, IV, ciphertext format, and authentication tag.`,
    );
  }
}
