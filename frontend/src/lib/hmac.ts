export const HMAC_ALGORITHMS = ['SHA-256', 'SHA-384', 'SHA-512'] as const;
export const HMAC_OUTPUT_ENCODINGS = ['hex', 'base64'] as const;

export type HmacAlgorithm = (typeof HMAC_ALGORITHMS)[number];
export type HmacOutputEncoding = (typeof HMAC_OUTPUT_ENCODINGS)[number];

function requireNonEmpty(value: string, fieldName: string): void {
  if (value.length === 0) {
    throw new Error(`${fieldName} is required`);
  }
}

function assertAlgorithm(algorithm: HmacAlgorithm): void {
  if (!HMAC_ALGORITHMS.includes(algorithm)) {
    throw new Error(`Unsupported HMAC algorithm: ${algorithm}`);
  }
}

function assertEncoding(encoding: HmacOutputEncoding): void {
  if (!HMAC_OUTPUT_ENCODINGS.includes(encoding)) {
    throw new Error(`Unsupported HMAC output encoding: ${encoding}`);
  }
}

function getSubtleCrypto(): SubtleCrypto {
  if (!globalThis.crypto?.subtle) {
    throw new Error('Web Crypto API is unavailable in this browser');
  }
  return globalThis.crypto.subtle;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function bytesToBase64(bytes: Uint8Array): string {
  if (typeof globalThis.btoa !== 'function') {
    throw new Error('Base64 encoding is unavailable in this browser');
  }
  return globalThis.btoa(String.fromCharCode(...bytes));
}

function hexToBytes(value: string): Uint8Array {
  if (value.length % 2 !== 0 || !/^[0-9a-f]+$/i.test(value)) {
    throw new Error('Signature is not valid hexadecimal');
  }

  return Uint8Array.from(value.match(/.{2}/g) ?? [], (pair) => Number.parseInt(pair, 16));
}

function base64ToBytes(value: string): Uint8Array {
  if (
    value.length % 4 !== 0 ||
    !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value)
  ) {
    throw new Error('Signature is not valid Base64');
  }

  if (typeof globalThis.atob !== 'function') {
    throw new Error('Base64 decoding is unavailable in this browser');
  }

  try {
    return Uint8Array.from(globalThis.atob(value), (character) => character.charCodeAt(0));
  } catch {
    throw new Error('Signature is not valid Base64');
  }
}

function decodeSignature(signature: string, encoding: HmacOutputEncoding): Uint8Array {
  const normalized = signature.trim();
  requireNonEmpty(normalized, 'Signature');
  return encoding === 'hex' ? hexToBytes(normalized) : base64ToBytes(normalized);
}

async function signHmac(
  message: string,
  secret: string,
  algorithm: HmacAlgorithm,
): Promise<Uint8Array> {
  requireNonEmpty(secret, 'Secret');
  assertAlgorithm(algorithm);

  const subtle = getSubtleCrypto();
  const encoder = new TextEncoder();
  const key = await subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: { name: algorithm } },
    false,
    ['sign'],
  );
  return new Uint8Array(await subtle.sign('HMAC', key, encoder.encode(message)));
}

/**
 * Compares every byte without returning early. JavaScript runtimes cannot offer
 * strict timing guarantees, so this is a best-effort constant-time comparison.
 */
export function constantTimeEqual(left: Uint8Array, right: Uint8Array): boolean {
  const comparisonLength = Math.max(left.length, right.length);
  let difference = left.length ^ right.length;

  for (let index = 0; index < comparisonLength; index += 1) {
    difference |=
      (index < left.length ? left[index] : 0) ^ (index < right.length ? right[index] : 0);
  }

  return difference === 0;
}

export async function generateHmac(
  message: string,
  secret: string,
  algorithm: HmacAlgorithm = 'SHA-256',
  outputEncoding: HmacOutputEncoding = 'hex',
): Promise<string> {
  assertEncoding(outputEncoding);
  const signature = await signHmac(message, secret, algorithm);
  return outputEncoding === 'hex' ? bytesToHex(signature) : bytesToBase64(signature);
}

export async function verifyHmac(
  message: string,
  secret: string,
  signature: string,
  algorithm: HmacAlgorithm = 'SHA-256',
  signatureEncoding: HmacOutputEncoding = 'hex',
): Promise<boolean> {
  requireNonEmpty(secret, 'Secret');
  assertAlgorithm(algorithm);
  assertEncoding(signatureEncoding);

  const suppliedSignature = decodeSignature(signature, signatureEncoding);
  const subtle = getSubtleCrypto();
  const encoder = new TextEncoder();
  const key = await subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: { name: algorithm } },
    false,
    ['verify'],
  );
  return subtle.verify('HMAC', key, suppliedSignature, encoder.encode(message));
}
