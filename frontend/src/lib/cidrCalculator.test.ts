import { describe, expect, it } from 'vitest';
import {
  CidrValidationError,
  calculateIpv4Subnet,
  parseIpv4Address,
  parsePrefixOrNetmask,
  prefixLengthToNetmask,
} from './cidrCalculator';

describe('parseIpv4Address', () => {
  it.each([
    ['0.0.0.0', 0],
    ['0.0.0.1', 1],
    ['192.168.1.1', 3_232_235_777],
    ['255.255.255.255', 4_294_967_295],
  ])('parses canonical IPv4 address %s', (input, expected) => {
    expect(parseIpv4Address(input)).toBe(expected);
  });

  it.each([
    '',
    '192.168.1',
    '192.168.1.1.0',
    '192..1.1',
    '.192.168.1',
    '192.168.1.',
    ' 192.168.1.1',
    '192.168.1.1 ',
    '192.168.01.1',
    '00.0.0.0',
    '+1.2.3.4',
    '-1.2.3.4',
    '1e2.2.3.4',
    '1.2.3.a',
    '256.0.0.1',
    '1.2.3.999999999999999999999999999999',
  ])('rejects non-canonical or invalid IPv4 input %j', (input) => {
    expect(() => parseIpv4Address(input)).toThrow(CidrValidationError);
  });
});

describe('parsePrefixOrNetmask', () => {
  it.each([
    ['0', 0],
    ['/0', 0],
    ['1', 1],
    ['/24', 24],
    ['32', 32],
    ['/32', 32],
    ['0.0.0.0', 0],
    ['128.0.0.0', 1],
    ['255.255.254.0', 23],
    ['255.255.255.0', 24],
    ['255.255.255.254', 31],
    ['255.255.255.255', 32],
  ])('parses prefix or netmask %s as /%i', (input, expected) => {
    expect(parsePrefixOrNetmask(input)).toBe(expected);
  });

  it.each([
    '',
    '/',
    '//24',
    '24/',
    '+24',
    '-1',
    '24.0',
    '33',
    '/33',
    '024',
    '/00',
    ' 24',
    '24 ',
    '255.0.255.0',
    '255.255.0.255',
    '255.255.255.1',
    '255.255.255.00',
    '255.255.255.256',
  ])('rejects invalid or ambiguous prefix/netmask input %j', (input) => {
    expect(() => parsePrefixOrNetmask(input)).toThrow(CidrValidationError);
  });

  it('round-trips every IPv4 prefix through its dotted netmask', () => {
    for (let prefixLength = 0; prefixLength <= 32; prefixLength += 1) {
      const netmask = prefixLengthToNetmask(prefixLength);
      expect(parsePrefixOrNetmask(netmask), netmask).toBe(prefixLength);
    }
  });

  it('rejects numeric prefix lengths outside the IPv4 range', () => {
    expect(() => prefixLengthToNetmask(-1)).toThrow(RangeError);
    expect(() => prefixLengthToNetmask(24.5)).toThrow(RangeError);
    expect(() => prefixLengthToNetmask(33)).toThrow(RangeError);
  });
});

describe('calculateIpv4Subnet', () => {
  it('calculates a conventional /26 subnet from an address inside the block', () => {
    expect(calculateIpv4Subnet('192.168.1.130', '/26')).toEqual({
      address: '192.168.1.130',
      prefixLength: 26,
      cidr: '192.168.1.128/26',
      networkAddress: '192.168.1.128',
      broadcastAddress: '192.168.1.191',
      netmask: '255.255.255.192',
      wildcardMask: '0.0.0.63',
      totalAddresses: 64,
      usableHostCount: 62,
      hostRange: {
        first: '192.168.1.129',
        last: '192.168.1.190',
      },
      hostSemantics: 'standard',
      hostSemanticsDescription:
        'Standard subnet semantics: the network and broadcast addresses are excluded from usable hosts.',
    });
  });

  it('accepts a dotted netmask and calculates its canonical CIDR block', () => {
    const result = calculateIpv4Subnet('10.2.3.4', '255.255.0.0');

    expect(result).toMatchObject({
      prefixLength: 16,
      cidr: '10.2.0.0/16',
      networkAddress: '10.2.0.0',
      broadcastAddress: '10.2.255.255',
      netmask: '255.255.0.0',
      wildcardMask: '0.0.255.255',
      totalAddresses: 65_536,
      usableHostCount: 65_534,
      hostRange: {
        first: '10.2.0.1',
        last: '10.2.255.254',
      },
    });
  });

  it('handles the complete IPv4 /0 address space without overflow', () => {
    const result = calculateIpv4Subnet('203.0.113.8', '0.0.0.0');

    expect(result).toMatchObject({
      prefixLength: 0,
      cidr: '0.0.0.0/0',
      networkAddress: '0.0.0.0',
      broadcastAddress: '255.255.255.255',
      netmask: '0.0.0.0',
      wildcardMask: '255.255.255.255',
      totalAddresses: 4_294_967_296,
      usableHostCount: 4_294_967_294,
      hostRange: {
        first: '0.0.0.1',
        last: '255.255.255.254',
      },
    });
  });

  it('uses RFC 3021 semantics for /31 point-to-point blocks', () => {
    const result = calculateIpv4Subnet('192.0.2.11', '/31');

    expect(result).toMatchObject({
      cidr: '192.0.2.10/31',
      networkAddress: '192.0.2.10',
      broadcastAddress: null,
      netmask: '255.255.255.254',
      wildcardMask: '0.0.0.1',
      totalAddresses: 2,
      usableHostCount: 2,
      hostRange: {
        first: '192.0.2.10',
        last: '192.0.2.11',
      },
      hostSemantics: 'rfc3021',
    });
    expect(result.hostSemanticsDescription).toContain('both endpoint addresses are usable');
    expect(result.hostSemanticsDescription).toContain('target link');
  });

  it('uses single-host route semantics for /32', () => {
    const result = calculateIpv4Subnet('255.255.255.255', '255.255.255.255');

    expect(result).toMatchObject({
      cidr: '255.255.255.255/32',
      networkAddress: '255.255.255.255',
      broadcastAddress: null,
      netmask: '255.255.255.255',
      wildcardMask: '0.0.0.0',
      totalAddresses: 1,
      usableHostCount: 1,
      hostRange: {
        first: '255.255.255.255',
        last: '255.255.255.255',
      },
      hostSemantics: 'single-host',
    });
    expect(result.hostSemanticsDescription).toContain('only address is usable');
  });

  it('propagates strict address and mask validation', () => {
    expect(() => calculateIpv4Subnet('192.168.001.1', '/24')).toThrow(CidrValidationError);
    expect(() => calculateIpv4Subnet('192.168.1.1', '255.0.255.0')).toThrow(CidrValidationError);
  });
});
