import crypto from 'crypto';

export function calculateHmac(message: string, secret: string, algo: 'sha384' | 'sha512' = 'sha512'): { hex: string; base64: string } {
  const hmac = crypto.createHmac(algo, secret).update(message);
  return {
    hex: hmac.digest('hex'),
    base64: crypto.createHmac(algo, secret).update(message).digest('base64')
  };
}
