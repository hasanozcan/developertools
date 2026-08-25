import { describe, expect, it } from 'vitest';
import { calculateSubnet } from './subnetCalculator';

describe('subnetCalculator', () => {
  it('calculates /24 subnet accurately', () => {
    const res = calculateSubnet('192.168.1.50', 24);
    expect(res.netmask).toBe('255.255.255.0');
    expect(res.networkAddress).toBe('192.168.1.0');
    expect(res.broadcastAddress).toBe('192.168.1.255');
    expect(res.usableHosts).toBe(254);
  });
});
