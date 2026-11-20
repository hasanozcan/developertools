import { webcrypto } from 'node:crypto';
import 'reflect-metadata';
import {
  Pkcs10CertificateRequestGenerator,
  SubjectAlternativeNameExtension,
  cryptoProvider,
} from '@peculiar/x509';
import { describe, expect, it } from 'vitest';
import { parseCsr, parseCsrAsync } from './x509CsrDecoder';

describe('x509CsrDecoder', () => {
  it('detects CSR PEM block even when truncated and reports decode error', () => {
    const pem =
      '-----BEGIN CERTIFICATE REQUEST-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA\n-----END CERTIFICATE REQUEST-----';
    const res = parseCsr(pem);
    expect(res.isCsr).toBe(true);
    expect(res.error).toBeDefined();
  });

  it('decodes full PKCS#10 CSR subject, CN, SANs, algorithms, and verifies signature', async () => {
    const cryptoApi = webcrypto as unknown as Crypto;
    cryptoProvider.set(cryptoApi);
    const alg = { name: 'ECDSA', namedCurve: 'P-256', hash: 'SHA-256' };
    const keys = (await webcrypto.subtle.generateKey(alg, true, [
      'sign',
      'verify',
    ])) as unknown as CryptoKeyPair;

    const csr = await Pkcs10CertificateRequestGenerator.create(
      {
        name: 'CN=api.example.test, O=DevsTools, C=US',
        keys,
        signingAlgorithm: alg,
        extensions: [
          new SubjectAlternativeNameExtension([
            { type: 'dns', value: 'api.example.test' },
            { type: 'dns', value: 'www.example.test' },
          ]),
        ],
      },
      cryptoApi,
    );

    const pem = csr.toString('pem');
    const syncParsed = parseCsr(pem);
    expect(syncParsed.isCsr).toBe(true);
    expect(syncParsed.error).toBeUndefined();
    expect(syncParsed.commonName).toBe('api.example.test');
    expect(syncParsed.subject).toContain('O=DevsTools');
    expect(syncParsed.sans).toEqual(['dns: api.example.test', 'dns: www.example.test']);
    expect(syncParsed.publicKeyAlgorithm).toContain('ECDSA');
    expect(syncParsed.publicKeyDetails).toContain('Curve P-256');

    const asyncParsed = await parseCsrAsync(pem, cryptoApi);
    expect(asyncParsed.signatureValid).toBe(true);
    expect(asyncParsed.sha256Fingerprint).toMatch(/^(?:[\dA-F]{2}:){31}[\dA-F]{2}$/u);
  });

  it('rejects non-CSR text', () => {
    const res = parseCsr('not a csr');
    expect(res.isCsr).toBe(false);
    expect(res.error).toContain('PEM block');
  });
});
