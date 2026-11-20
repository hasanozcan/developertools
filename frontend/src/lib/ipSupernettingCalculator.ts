export interface SupernetDetails {
  supernet: string;
  networkAddress: string;
  broadcastAddress: string;
  netmask: string;
  prefixLength: number;
  totalAddresses: number;
  inputCount: number;
  exactAggregation: boolean;
}

interface ParsedCidrRange {
  network: number;
  broadcast: number;
  prefix: number;
}

function ipv4ToInt(ip: string): number {
  const parts = ip.trim().split('.');
  if (parts.length !== 4) {
    throw new Error(`Invalid IPv4 address "${ip}". Expected 4 octets.`);
  }
  let value = 0;
  for (const part of parts) {
    if (!/^\d+$/.test(part)) {
      throw new Error(`Invalid IPv4 octet "${part}" in "${ip}".`);
    }
    const octet = Number(part);
    if (!Number.isInteger(octet) || octet < 0 || octet > 255) {
      throw new Error(`IPv4 octet "${part}" out of range (0-255) in "${ip}".`);
    }
    value = ((value << 8) | octet) >>> 0;
  }
  return value >>> 0;
}

function intToIpv4(value: number): string {
  const u = value >>> 0;
  return [(u >>> 24) & 0xff, (u >>> 16) & 0xff, (u >>> 8) & 0xff, u & 0xff].join('.');
}

function prefixToMask(prefix: number): number {
  if (prefix === 0) return 0;
  return (0xffffffff << (32 - prefix)) >>> 0;
}

function parseCidrEntry(raw: string): ParsedCidrRange {
  const trimmed = raw.trim();
  const slashIdx = trimmed.indexOf('/');
  if (slashIdx === -1) {
    const ip = ipv4ToInt(trimmed);
    return { network: ip, broadcast: ip, prefix: 32 };
  }

  const ipPart = trimmed.slice(0, slashIdx);
  const prefixPart = trimmed.slice(slashIdx + 1);
  if (!/^\d+$/.test(prefixPart)) {
    throw new Error(`Invalid CIDR prefix "${prefixPart}" in "${trimmed}".`);
  }
  const prefix = Number(prefixPart);
  if (prefix < 0 || prefix > 32) {
    throw new Error(`CIDR prefix /${prefix} out of range (0-32) in "${trimmed}".`);
  }

  const ip = ipv4ToInt(ipPart);
  const mask = prefixToMask(prefix);
  const network = (ip & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;
  return { network, broadcast, prefix };
}

function mergeCoveredAddressCount(ranges: ParsedCidrRange[]): number {
  const sorted = [...ranges].sort((a, b) => a.network - b.network || a.broadcast - b.broadcast);
  let total = 0;
  let currentStart = sorted[0].network;
  let currentEnd = sorted[0].broadcast;

  for (let i = 1; i < sorted.length; i++) {
    const next = sorted[i];
    if (next.network <= currentEnd + 1) {
      currentEnd = Math.max(currentEnd, next.broadcast);
    } else {
      total += currentEnd - currentStart + 1;
      currentStart = next.network;
      currentEnd = next.broadcast;
    }
  }
  total += currentEnd - currentStart + 1;
  return total;
}

export function calculateSupernetDetails(cidrs: string[]): SupernetDetails {
  const cleaned = cidrs.map((c) => c.trim()).filter(Boolean);
  if (cleaned.length === 0) {
    return {
      supernet: '0.0.0.0/0',
      networkAddress: '0.0.0.0',
      broadcastAddress: '255.255.255.255',
      netmask: '0.0.0.0',
      prefixLength: 0,
      totalAddresses: 2 ** 32,
      inputCount: 0,
      exactAggregation: false,
    };
  }

  const parsed = cleaned.map(parseCidrEntry);
  let minAddr = parsed[0].network;
  let maxAddr = parsed[0].broadcast;
  let minPrefix = parsed[0].prefix;

  for (let i = 1; i < parsed.length; i++) {
    if (parsed[i].network < minAddr) minAddr = parsed[i].network;
    if (parsed[i].broadcast > maxAddr) maxAddr = parsed[i].broadcast;
    if (parsed[i].prefix < minPrefix) minPrefix = parsed[i].prefix;
  }

  const diff = (minAddr ^ maxAddr) >>> 0;
  const prefixLength = diff === 0 ? minPrefix : Math.clz32(diff);
  const mask = prefixToMask(prefixLength);
  const networkInt = (minAddr & mask) >>> 0;
  const broadcastInt = (networkInt | (~mask >>> 0)) >>> 0;
  const networkAddress = intToIpv4(networkInt);
  const broadcastAddress = intToIpv4(broadcastInt);
  const totalAddresses = 2 ** (32 - prefixLength);
  const coveredAddresses = mergeCoveredAddressCount(parsed);

  return {
    supernet: `${networkAddress}/${prefixLength}`,
    networkAddress,
    broadcastAddress,
    netmask: intToIpv4(mask),
    prefixLength,
    totalAddresses,
    inputCount: parsed.length,
    exactAggregation: coveredAddresses === totalAddresses,
  };
}

export function calculateSupernet(cidrs: string[]): string {
  return calculateSupernetDetails(cidrs).supernet;
}
