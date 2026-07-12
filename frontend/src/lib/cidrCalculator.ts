const IPV4_OCTET_COUNT = 4;
const IPV4_ADDRESS_SPACE_SIZE = 2 ** 32;
const IPV4_MAX_VALUE = IPV4_ADDRESS_SPACE_SIZE - 1;

export type Ipv4HostSemantics = 'standard' | 'rfc3021' | 'single-host';

export interface Ipv4HostRange {
  first: string;
  last: string;
}

export interface Ipv4SubnetResult {
  address: string;
  prefixLength: number;
  cidr: string;
  networkAddress: string;
  broadcastAddress: string | null;
  netmask: string;
  wildcardMask: string;
  totalAddresses: number;
  usableHostCount: number;
  hostRange: Ipv4HostRange;
  hostSemantics: Ipv4HostSemantics;
  hostSemanticsDescription: string;
}

export class CidrValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CidrValidationError';
  }
}

function parseDottedDecimal(input: string, label: string): number {
  if (!input) {
    throw new CidrValidationError(`${label} is required.`);
  }

  if (input.trim() !== input) {
    throw new CidrValidationError(`${label} must not contain leading or trailing whitespace.`);
  }

  const octets = input.split('.');
  if (octets.length !== IPV4_OCTET_COUNT) {
    throw new CidrValidationError(`${label} must contain exactly four decimal octets.`);
  }

  const values = octets.map((octet) => {
    if (!/^\d+$/.test(octet)) {
      throw new CidrValidationError(`${label} octets must contain decimal digits only.`);
    }

    if (octet.length > 1 && octet.startsWith('0')) {
      throw new CidrValidationError(`${label} octets must not contain leading zeros.`);
    }

    const value = Number(octet);
    if (!Number.isInteger(value) || value < 0 || value > 255) {
      throw new CidrValidationError(`${label} octets must be between 0 and 255.`);
    }

    return value;
  });

  return values.reduce((address, octet) => address * 256 + octet, 0);
}

function formatIpv4Address(value: number): string {
  if (!Number.isInteger(value) || value < 0 || value > IPV4_MAX_VALUE) {
    throw new RangeError('IPv4 numeric value must be an unsigned 32-bit integer.');
  }

  const first = Math.floor(value / 2 ** 24);
  const second = Math.floor(value / 2 ** 16) % 256;
  const third = Math.floor(value / 2 ** 8) % 256;
  const fourth = value % 256;
  return `${first}.${second}.${third}.${fourth}`;
}

function assertPrefixLength(prefixLength: number): void {
  if (!Number.isInteger(prefixLength) || prefixLength < 0 || prefixLength > 32) {
    throw new RangeError('IPv4 prefix length must be an integer from 0 to 32.');
  }
}

function prefixLengthToMaskNumber(prefixLength: number): number {
  assertPrefixLength(prefixLength);
  const hostAddressCount = 2 ** (32 - prefixLength);
  return IPV4_MAX_VALUE - (hostAddressCount - 1);
}

/**
 * Parses a canonical dotted-decimal IPv4 address into its unsigned 32-bit value.
 * Whitespace, signs, shorthand forms, hexadecimal forms, and leading-zero octets
 * are rejected to avoid ambiguous address interpretation.
 */
export function parseIpv4Address(input: string): number {
  return parseDottedDecimal(input, 'IPv4 address');
}

/**
 * Converts a prefix length to a canonical dotted-decimal subnet mask.
 */
export function prefixLengthToNetmask(prefixLength: number): string {
  return formatIpv4Address(prefixLengthToMaskNumber(prefixLength));
}

/**
 * Accepts a prefix such as "24" or "/24", or a contiguous dotted-decimal
 * subnet mask such as "255.255.255.0". Non-canonical and non-contiguous masks
 * are rejected.
 */
export function parsePrefixOrNetmask(input: string): number {
  if (!input) {
    throw new CidrValidationError('Prefix or subnet mask is required.');
  }

  if (input.trim() !== input) {
    throw new CidrValidationError(
      'Prefix or subnet mask must not contain leading or trailing whitespace.',
    );
  }

  if (input.includes('.')) {
    const mask = parseDottedDecimal(input, 'Subnet mask');
    const maskBits = mask.toString(2).padStart(32, '0');

    if (!/^1*0*$/.test(maskBits)) {
      throw new CidrValidationError(
        'Subnet mask bits must be contiguous ones followed by contiguous zeros.',
      );
    }

    const firstZero = maskBits.indexOf('0');
    return firstZero === -1 ? 32 : firstZero;
  }

  const rawPrefix = input.startsWith('/') ? input.slice(1) : input;
  if (!/^\d+$/.test(rawPrefix)) {
    throw new CidrValidationError(
      'Prefix must be an integer from 0 to 32, optionally starting with "/".',
    );
  }

  if (rawPrefix.length > 1 && rawPrefix.startsWith('0')) {
    throw new CidrValidationError('Prefix must not contain leading zeros.');
  }

  const prefixLength = Number(rawPrefix);
  if (!Number.isInteger(prefixLength) || prefixLength < 0 || prefixLength > 32) {
    throw new CidrValidationError('Prefix must be an integer from 0 to 32.');
  }

  return prefixLength;
}

/**
 * Calculates an IPv4 subnet using modern host semantics:
 * - /0 through /30 reserve the network and broadcast addresses.
 * - /31 follows RFC 3021 point-to-point semantics, making both endpoints usable.
 * - /32 represents one usable host route.
 */
export function calculateIpv4Subnet(
  addressInput: string,
  prefixOrNetmaskInput: string,
): Ipv4SubnetResult {
  const addressValue = parseIpv4Address(addressInput);
  const prefixLength = parsePrefixOrNetmask(prefixOrNetmaskInput);
  const totalAddresses = 2 ** (32 - prefixLength);
  const networkValue = Math.floor(addressValue / totalAddresses) * totalAddresses;
  const broadcastValue = networkValue + totalAddresses - 1;
  const networkAddress = formatIpv4Address(networkValue);
  const broadcastAddress = prefixLength <= 30 ? formatIpv4Address(broadcastValue) : null;

  let firstHostValue: number;
  let lastHostValue: number;
  let usableHostCount: number;
  let hostSemantics: Ipv4HostSemantics;
  let hostSemanticsDescription: string;

  if (prefixLength === 32) {
    firstHostValue = networkValue;
    lastHostValue = networkValue;
    usableHostCount = 1;
    hostSemantics = 'single-host';
    hostSemanticsDescription =
      'Single-host route semantics: the only address is usable and there is no broadcast address.';
  } else if (prefixLength === 31) {
    firstHostValue = networkValue;
    lastHostValue = broadcastValue;
    usableHostCount = 2;
    hostSemantics = 'rfc3021';
    hostSemanticsDescription =
      'RFC 3021 point-to-point interpretation: both endpoint addresses are usable and there is no broadcast address. Confirm that the target link and platform use RFC 3021 semantics.';
  } else {
    firstHostValue = networkValue + 1;
    lastHostValue = broadcastValue - 1;
    usableHostCount = totalAddresses - 2;
    hostSemantics = 'standard';
    hostSemanticsDescription =
      'Standard subnet semantics: the network and broadcast addresses are excluded from usable hosts.';
  }

  return {
    address: formatIpv4Address(addressValue),
    prefixLength,
    cidr: `${networkAddress}/${prefixLength}`,
    networkAddress,
    broadcastAddress,
    netmask: prefixLengthToNetmask(prefixLength),
    wildcardMask: formatIpv4Address(totalAddresses - 1),
    totalAddresses,
    usableHostCount,
    hostRange: {
      first: formatIpv4Address(firstHostValue),
      last: formatIpv4Address(lastHostValue),
    },
    hostSemantics,
    hostSemanticsDescription,
  };
}
