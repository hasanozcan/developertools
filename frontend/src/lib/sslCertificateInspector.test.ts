// @vitest-environment node
import { createHash, webcrypto } from 'node:crypto';
import 'reflect-metadata';
import {
  SubjectAlternativeNameExtension,
  X509CertificateGenerator,
  cryptoProvider,
} from '@peculiar/x509';
import { beforeAll, describe, it, expect } from 'vitest';
import { inspectPemCertificate } from './sslCertificateInspector';

let validCertPem = '';
let expiredCertPem = '';
let expectedFingerprint = '';

beforeAll(async () => {
  const cryptoApi = webcrypto as unknown as Crypto;
  Object.defineProperty(globalThis, 'crypto', { configurable: true, value: webcrypto });
  cryptoProvider.set(cryptoApi);

  const alg = { name: 'ECDSA', namedCurve: 'P-256', hash: 'SHA-256' };
  const keys = (await webcrypto.subtle.generateKey(alg, true, ['sign', 'verify'])) as unknown as CryptoKeyPair;

  const validCert = await X509CertificateGenerator.createSelfSigned(
    {
      serialNumber: '0A1B2C',
      name: 'CN=api.myservice.dev, O=MyService Corp',
      notBefore: new Date('2025-01-01T00:00:00.000Z'),
      notAfter: new Date('2030-01-01T00:00:00.000Z'),
      signingAlgorithm: alg,
      keys,
      extensions: [
        new SubjectAlternativeNameExtension([
          { type: 'dns', value: 'api.myservice.dev' },
          { type: 'dns', value: 'ws.myservice.dev' },
        ]),
      ],
    },
    cryptoApi,
  );
  validCertPem = validCert.toString('pem');

  const fpBytes = createHash('sha256').update(Buffer.from(validCert.rawData)).digest();
  expectedFingerprint = [...fpBytes].map((b) => b.toString(16).padStart(2, '0').toUpperCase()).join(':');

  const expiredCert = await X509CertificateGenerator.createSelfSigned(
    {
      serialNumber: '02',
      name: 'CN=expired.test',
      notBefore: new Date('2020-01-01T00:00:00.000Z'),
      notAfter: new Date('2021-01-01T00:00:00.000Z'),
      signingAlgorithm: alg,
      keys,
    },
    cryptoApi,
  );
  expiredCertPem = expiredCert.toString('pem');
});

describe('sslCertificateInspector', () => {
  it('extracts real X.509 subject, issuer, serial, SANs, daysRemaining, and SHA-256 fingerprint', async () => {
    const res = await inspectPemCertificate(
      validCertPem,
      new Date('2026-01-01T00:00:00.000Z'),
      webcrypto as unknown as Crypto,
    );

    expect(res.isValidPem).toBe(true);
    expect(res.commonName).toBe('api.myservice.dev');
    expect(res.subject).toContain('CN=api.myservice.dev');
    expect(res.issuer).toContain('O=MyService Corp');
    expect(res.serialNumber?.toUpperCase()).toBe('0A1B2C');
    expect(res.sans).toEqual(['api.myservice.dev', 'ws.myservice.dev']);
    expect(res.validity).toBe('valid');
    expect(res.daysRemaining).toBe(1461);
    expect(res.sha256Fingerprint).toBe(expectedFingerprint);
  });

  it('detects expired certificates and rejects truncated/invalid PEM blocks', async () => {
    const expired = await inspectPemCertificate(
      expiredCertPem,
      new Date('2026-01-01T00:00:00.000Z'),
      webcrypto as unknown as Crypto,
    );
    expect(expired.isValidPem).toBe(true);
    expect(expired.validity).toBe('expired');
    expect(expired.daysRemaining).toBeLessThan(0);

    const truncated = await inspectPemCertificate(
      '-----BEGIN CERTIFICATE-----\nMIIBIjANBgkqh...\n-----END CERTIFICATE-----',
      new Date('2026-01-01T00:00:00.000Z'),
      webcrypto as unknown as Crypto,
    );
    expect(truncated.isValidPem).toBe(false);
  });
});
