const CODE_VERIFIER_CHARACTERS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
const MIN_CODE_VERIFIER_LENGTH = 43;
const MAX_CODE_VERIFIER_LENGTH = 128;
const MAX_RANDOM_ATTEMPTS = 100;

type RandomBytes = (length: number) => Uint8Array;

function secureRandomBytes(length: number): Uint8Array {
  if (!globalThis.crypto?.getRandomValues) {
    throw new Error('Secure browser randomness is unavailable');
  }

  const bytes = new Uint8Array(length);
  globalThis.crypto.getRandomValues(bytes);
  return bytes;
}

function requireVerifierLength(length: number): void {
  if (
    !Number.isInteger(length) ||
    length < MIN_CODE_VERIFIER_LENGTH ||
    length > MAX_CODE_VERIFIER_LENGTH
  ) {
    throw new RangeError(
      `PKCE code verifier length must be between ${MIN_CODE_VERIFIER_LENGTH} and ${MAX_CODE_VERIFIER_LENGTH} characters`,
    );
  }
}

function requireRandomBytes(bytes: Uint8Array, requestedLength: number): void {
  if (!(bytes instanceof Uint8Array) || bytes.length !== requestedLength) {
    throw new Error(`Random source must return exactly ${requestedLength} bytes`);
  }
}

function bytesToBase64Url(bytes: Uint8Array): string {
  if (typeof globalThis.btoa !== 'function') {
    throw new Error('Base64 encoding is unavailable in this browser');
  }

  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return globalThis.btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function getSubtleCrypto(): SubtleCrypto {
  if (!globalThis.crypto?.subtle) {
    throw new Error('Web Crypto API is unavailable in this browser');
  }
  return globalThis.crypto.subtle;
}

export function validateCodeVerifier(verifier: string): void {
  requireVerifierLength(verifier.length);
  if (!/^[A-Za-z0-9._~-]+$/.test(verifier)) {
    throw new Error('PKCE code verifier contains unsupported characters');
  }
}

export function generateCodeVerifier(
  length = 64,
  randomBytes: RandomBytes = secureRandomBytes,
): string {
  requireVerifierLength(length);

  // Rejection sampling avoids modulo bias because 198 is the largest multiple
  // of the 66-character alphabet that fits in one byte.
  const unbiasedLimit =
    Math.floor(256 / CODE_VERIFIER_CHARACTERS.length) * CODE_VERIFIER_CHARACTERS.length;
  let verifier = '';

  for (let attempt = 0; verifier.length < length && attempt < MAX_RANDOM_ATTEMPTS; attempt += 1) {
    const requestedLength = Math.max((length - verifier.length) * 2, 32);
    const bytes = randomBytes(requestedLength);
    requireRandomBytes(bytes, requestedLength);

    for (const byte of bytes) {
      if (byte >= unbiasedLimit) continue;
      verifier += CODE_VERIFIER_CHARACTERS[byte % CODE_VERIFIER_CHARACTERS.length];
      if (verifier.length === length) break;
    }
  }

  if (verifier.length !== length) {
    throw new Error('Secure random source did not produce enough usable bytes');
  }

  return verifier;
}

export async function deriveCodeChallenge(verifier: string): Promise<string> {
  validateCodeVerifier(verifier);
  const digest = await getSubtleCrypto().digest('SHA-256', new TextEncoder().encode(verifier));
  return bytesToBase64Url(new Uint8Array(digest));
}

export async function verifyCodeChallenge(
  verifier: string,
  expectedChallenge: string,
): Promise<boolean> {
  if (!/^[A-Za-z0-9_-]{43}$/.test(expectedChallenge)) {
    return false;
  }

  const actualChallenge = await deriveCodeChallenge(verifier);
  let difference = actualChallenge.length ^ expectedChallenge.length;
  const length = Math.max(actualChallenge.length, expectedChallenge.length);

  for (let index = 0; index < length; index += 1) {
    difference |=
      (actualChallenge.charCodeAt(index) || 0) ^ (expectedChallenge.charCodeAt(index) || 0);
  }

  return difference === 0;
}
