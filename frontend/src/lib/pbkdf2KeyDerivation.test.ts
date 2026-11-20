import { createHash, pbkdf2Sync, webcrypto } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { derivePbkdf2 } from './pbkdf2KeyDerivation';

describe('pbkdf2KeyDerivation', () => {
  it('derives PBKDF2 SHA-256 and SHA-512 keys matching Node reference output', async () => {
    const cryptoApi = webcrypto as unknown as Crypto;
    const sha256Key = await derivePbkdf2('pass', 'salt', 1000, 16, 'SHA-256', cryptoApi);
    const expected256 = pbkdf2Sync('pass', 'salt', 1000, 16, 'sha256').toString('hex');
    expect(sha256Key).toBe(expected256);
    expect(sha256Key).toHaveLength(32);

    const sha512Key = await derivePbkdf2(
      'master-password',
      'unique-salt',
      2000,
      32,
      'SHA-512',
      cryptoApi,
    );
    const expected512 = pbkdf2Sync('master-password', 'unique-salt', 2000, 32, 'sha512').toString(
      'hex',
    );
    expect(sha512Key).toBe(expected512);
    expect(sha512Key).toHaveLength(64);
    expect(createHash).toBeDefined();
  });

  it('rejects out-of-range iterations or key lengths', async () => {
    const cryptoApi = webcrypto as unknown as Crypto;
    await expect(derivePbkdf2('pass', 'salt', 0, 32, 'SHA-256', cryptoApi)).rejects.toThrow(
      RangeError,
    );
    await expect(derivePbkdf2('pass', 'salt', 100, 0, 'SHA-256', cryptoApi)).rejects.toThrow(
      RangeError,
    );
  });
});
