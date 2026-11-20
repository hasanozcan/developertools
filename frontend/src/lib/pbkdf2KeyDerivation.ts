export type Pbkdf2HashAlgorithm = 'SHA-256' | 'SHA-512';

const MAX_PBKDF2_ITERATIONS = 5_000_000;
const MAX_KEY_BYTES = 1024;

export async function derivePbkdf2(
  password: string,
  salt: string,
  iterations = 100_000,
  keyLen = 32,
  hash: Pbkdf2HashAlgorithm = 'SHA-256',
  cryptoApi: Crypto = globalThis.crypto,
): Promise<string> {
  if (!Number.isInteger(iterations) || iterations < 1 || iterations > MAX_PBKDF2_ITERATIONS) {
    throw new RangeError(
      `Iterations must be an integer between 1 and ${MAX_PBKDF2_ITERATIONS.toLocaleString()}.`,
    );
  }
  if (!Number.isInteger(keyLen) || keyLen < 1 || keyLen > MAX_KEY_BYTES) {
    throw new RangeError(`Key length must be an integer between 1 and ${MAX_KEY_BYTES} bytes.`);
  }
  if (!cryptoApi?.subtle) {
    throw new Error('Web Crypto API (crypto.subtle) is unavailable in this environment.');
  }

  const encoder = new TextEncoder();
  const passwordBytes = encoder.encode(password);
  const saltBytes = encoder.encode(salt);

  const keyMaterial = await cryptoApi.subtle.importKey(
    'raw',
    passwordBytes,
    { name: 'PBKDF2' },
    false,
    ['deriveBits'],
  );

  const derivedBits = await cryptoApi.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBytes,
      iterations,
      hash,
    },
    keyMaterial,
    keyLen * 8,
  );

  return Array.from(new Uint8Array(derivedBits), (byte) => byte.toString(16).padStart(2, '0')).join(
    '',
  );
}
