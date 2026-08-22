import { describe, it, expect } from 'vitest';
import { parseCsr } from './x509CsrDecoder';

describe('parseCsr', () => {
  it('detects CSR PEM block', () => {
    const pem = '-----BEGIN CERTIFICATE REQUEST-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA\n-----END CERTIFICATE REQUEST-----';
    const res = parseCsr(pem);
    expect(res.isCsr).toBe(true);
  });
});