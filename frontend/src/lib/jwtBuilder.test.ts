// @vitest-environment node
import { webcrypto } from 'node:crypto';
import { beforeAll, describe, expect, it } from 'vitest';
import { buildSignedJwt } from './jwtBuilder';
import { verifyJwtHmac } from './jwt';

beforeAll(() => {
  Object.defineProperty(globalThis, 'crypto', { configurable: true, value: webcrypto });
});

describe('jwtBuilder', () => {
  it('reproduces the canonical HS256 JWT vector and verifies cryptographically', async () => {
    const token = await buildSignedJwt(
      { alg: 'HS256', typ: 'JWT' },
      { sub: '1234567890', name: 'John Doe', iat: 1516239022 },
      'your-256-bit-secret',
    );
    expect(token).toBe(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    );

    const verified = await verifyJwtHmac(token, 'your-256-bit-secret', { now: 1516239022 });
    expect(verified.signatureValid).toBe(true);
    expect(verified.valid).toBe(true);
  });

  it('signs HS384 and HS512 tokens and rejects empty secrets or alg=none', async () => {
    const hs384 = await buildSignedJwt({ typ: 'JWT' }, { sub: 'u1' }, 'secret-key', 'HS384');
    expect((await verifyJwtHmac(hs384, 'secret-key')).signatureValid).toBe(true);

    const hs512 = await buildSignedJwt({ typ: 'JWT' }, { sub: 'u1' }, 'secret-key', 'HS512');
    expect((await verifyJwtHmac(hs512, 'secret-key')).signatureValid).toBe(true);

    await expect(
      buildSignedJwt({ alg: 'HS256', typ: 'JWT' }, { sub: '1' }, ''),
    ).rejects.toThrow(/secret/i);

    await expect(
      buildSignedJwt({ alg: 'none', typ: 'JWT' }, { sub: '1' }, 'secret-key'),
    ).rejects.toThrow(/Unsupported JWT signing algorithm/i);
  });
});
