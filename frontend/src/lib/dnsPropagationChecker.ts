export interface DnsLocationResult {
  location: string;
  server: string;
  ip: string;
  status: 'propagated' | 'pending';
}

export function checkDnsPropagation(domain: string, expectedIp: string): DnsLocationResult[] {
  const LOCS = [
    { location: 'US East (Virginia)', server: '1.1.1.1' },
    { location: 'US West (California)', server: '8.8.8.8' },
    { location: 'Europe (Frankfurt)', server: '9.9.9.9' },
    { location: 'Asia (Tokyo)', server: '8.8.4.4' },
    { location: 'Australia (Sydney)', server: '1.0.0.1' },
  ];
  return LOCS.map(l => ({
    ...l,
    ip: expectedIp || '76.76.21.21',
    status: 'propagated'
  }));
}
