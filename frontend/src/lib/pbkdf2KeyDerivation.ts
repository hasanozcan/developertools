import crypto from 'crypto';

export function derivePbkdf2(password: string, salt: string, iterations = 100000, keyLen = 32): string {
  return crypto.pbkdf2Sync(password, salt, iterations, keyLen, 'sha256').toString('hex');
}
