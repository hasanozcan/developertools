import { describe, it, expect } from 'vitest';
import { generateSpfRecord, generateDkimTxt } from './dnsRecord';

describe('dnsRecord', () => {
  it('should generate valid SPF TXT record', () => {
    const spf = generateSpfRecord({
      domain: 'example.com',
      allowA: true,
      allowMx: true,
      includeDomains: ['_spf.google.com', 'sendgrid.net'],
      ip4List: ['192.0.2.1'],
      policy: '~all',
    });
    expect(spf).toBe('v=spf1 a mx ip4:192.0.2.1 include:_spf.google.com include:sendgrid.net ~all');
  });

  it('should generate DKIM TXT record host and value', () => {
    const dkim = generateDkimTxt('google', 'example.com', 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCB');
    expect(dkim.host).toBe('google._domainkey.example.com');
    expect(dkim.value).toBe('v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCB');
  });
});
