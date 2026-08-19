import { describe, it, expect } from 'vitest';
import { calculateSubnet, ipToNumber, numberToIp } from './ipSubnet';

describe('ipSubnet', () => {
  it('should calculate standard /24 IPv4 subnet correctly', () => {
    const res = calculateSubnet('192.168.1.100', 24);

    expect(res.networkAddress).toBe('192.168.1.0');
    expect(res.broadcastAddress).toBe('192.168.1.255');
    expect(res.subnetMask).toBe('255.255.255.0');
    expect(res.wildcardMask).toBe('0.0.0.255');
    expect(res.firstUsableIp).toBe('192.168.1.1');
    expect(res.lastUsableIp).toBe('192.168.1.254');
    expect(res.totalHosts).toBe(256);
    expect(res.usableHosts).toBe(254);
    expect(res.ipClass).toBe('Class C');
  });

  it('should calculate /16 IPv4 subnet correctly', () => {
    const res = calculateSubnet('172.16.50.2', 16);

    expect(res.networkAddress).toBe('172.16.0.0');
    expect(res.broadcastAddress).toBe('172.16.255.255');
    expect(res.subnetMask).toBe('255.255.0.0');
    expect(res.totalHosts).toBe(65536);
    expect(res.usableHosts).toBe(65534);
    expect(res.ipClass).toBe('Class B');
  });

  it('should convert IP to number and back', () => {
    const num = ipToNumber('10.0.0.1');
    const ip = numberToIp(num);
    expect(ip).toBe('10.0.0.1');
  });
});
