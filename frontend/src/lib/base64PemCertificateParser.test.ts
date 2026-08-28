import { describe, it, expect } from 'vitest';
import { parseCertificateSan } from './base64PemCertificateParser';

describe('base64PemCertificateParser', () => {
  it('extracts SAN domains', () => {
    expect(parseCertificateSan('DNS:example.com DNS:api.example.com')).toEqual(['example.com', 'api.example.com']);
  });
});
