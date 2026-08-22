export interface DnsRecordResult {
  type: 'A' | 'AAAA' | 'CNAME' | 'MX' | 'TXT' | 'NS';
  value: string;
  ttl: number;
}

export function simulateDnsLookup(domain: string): DnsRecordResult[] {
  const clean = domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');

  return [
    { type: 'A', value: '104.21.55.2', ttl: 300 },
    { type: 'A', value: '172.67.180.12', ttl: 300 },
    { type: 'AAAA', value: '2606:4700:3033::6815:3702', ttl: 300 },
    { type: 'MX', value: '10 mail.protection.outlook.com', ttl: 3600 },
    { type: 'TXT', value: 'v=spf1 include:_spf.google.com ~all', ttl: 3600 },
    { type: 'NS', value: 'ns1.cloudflare.com', ttl: 86400 },
  ];
}
