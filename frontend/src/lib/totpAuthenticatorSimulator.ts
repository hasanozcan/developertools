import { base32ToBytes } from './totpGenerator';

export interface TotpResult {
  code: string;
  remainingSeconds: number;
  timeStepSeconds: number;
  counter: number;
}

/**
 * Computes a real RFC 6238 / RFC 4226 HMAC-SHA1 TOTP code using Web Crypto.
 */
export async function computeTotp(
  secretBase32: string,
  timeStepSec: number = 30,
  timestampSeconds?: number,
  digits: number = 6,
): Promise<TotpResult> {
  if (!Number.isInteger(timeStepSec) || timeStepSec <= 0) {
    throw new RangeError('Time step must be a positive integer in seconds.');
  }
  if (!Number.isInteger(digits) || digits < 6 || digits > 8) {
    throw new RangeError('TOTP digits must be between 6 and 8.');
  }

  const normalized = secretBase32.toUpperCase().replace(/[\s-]+/g, '').replace(/=+$/u, '');
  if (!normalized || !/^[A-Z2-7]+$/.test(normalized)) {
    throw new Error('Enter a valid Base32 secret (characters A-Z and 2-7).');
  }

  const keyBytes = base32ToBytes(normalized);
  if (keyBytes.length === 0) {
    throw new Error('Base32 secret decoded to 0 bytes.');
  }

  const epoch =
    timestampSeconds !== undefined ? Math.floor(timestampSeconds) : Math.floor(Date.now() / 1000);
  if (!Number.isFinite(epoch) || epoch < 0) {
    throw new RangeError('Timestamp must be a non-negative Unix epoch in seconds.');
  }

  const counter = Math.floor(epoch / timeStepSec);
  const remainingSeconds = timeStepSec - (epoch % timeStepSec);

  const counterBuffer = new ArrayBuffer(8);
  new DataView(counterBuffer).setBigUint64(0, BigInt(counter), false);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBytes as unknown as BufferSource,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign'],
  );

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, counterBuffer);
  const hmac = new Uint8Array(signature);

  const offset = hmac[hmac.length - 1] & 0x0f;
  const binary =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);

  const code = (binary % 10 ** digits).toString().padStart(digits, '0');

  return {
    code,
    remainingSeconds,
    timeStepSeconds: timeStepSec,
    counter,
  };
}
