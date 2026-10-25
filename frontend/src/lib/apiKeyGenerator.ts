import { secureRandomInt } from './passwordSecurity';

export interface ApiKeyOptions {
  prefix?: string;
  byteLength?: number;
  format?: 'hex' | 'base64' | 'base62';
}

export function generateApiKey(options: ApiKeyOptions = {}): string {
  const { prefix = 'sk_live_', byteLength = 24, format = 'hex' } = options;
  if (!Number.isSafeInteger(byteLength) || byteLength < 1 || byteLength > 65_536) {
    throw new RangeError('byteLength must be between 1 and 65536');
  }
  const charsB62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  if (format === 'base62') {
    return prefix + Array.from({ length: byteLength * 2 }, () => charsB62[secureRandomInt(62)]).join('');
  }
  const bytes = crypto.getRandomValues(new Uint8Array(byteLength));
  const token = format === 'base64'
    ? btoa(String.fromCharCode(...bytes))
    : Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  return prefix + token;
}
