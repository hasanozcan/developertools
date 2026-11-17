// @vitest-environment node
import { webcrypto } from 'node:crypto';
import { beforeAll, describe, expect, it } from 'vitest';
import { validateJwtSignature } from './jwtSignatureValidator';
import { signJwtHmac } from './jwt';

beforeAll(() => {
  Object.defineProperty(globalThis, 'crypto', { configurable: true, value: webcrypto });
});

function toBase64Url(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString('base64url');
}

function spkiToPem(spki: ArrayBuffer): string {
  const b64 = Buffer.from(spki).toString('base64');
  const lines = b64.match(/.{1,64}/g)?.join('\n') ?? b64;
  return `-----BEGIN PUBLIC KEY-----\n${lines}\n-----END PUBLIC KEY-----`;
}

describe('jwtSignatureValidator', () => {
  const knownHs256 =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  it('verifies valid HS256 signature and rejects missing secret, wrong secret, and tampering', async () => {
    const valid = await validateJwtSignature(knownHs256, 'your-256-bit-secret', {
      now: 1516239022,
    });
    expect(valid.isValidStructure).toBe(true);
    expect(valid.signatureValid).toBe(true);
    expect(valid.isValid).toBe(true);
    expect(valid.payload?.name).toBe('John Doe');

    const missingSecret = await validateJwtSignature(knownHs256, '');
    expect(missingSecret.signatureValid).toBe(false);
    expect(missingSecret.isValid).toBe(false);

    const wrongSecret = await validateJwtSignature(knownHs256, 'wrong-secret');
    expect(wrongSecret.signatureValid).toBe(false);
    expect(wrongSecret.isValid).toBe(false);

    const tamperedPayload = toBase64Url(
      new TextEncoder().encode(JSON.stringify({ sub: '1234567890', name: 'Jane Doe', iat: 1516239022 })),
    );
    const knownParts = knownHs256.split('.');
    const tampered = `${knownParts[0]}.${tamperedPayload}.${knownParts[2]}`;
    const tamperedRes = await validateJwtSignature(tampered, 'your-256-bit-secret');
    expect(tamperedRes.signatureValid).toBe(false);
    expect(tamperedRes.isValid).toBe(false);
  });

  it('rejects alg=none and flags expired claims even with valid signature', async () => {
    const header = toBase64Url(new TextEncoder().encode(JSON.stringify({ alg: 'none', typ: 'JWT' })));
    const payload = toBase64Url(new TextEncoder().encode(JSON.stringify({ sub: '1' })));
    const noneRes = await validateJwtSignature(`${header}.${payload}.`, 'any-secret');
    expect(noneRes.signatureValid).toBe(false);
    expect(noneRes.isValid).toBe(false);

    const expiredToken = await signJwtHmac(
      { alg: 'HS256', typ: 'JWT' },
      { sub: '1', exp: 1000 },
      'secret',
      'HS256',
    );
    const expiredRes = await validateJwtSignature(expiredToken, 'secret', { now: 2000 });
    expect(expiredRes.signatureValid).toBe(true);
    expect(expiredRes.isExpired).toBe(true);
    expect(expiredRes.isValid).toBe(false);
  });

  it('verifies RS256 and ES256 signatures using PEM SPKI and JWK public keys', async () => {
    const rsaKeys = await webcrypto.subtle.generateKey(
      {
        name: 'RSASSA-PKCS1-v1_5',
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: 'SHA-256',
      },
      true,
      ['sign', 'verify'],
    );
    const rsaHeader = toBase64Url(new TextEncoder().encode(JSON.stringify({ alg: 'RS256', typ: 'JWT' })));
    const rsaPayload = toBase64Url(new TextEncoder().encode(JSON.stringify({ sub: 'rsa-user' })));
    const rsaInput = `${rsaHeader}.${rsaPayload}`;
    const rsaSig = await webcrypto.subtle.sign(
      'RSASSA-PKCS1-v1_5',
      rsaKeys.privateKey,
      new TextEncoder().encode(rsaInput),
    );
    const rsaToken = `${rsaInput}.${toBase64Url(new Uint8Array(rsaSig))}`;
    const rsaPem = spkiToPem(await webcrypto.subtle.exportKey('spki', rsaKeys.publicKey));

    const rsaValid = await validateJwtSignature(rsaToken, rsaPem);
    expect(rsaValid.signatureValid).toBe(true);
    expect(rsaValid.isValid).toBe(true);

    const rsaTamperedPayload = toBase64Url(
      new TextEncoder().encode(JSON.stringify({ sub: 'evil' })),
    );
    const rsaTampered = `${rsaHeader}.${rsaTamperedPayload}.${rsaToken.split('.')[2]}`;
    const rsaTamperedRes = await validateJwtSignature(rsaTampered, rsaPem);
    expect(rsaTamperedRes.signatureValid).toBe(false);
    expect(rsaTamperedRes.isValid).toBe(false);

    const ecKeys = await webcrypto.subtle.generateKey(
      { name: 'ECDSA', namedCurve: 'P-256' },
      true,
      ['sign', 'verify'],
    );
    const ecHeader = toBase64Url(new TextEncoder().encode(JSON.stringify({ alg: 'ES256', typ: 'JWT' })));
    const ecPayload = toBase64Url(new TextEncoder().encode(JSON.stringify({ sub: 'ec-user' })));
    const ecInput = `${ecHeader}.${ecPayload}`;
    const ecSig = await webcrypto.subtle.sign(
      { name: 'ECDSA', hash: 'SHA-256' },
      ecKeys.privateKey,
      new TextEncoder().encode(ecInput),
    );
    const ecToken = `${ecInput}.${toBase64Url(new Uint8Array(ecSig))}`;
    const ecJwk = JSON.stringify(await webcrypto.subtle.exportKey('jwk', ecKeys.publicKey));

    const ecValid = await validateJwtSignature(ecToken, ecJwk);
    expect(ecValid.signatureValid).toBe(true);
    expect(ecValid.isValid).toBe(true);
  });
});
