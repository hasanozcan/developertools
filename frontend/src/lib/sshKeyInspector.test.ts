// @vitest-environment node
import { createHash, generateKeyPairSync, webcrypto } from 'node:crypto';
import { beforeAll, describe, it, expect } from 'vitest';
import { inspectSshPublicKey } from './sshKeyInspector';

beforeAll(() => {
  Object.defineProperty(globalThis, 'crypto', { configurable: true, value: webcrypto });
});

function sshString(data: Buffer): Buffer {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  return Buffer.concat([len, data]);
}

function buildSshRsaPublicKey(modulusBits: number, comment: string): { key: string; blob: Buffer } {
  const { publicKey } = generateKeyPairSync('rsa', { modulusLength: modulusBits });
  const jwk = publicKey.export({ format: 'jwk' }) as { e: string; n: string };
  const eRaw = Buffer.from(jwk.e, 'base64url');
  const nRaw = Buffer.from(jwk.n, 'base64url');
  const eMpint = eRaw[0] & 0x80 ? Buffer.concat([Buffer.from([0]), eRaw]) : eRaw;
  const nMpint = nRaw[0] & 0x80 ? Buffer.concat([Buffer.from([0]), nRaw]) : nRaw;

  const blob = Buffer.concat([
    sshString(Buffer.from('ssh-rsa')),
    sshString(eMpint),
    sshString(nMpint),
  ]);
  return { key: `ssh-rsa ${blob.toString('base64')} ${comment}`, blob };
}

describe('sshKeyInspector', () => {
  it('decodes OpenSSH Ed25519 wire format and computes exact SHA-256 fingerprint', async () => {
    const key =
      'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8g dev@company.com';
    const blob = Buffer.from(key.split(' ')[1], 'base64');
    const expectedFp =
      'SHA256:' + createHash('sha256').update(blob).digest('base64').replace(/=+$/, '');

    const res = await inspectSshPublicKey(key);
    expect(res.isValid).toBe(true);
    expect(res.keyType).toBe('ssh-ed25519');
    expect(res.curve).toBe('Ed25519');
    expect(res.keyLengthBits).toBe(256);
    expect(res.comment).toBe('dev@company.com');
    expect(res.fingerprintSha256).toBe(expectedFp);
  });

  it('extracts real RSA modulus bit length and rejects corrupted or mismatched keys', async () => {
    const { key, blob } = buildSshRsaPublicKey(2048, 'rsa@host');
    const expectedFp =
      'SHA256:' + createHash('sha256').update(blob).digest('base64').replace(/=+$/, '');

    const res = await inspectSshPublicKey(key);
    expect(res.isValid).toBe(true);
    expect(res.keyType).toBe('ssh-rsa');
    expect(res.keyLengthBits).toBe(2048);
    expect(res.comment).toBe('rsa@host');
    expect(res.fingerprintSha256).toBe(expectedFp);

    const truncated = await inspectSshPublicKey('ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... dev@company.com');
    expect(truncated.isValid).toBe(false);

    const mismatched = await inspectSshPublicKey(`ssh-rsa ${blob.toString('base64').replace(/^/, '')}`);
    expect(mismatched.isValid).toBe(true);

    const wrongDeclared = await inspectSshPublicKey(`ssh-ed25519 ${blob.toString('base64')}`);
    expect(wrongDeclared.isValid).toBe(false);
  });
});
