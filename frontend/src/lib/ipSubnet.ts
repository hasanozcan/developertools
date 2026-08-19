export interface SubnetCalculationResult {
  ipAddress: string;
  cidr: number;
  subnetMask: string;
  wildcardMask: string;
  networkAddress: string;
  broadcastAddress: string;
  firstUsableIp: string;
  lastUsableIp: string;
  totalHosts: number;
  usableHosts: number;
  ipClass: string;
  binaryIp: string;
  binaryMask: string;
}

export function ipToNumber(ip: string): number {
  return ip
    .split('.')
    .reduce((acc, octet) => ((acc << 8) + parseInt(octet, 10)) >>> 0, 0);
}

export function numberToIp(num: number): string {
  return [
    (num >>> 24) & 255,
    (num >>> 16) & 255,
    (num >>> 8) & 255,
    num & 255,
  ].join('.');
}

export function cidrToMaskNumber(cidr: number): number {
  return cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
}

export function toBinaryString(num: number): string {
  return [
    ((num >>> 24) & 255).toString(2).padStart(8, '0'),
    ((num >>> 16) & 255).toString(2).padStart(8, '0'),
    ((num >>> 8) & 255).toString(2).padStart(8, '0'),
    (num & 255).toString(2).padStart(8, '0'),
  ].join('.');
}

export function getIpClass(ipNum: number): string {
  const firstOctet = (ipNum >>> 24) & 255;
  if (firstOctet < 128) return 'Class A';
  if (firstOctet < 192) return 'Class B';
  if (firstOctet < 224) return 'Class C';
  if (firstOctet < 240) return 'Class D (Multicast)';
  return 'Class E (Experimental)';
}

export function calculateSubnet(ip: string, cidr: number): SubnetCalculationResult {
  const cleanCidr = Math.min(32, Math.max(0, cidr));
  const ipNum = ipToNumber(ip.trim());
  const maskNum = cidrToMaskNumber(cleanCidr);
  const wildcardNum = ~maskNum >>> 0;

  const networkNum = (ipNum & maskNum) >>> 0;
  const broadcastNum = (networkNum | wildcardNum) >>> 0;

  const totalHosts = cleanCidr === 32 ? 1 : Math.pow(2, 32 - cleanCidr);
  const usableHosts = cleanCidr >= 31 ? (cleanCidr === 31 ? 2 : 1) : Math.max(0, totalHosts - 2);

  const firstUsableNum = cleanCidr >= 31 ? networkNum : networkNum + 1;
  const lastUsableNum = cleanCidr >= 31 ? broadcastNum : Math.max(firstUsableNum, broadcastNum - 1);

  return {
    ipAddress: numberToIp(ipNum),
    cidr: cleanCidr,
    subnetMask: numberToIp(maskNum),
    wildcardMask: numberToIp(wildcardNum),
    networkAddress: numberToIp(networkNum),
    broadcastAddress: numberToIp(broadcastNum),
    firstUsableIp: numberToIp(firstUsableNum),
    lastUsableIp: numberToIp(lastUsableNum),
    totalHosts,
    usableHosts,
    ipClass: getIpClass(ipNum),
    binaryIp: toBinaryString(ipNum),
    binaryMask: toBinaryString(maskNum),
  };
}
