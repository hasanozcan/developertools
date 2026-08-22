import { describe, it, expect } from 'vitest';
import { inspectPemCertificate } from './sslCertificateInspector';

describe('sslCertificateInspector', () => {
  it('validates PEM certificate block format', () => {
    const cert = '-----BEGIN CERTIFICATE-----\nMIIBIjANBgkqh...\n-----END CERTIFICATE-----';
    const res = inspectPemCertificate(cert);
    expect(res.isValidPem).toBe(true);
  });
});
