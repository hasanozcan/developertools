export interface SubnetResult {
  ip: string;
  cidr: number;
  netmask: string;
  wildcard: string;
  networkAddress: string;
  broadcastAddress: string;
  usableHostRange: string;
  totalHosts: number;
  usableHosts: number;
}

export function calculateSubnet(ip: string, cidr: number): SubnetResult {
  const ipParts = ip.split('.').map(Number);
  const maskInt = ~((1 << (32 - cidr)) - 1) >>> 0;
  const netmask = [
    (maskInt >>> 24) & 255,
    (maskInt >>> 16) & 255,
    (maskInt >>> 8) & 255,
    maskInt & 255,
  ].join('.');

  const wildcard = [
    255 - ((maskInt >>> 24) & 255),
    255 - ((maskInt >>> 16) & 255),
    255 - ((maskInt >>> 8) & 255),
    255 - (maskInt & 255),
  ].join('.');

  const ipInt = ((ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3]) >>> 0;
  const netInt = (ipInt & maskInt) >>> 0;
  const broadInt = (netInt | ~maskInt) >>> 0;

  const toIp = (num: number) => [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join('.');

  const networkAddress = toIp(netInt);
  const broadcastAddress = toIp(broadInt);
  const totalHosts = Math.pow(2, 32 - cidr);
  const usableHosts = totalHosts > 2 ? totalHosts - 2 : totalHosts;
  const usableHostRange = totalHosts > 2 ? `${toIp(netInt + 1)} - ${toIp(broadInt - 1)}` : networkAddress;

  return {
    ip,
    cidr,
    netmask,
    wildcard,
    networkAddress,
    broadcastAddress,
    usableHostRange,
    totalHosts,
    usableHosts,
  };
}
