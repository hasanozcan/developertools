export type UuidVersion = 'v4' | 'v7';

export interface UuidFormatOptions {
  uppercase?: boolean;
  includeHyphens?: boolean;
  includeBraces?: boolean;
}

type RandomBytes = (length: number) => Uint8Array;

const MAX_UUID_V7_TIMESTAMP = 0xffffffffffff;

function secureRandomBytes(length: number): Uint8Array {
  if (!globalThis.crypto?.getRandomValues) {
    throw new Error('Secure browser randomness is unavailable');
  }
  const bytes = new Uint8Array(length);
  globalThis.crypto.getRandomValues(bytes);
  return bytes;
}

function getRandomBytes(length: number, randomBytes: RandomBytes): Uint8Array {
  const bytes = randomBytes(length);
  if (!(bytes instanceof Uint8Array) || bytes.length !== length) {
    throw new Error(`Random source must return exactly ${length} bytes`);
  }
  return bytes.slice();
}

function bytesToUuid(bytes: Uint8Array): string {
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function generateUuidV4(randomBytes: RandomBytes = secureRandomBytes): string {
  const bytes = getRandomBytes(16, randomBytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  return bytesToUuid(bytes);
}

export function generateUuidV7(
  timestamp = Date.now(),
  randomBytes: RandomBytes = secureRandomBytes,
): string {
  if (!Number.isSafeInteger(timestamp) || timestamp < 0 || timestamp > MAX_UUID_V7_TIMESTAMP) {
    throw new RangeError('UUID v7 timestamp must be a non-negative 48-bit integer');
  }

  const bytes = getRandomBytes(16, randomBytes);
  let remainingTimestamp = timestamp;
  for (let index = 5; index >= 0; index -= 1) {
    bytes[index] = remainingTimestamp % 256;
    remainingTimestamp = Math.floor(remainingTimestamp / 256);
  }

  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  return bytesToUuid(bytes);
}

export function formatUuid(uuid: string, options: UuidFormatOptions = {}): string {
  const {
    uppercase = false,
    includeHyphens = true,
    includeBraces = false,
  } = options;

  let formatted = includeHyphens ? uuid : uuid.replace(/-/g, '');
  if (uppercase) formatted = formatted.toUpperCase();
  return includeBraces ? `{${formatted}}` : formatted;
}
