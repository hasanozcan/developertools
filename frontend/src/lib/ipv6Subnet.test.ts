import { describe, it, expect } from 'vitest';
import { expandIpv6, compressIpv6, calculateIpv6Subnet } from './ipv6Subnet';

describe('ipv6Subnet', () => {
  it('should expand and compress IPv6 addresses', () => {
    const short = '2001:db8::1';
    const exp = expandIpv6(short);
    expect(exp).toBe('2001:0db8:0000:0000:0000:0000:0000:0001');

    const comp = compressIpv6(exp);
    expect(comp).toBe('2001:db8::1');
  });

  it('should calculate IPv6 subnet details and identify type', () => {
    const res = calculateIpv6Subnet('fe80::1', 64);
    expect(res.type).toBe('Link-Local Unicast');
    expect(res.prefixLength).toBe(64);
  });
});
