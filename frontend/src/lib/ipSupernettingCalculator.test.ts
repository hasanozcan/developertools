import { describe, expect, it } from 'vitest';
import { calculateSupernet, calculateSupernetDetails } from './ipSupernettingCalculator';

describe('ipSupernettingCalculator', () => {
  it('aggregates contiguous /24 subnets into /23', () => {
    expect(calculateSupernet(['192.168.0.0/24', '192.168.1.0/24'])).toBe('192.168.0.0/23');
    const details = calculateSupernetDetails(['192.168.0.0/24', '192.168.1.0/24']);
    expect(details.netmask).toBe('255.255.254.0');
    expect(details.broadcastAddress).toBe('192.168.1.255');
    expect(details.exactAggregation).toBe(true);
  });

  it('computes longest common prefix for non-adjacent blocks and flags non-exact summary', () => {
    const details = calculateSupernetDetails(['10.0.0.0/24', '10.0.3.0/24']);
    expect(details.supernet).toBe('10.0.0.0/22');
    expect(details.exactAggregation).toBe(false);
    expect(details.totalAddresses).toBe(1024);
  });

  it('handles disjoint /8 prefixes falling back to 0.0.0.0/0 and plain IPs as /32', () => {
    expect(calculateSupernet(['10.0.0.0/8', '192.168.1.0/24'])).toBe('0.0.0.0/0');
    expect(calculateSupernet(['192.168.1.4', '192.168.1.5'])).toBe('192.168.1.4/31');
  });

  it('rejects malformed IPv4 or CIDR prefix', () => {
    expect(() => calculateSupernet(['999.0.0.1/24'])).toThrow(/out of range/i);
    expect(() => calculateSupernet(['192.168.0.1/33'])).toThrow(/out of range/i);
  });
});
