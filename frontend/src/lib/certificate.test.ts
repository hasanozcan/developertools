// @vitest-environment node

import { webcrypto } from 'node:crypto';
import 'reflect-metadata';
import {
  SubjectAlternativeNameExtension,
  X509CertificateGenerator,
  cryptoProvider,
} from '@peculiar/x509';
import { beforeAll, describe, expect, it } from 'vitest';
import { CertificateError, parseX509Certificates } from './certificate';

let certificatePem = '';
let certificateBase64 = '';

beforeAll(async () => {
  const cryptoApi = webcrypto as unknown as Crypto;
  Object.defineProperty(globalThis, 'crypto', { configurable: true, value: webcrypto });
  cryptoProvider.set(cryptoApi);
  const algorithm: RsaHashedKeyGenParams = {
    name: 'RSASSA-PKCS1-v1_5',
    modulusLength: 1024,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: 'SHA-256',
  };
  const keys = (await webcrypto.subtle.generateKey(algorithm, true, [
    'sign',
    'verify',
  ])) as unknown as CryptoKeyPair;
  const certificate = await X509CertificateGenerator.createSelfSigned(
    {
      serialNumber: '01AB',
      name: 'CN=example.test, O=Developer Tools',
      notBefore: new Date('2025-01-01T00:00:00.000Z'),
      notAfter: new Date('2030-01-01T00:00:00.000Z'),
      signingAlgorithm: algorithm,
      keys,
      extensions: [
        new SubjectAlternativeNameExtension([
          { type: 'dns', value: 'example.test' },
          { type: 'ip', value: '127.0.0.1' },
        ]),
      ],
    },
    cryptoApi,
  );
  certificatePem = certificate.toString('pem');
  certificateBase64 = certificate.toString('base64');
});

describe('X.509 certificate parsing', () => {
  it('decodes identity, validity, algorithms, SANs, and fingerprint', async () => {
    const [certificate] = await parseX509Certificates(
      certificatePem,
      new Date('2026-01-01T00:00:00.000Z'),
      webcrypto as unknown as Crypto,
    );

    expect(certificate.subject).toContain('CN=example.test');
    expect(certificate.issuer).toBe(certificate.subject);
    expect(certificate.serialNumber).toBe('01ab');
    expect(certificate.validity).toBe('valid');
    expect(certificate.signatureAlgorithm).toContain('SHA-256');
    expect(certificate.publicKeyAlgorithm).toContain('RSASSA-PKCS1-v1_5');
    expect(certificate.publicKeyDetails).toContain('1024-bit modulus');
    expect(certificate.subjectAlternativeNames).toEqual(
      expect.arrayContaining([
        { type: 'dns', value: 'example.test' },
        { type: 'ip', value: '127.0.0.1' },
      ]),
    );
    expect(certificate.sha256Fingerprint).toMatch(/^(?:[\dA-F]{2}:){31}[\dA-F]{2}$/u);
    expect(certificate.selfIssued).toBe(true);
    expect(certificate.selfSigned).toBe(true);
  });

  it('accepts Base64 DER and reports expired certificates relative to the comparison date', async () => {
    const [certificate] = await parseX509Certificates(
      certificateBase64,
      new Date('2031-01-01T00:00:00.000Z'),
      webcrypto as unknown as Crypto,
    );
    expect(certificate.validity).toBe('expired');
    expect(certificate.daysRemaining).toBeLessThan(0);
  });

  it('rejects empty, private-key, and oversized input', async () => {
    await expect(parseX509Certificates('')).rejects.toThrow(CertificateError);
    await expect(
      parseX509Certificates('-----BEGIN PRIVATE KEY-----\nAAAA\n-----END PRIVATE KEY-----'),
    ).rejects.toThrow(/Private keys and CSRs/u);
    await expect(parseX509Certificates('A'.repeat(250_001))).rejects.toThrow(/limited/u);
  });
});
