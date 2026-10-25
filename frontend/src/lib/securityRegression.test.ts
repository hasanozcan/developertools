// @vitest-environment node
import { createHmac, createPrivateKey, createPublicKey, webcrypto } from 'node:crypto';
import { afterEach, beforeAll, afterAll, describe, expect, it, vi } from 'vitest';
import { compare } from 'bcryptjs';
import { argon2Verify } from 'hash-wasm';
import { long as words } from '@wordlist/english-eff/long';
import { generateApiKey } from './apiKeyGenerator';
import { formatAesKeyHex } from './aesCryptoPlayground';
import { generateArgon2idHash } from './argon2HashGenerator';
import { generateBcryptHash } from './bcryptHashCalculator';
import { generateEd25519Keypair } from './ed25519KeyGenerator';
import { generateDicewarePassphrase } from './passphraseWordlistGenerator';
import { verifyHmacSignature } from './webhookSignatureVerifier';

beforeAll(() => vi.stubGlobal('crypto', webcrypto));
afterEach(() => vi.restoreAllMocks());
afterAll(() => vi.unstubAllGlobals());

describe('security regressions', () => {
  it('generates API and AES keys without Math.random', () => {
    vi.spyOn(Math, 'random').mockImplementation(() => { throw new Error('Unsafe randomness'); });
    expect(generateApiKey()).toMatch(/^sk_live_[0-9a-f]{48}$/);
    expect(formatAesKeyHex(256)).toMatch(/^[0-9a-f]{64}$/);
  });

  it('encodes the requested random bytes as Base64', () => {
    const key = generateApiKey({ prefix: '', byteLength: 16, format: 'base64' });
    expect(Buffer.from(key, 'base64')).toHaveLength(16);
  });

  it('uses six EFF words by default and rejects weak passphrase sizes', () => {
    vi.spyOn(Math, 'random').mockImplementation(() => { throw new Error('Unsafe randomness'); });
    const passphrase = generateDicewarePassphrase();
    expect(passphrase.split('-')).toHaveLength(6);
    expect(passphrase.split('-').every((word) => words.includes(word))).toBe(true);
    expect(() => generateDicewarePassphrase(4)).toThrow(RangeError);
  });

  it('generates real Argon2id hashes with a fresh salt', async () => {
    const params = { timeCost: 2, memoryCostKiB: 65536, parallelism: 1 };
    const hash = await generateArgon2idHash('audit-test-password', params);
    await expect(argon2Verify({ password: 'audit-test-password', hash })).resolves.toBe(true);
    await expect(argon2Verify({ password: 'wrong-password', hash })).resolves.toBe(false);
    expect(await generateArgon2idHash('audit-test-password', params)).not.toBe(hash);
  });

  it('generates bcrypt hashes accepted by an independent verifier', async () => {
    const hash = await generateBcryptHash('audit-test-password', 4);
    await expect(compare('audit-test-password', hash)).resolves.toBe(true);
    await expect(compare('wrong-password', hash)).resolves.toBe(false);
    expect(await generateBcryptHash('audit-test-password', 4)).not.toBe(hash);
  });

  it('derives the displayed Ed25519 public key from the displayed private seed', async () => {
    const pair = await generateEd25519Keypair();
    const seed = Buffer.from(pair.privateKeyHex.slice(2), 'hex');
    const privateKey = createPrivateKey({
      key: Buffer.concat([Buffer.from('302e020100300506032b657004220420', 'hex'), seed]),
      format: 'der', type: 'pkcs8',
    });
    const publicKey = createPublicKey(privateKey).export({ format: 'der', type: 'spki' });
    expect(pair.publicKeyHex).toBe('0x' + publicKey.subarray(-32).toString('hex'));
  });

  it('checks the entire HMAC against the secret, including for long payloads', async () => {
    const payload = 'a'.repeat(100);
    const secret = 'audit-secret';
    const signature = 'sha256=' + createHmac('sha256', secret).update(payload).digest('hex');
    expect((await verifyHmacSignature(payload, secret, signature)).valid).toBe(true);
    expect((await verifyHmacSignature(payload, 'different-secret', signature)).valid).toBe(false);
    expect((await verifyHmacSignature(payload, secret, signature + '00')).valid).toBe(false);
    expect((await verifyHmacSignature(payload, secret, 'prefix-' + signature)).valid).toBe(false);
    expect((await verifyHmacSignature(payload, secret, '')).computed).toBe(signature);
  });
});
