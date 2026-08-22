export interface ApiKeyOptions {
  prefix?: string;
  byteLength?: number;
  format?: 'hex' | 'base64' | 'base62';
}

export function generateApiKey(options: ApiKeyOptions = {}): string {
  const { prefix = 'sk_live_', byteLength = 24, format = 'hex' } = options;
  const charsHex = '0123456789abcdef';
  const charsB62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  let token = '';
  const alphabet = format === 'base62' ? charsB62 : charsHex;

  for (let i = 0; i < byteLength * 2; i++) {
    token += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return `${prefix}${token}`;
}
