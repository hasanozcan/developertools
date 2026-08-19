export interface Ipv6SubnetDetails {
  expandedIp: string;
  compressedIp: string;
  prefixLength: number;
  totalAddresses: string;
  networkPrefix: string;
  firstAddress: string;
  lastAddress: string;
  type: string;
}

export function expandIpv6(ip: string): string {
  let fullIp = ip.trim().toLowerCase();
  if (fullIp.includes('::')) {
    const parts = fullIp.split('::');
    const left = parts[0] ? parts[0].split(':') : [];
    const right = parts[1] ? parts[1].split(':') : [];
    const missing = 8 - (left.length + right.length);
    const middle = Array(missing).fill('0000');
    fullIp = [...left, ...middle, ...right].join(':');
  }

  const segments = fullIp.split(':').map((s) => s.padStart(4, '0'));
  return segments.join(':');
}

export function compressIpv6(expandedIp: string): string {
  const segments = expandedIp.split(':').map((s) => s.replace(/^0+/, '') || '0');
  let compressed = segments.join(':');
  compressed = compressed.replace(/(?:^|:)0(?::0)+(?::|$)/, '::');
  return compressed;
}

export function calculateIpv6Subnet(inputIp: string, prefix: number = 64): Ipv6SubnetDetails {
  const cleanIp = inputIp.trim().split('/')[0];
  const expanded = expandIpv6(cleanIp);
  const compressed = compressIpv6(expanded);

  let type = 'Global Unicast';
  if (expanded.startsWith('fe80:')) type = 'Link-Local Unicast';
  else if (expanded.startsWith('fc00:') || expanded.startsWith('fd00:')) type = 'Unique Local (ULA)';
  else if (expanded.startsWith('ff00:')) type = 'Multicast';
  else if (expanded === '0000:0000:0000:0000:0000:0000:0000:0001') type = 'Loopback (::1)';

  const hostBits = 128 - prefix;
  const totalAddresses = hostBits > 64 ? `2^${hostBits}` : (2 ** hostBits).toLocaleString();

  return {
    expandedIp: expanded,
    compressedIp: compressed,
    prefixLength: prefix,
    totalAddresses,
    networkPrefix: `${compressed}/${prefix}`,
    firstAddress: `${compressed}`,
    lastAddress: `${compressed.replace(/::.*$/, '::ffff:ffff:ffff:ffff')}`,
    type,
  };
}
