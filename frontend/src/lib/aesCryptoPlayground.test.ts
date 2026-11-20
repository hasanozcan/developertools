import { webcrypto } from 'node:crypto';
import { beforeAll, afterAll, describe, expect, it, vi } from 'vitest';
import { decryptAes, encryptAes, formatAesKeyHex, generateAesIvHex } from './aesCryptoPlayground';

beforeAll(() => vi.stubGlobal('crypto', webcrypto));
afterAll(() => vi.unstubAllGlobals());

describe('aesCryptoPlayground', () => {
  it('generates valid hex representation for 128-bit and 256-bit keys and IVs', () => {
    expect(formatAesKeyHex(128)).toHaveLength(32);
    expect(formatAesKeyHex(256)).toHaveLength(64);
    expect(generateAesIvHex('AES-GCM')).toHaveLength(24);
    expect(generateAesIvHex('AES-CBC')).toHaveLength(32);
  });

  it('encrypts and decrypts round-trip with AES-GCM and AES-CBC', async () => {
    const cryptoApi = webcrypto as unknown as Crypto;
    const key256 = formatAesKeyHex(256);

    const gcm = await encryptAes('Hello AES-GCM secret!', key256, 'AES-GCM', undefined, cryptoApi);
    expect(gcm.ivHex).toHaveLength(24);
    const gcmPlain = await decryptAes(
      gcm.ciphertextBase64,
      key256,
      gcm.ivHex,
      'AES-GCM',
      'base64',
      cryptoApi,
    );
    expect(gcmPlain).toBe('Hello AES-GCM secret!');

    const key128 = formatAesKeyHex(128);
    const cbc = await encryptAes('Hello AES-CBC!', key128, 'AES-CBC', undefined, cryptoApi);
    expect(cbc.ivHex).toHaveLength(32);
    const cbcPlain = await decryptAes(
      cbc.ciphertextHex,
      key128,
      cbc.ivHex,
      'AES-CBC',
      'hex',
      cryptoApi,
    );
    expect(cbcPlain).toBe('Hello AES-CBC!');
  });

  it('rejects tampered AES-GCM ciphertext or wrong key', async () => {
    const cryptoApi = webcrypto as unknown as Crypto;
    const key = formatAesKeyHex(256);
    const otherKey = formatAesKeyHex(256);
    const encrypted = await encryptAes('sensitive', key, 'AES-GCM', undefined, cryptoApi);

    await expect(
      decryptAes(
        encrypted.ciphertextBase64,
        otherKey,
        encrypted.ivHex,
        'AES-GCM',
        'base64',
        cryptoApi,
      ),
    ).rejects.toThrow(/Decryption failed/);
  });
});
