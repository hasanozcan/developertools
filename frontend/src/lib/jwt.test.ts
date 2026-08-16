// @vitest-environment node

import { webcrypto } from 'node:crypto';
import { beforeAll, describe, expect, it } from 'vitest';
import { decodeJwt, signJwtHmac, validateJwtClaims, verifyJwtHmac } from './jwt';

function encodeSegment(value: unknown): string {
  return Buffer.from(JSON.stringify(value), 'utf8').toString('base64url');
}

beforeAll(() => {
  Object.defineProperty(globalThis, 'crypto', { configurable: true, value: webcrypto });
});

describe('JWT decoding', () => {
  it('decodes UTF-8 claim values without mojibake', () => {
    const token = `${encodeSegment({ alg: 'none', typ: 'JWT' })}.${encodeSegment({
      city: 'İstanbul',
      emoji: '👋',
    })}.sig`;

    expect(decodeJwt(token)?.payload).toEqual({ city: 'İstanbul', emoji: '👋' });
  });

  it('rejects malformed segments and non-object payloads', () => {
    expect(decodeJwt('abc.%.sig')).toBeNull();
    expect(
      decodeJwt(`${encodeSegment({ alg: 'none' })}.${encodeSegment(['not', 'claims'])}.sig`),
    ).toBeNull();
  });
});

describe('HMAC JWT signing and verification', () => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = { sub: '1234567890', name: 'John Doe', iat: 1516239022 };
  const secret = 'your-256-bit-secret';
  const knownToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  it('reproduces and verifies a known HS256 token', async () => {
    await expect(signJwtHmac(header, payload, secret, 'HS256')).resolves.toBe(knownToken);
    await expect(verifyJwtHmac(knownToken, secret, { now: 1516239022 })).resolves.toMatchObject({
      valid: true,
      signatureValid: true,
      algorithm: 'HS256',
      claimIssues: [],
    });
  });

  it('rejects tampering, the none algorithm, and empty secrets', async () => {
    const tampered = knownToken.replace('SflK', 'AflK');
    await expect(verifyJwtHmac(tampered, secret)).resolves.toMatchObject({
      valid: false,
      signatureValid: false,
      error: 'invalid-signature',
    });

    const noneToken = `${encodeSegment({ alg: 'none' })}.${encodeSegment({ sub: '1' })}.unsigned`;
    await expect(verifyJwtHmac(noneToken, secret)).resolves.toMatchObject({
      valid: false,
      error: 'unsupported-algorithm',
    });
    await expect(signJwtHmac(header, payload, '', 'HS256')).rejects.toThrow(/secret/i);
  });

  it('validates registered time, issuer, and audience claims with clock skew', () => {
    expect(
      validateJwtClaims(
        { exp: 1_000, nbf: 1_020, iat: 1_010, iss: 'issuer-a', aud: ['api-a'] },
        { now: 1_005, clockSkewSeconds: 4, issuer: 'issuer-b', audience: 'api-b' },
      ).map((issue) => issue.code),
    ).toEqual([
      'expired',
      'not-active',
      'issued-in-future',
      'issuer-mismatch',
      'audience-mismatch',
    ]);
  });
});
