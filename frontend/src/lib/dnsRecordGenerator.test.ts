import { describe, it, expect } from 'vitest';
import { generateSpfRecord, generateDmarcRecord } from './dnsRecordGenerator';

describe('dnsRecordGenerator', () => {
  it('generates a standard SPF record', () => {
    const spf = generateSpfRecord({
      domain: 'mycompany.com',
      allowMx: true,
      allowA: false,
      ip4: ['192.0.2.1/24'],
      ip6: [],
      includes: ['_spf.google.com', 'sendgrid.net'],
      policy: '~all',
    });

    expect(spf.record).toBe('v=spf1 mx ip4:192.0.2.1/24 include:_spf.google.com include:sendgrid.net ~all');
  });

  it('generates a standard DMARC record', () => {
    const dmarc = generateDmarcRecord({
      domain: 'mycompany.com',
      policy: 'quarantine',
      ruaEmail: 'dmarc-reports@mycompany.com',
      percentage: 100,
      alignmentDkim: 's',
      alignmentSpf: 'r',
      reportFormat: 'afrf',
    });

    expect(dmarc.host).toBe('_dmarc.mycompany.com');
    expect(dmarc.record).toContain('v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@mycompany.com; adkim=s');
  });
});
