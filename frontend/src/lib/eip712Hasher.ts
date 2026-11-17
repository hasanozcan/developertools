import { keccak } from 'hash-wasm';

export interface Eip712Domain {
  name?: string;
  version?: string;
  chainId?: number | bigint | string;
  verifyingContract?: string;
  salt?: string;
}

export interface Eip712TypeField {
  name: string;
  type: string;
}

export type Eip712Types = Record<string, Eip712TypeField[]>;

export interface Eip712HashResult {
  domainSeparator: string;
  structHash: string;
  eip712Digest: string;
}

const TEXT_ENCODER = new TextEncoder();

function hexToBytes(hex: string): Uint8Array {
  const normalized = hex.startsWith('0x') || hex.startsWith('0X') ? hex.slice(2) : hex;
  if (normalized.length % 2 !== 0 || !/^[0-9a-fA-F]*$/.test(normalized)) {
    throw new Error(`Invalid hex string: ${hex}`);
  }
  const bytes = new Uint8Array(normalized.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(normalized.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function bytesToHex(bytes: Uint8Array): string {
  return (
    '0x' +
    Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
  );
}

function concatBytes(...chunks: Uint8Array[]): Uint8Array {
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result;
}

async function keccak256Bytes(data: Uint8Array | string): Promise<Uint8Array> {
  const hex = await keccak(data, 256);
  return hexToBytes(hex);
}

function encodeBigInt32(value: bigint, signed: boolean, bits: number): Uint8Array {
  if (bits < 8 || bits > 256 || bits % 8 !== 0) {
    throw new Error(`Unsupported integer bit width: ${bits}`);
  }
  const one = BigInt(1);
  const zero = BigInt(0);
  const min = signed ? -(one << BigInt(bits - 1)) : zero;
  const max = signed ? (one << BigInt(bits - 1)) - one : (one << BigInt(bits)) - one;
  if (value < min || value > max) {
    throw new Error(`Value ${value.toString()} out of range for ${signed ? 'int' : 'uint'}${bits}`);
  }

  let normalized = value < zero ? value + (one << BigInt(256)) : value;
  const mask = BigInt(0xff);
  const shift = BigInt(8);
  const out = new Uint8Array(32);
  for (let i = 31; i >= 0; i--) {
    out[i] = Number(normalized & mask);
    normalized >>= shift;
  }
  return out;
}

function parseIntegerInput(value: unknown, typeName: string): bigint {
  if (typeof value === 'bigint') return value;
  if (typeof value === 'number') {
    if (!Number.isInteger(value) || !Number.isSafeInteger(value)) {
      throw new Error(`Unsafe or non-integer number for ${typeName}: ${value}`);
    }
    return BigInt(value);
  }
  if (typeof value === 'string' && value.trim() !== '') {
    return BigInt(value.trim());
  }
  throw new Error(`Invalid integer value for ${typeName}: ${String(value)}`);
}

function baseTypeOf(type: string): string {
  const idx = type.indexOf('[');
  return idx === -1 ? type : type.slice(0, idx);
}

export function encodeEip712Type(primaryType: string, types: Eip712Types): string {
  if (!types[primaryType]) {
    throw new Error(`Missing EIP-712 type definition for "${primaryType}"`);
  }

  const dependencies = new Set<string>();
  const stack = [primaryType];

  while (stack.length > 0) {
    const current = stack.pop()!;
    const fields = types[current];
    if (!fields) continue;
    for (const field of fields) {
      const base = baseTypeOf(field.type);
      if (base !== primaryType && types[base] && !dependencies.has(base)) {
        dependencies.add(base);
        stack.push(base);
      }
    }
  }

  const orderedTypes = [primaryType, ...Array.from(dependencies).sort()];
  return orderedTypes
    .map((typeName) => {
      const fields = types[typeName].map((f) => `${f.type} ${f.name}`).join(',');
      return `${typeName}(${fields})`;
    })
    .join('');
}

async function encodeValue(
  type: string,
  value: unknown,
  types: Eip712Types,
): Promise<Uint8Array> {
  const arrayMatch = /^(.*)\[(\d*)\]$/.exec(type);
  if (arrayMatch) {
    const elementType = arrayMatch[1];
    const fixedLength = arrayMatch[2] ? parseInt(arrayMatch[2], 10) : null;
    if (!Array.isArray(value)) {
      throw new Error(`Expected array for EIP-712 type ${type}`);
    }
    if (fixedLength !== null && value.length !== fixedLength) {
      throw new Error(`Expected ${fixedLength} elements for ${type}, got ${value.length}`);
    }
    const encodedElements = await Promise.all(
      value.map((item) => encodeValue(elementType, item, types)),
    );
    return keccak256Bytes(concatBytes(...encodedElements));
  }

  if (types[type]) {
    if (value === null || typeof value !== 'object' || Array.isArray(value)) {
      throw new Error(`Expected struct object for EIP-712 type ${type}`);
    }
    return hashEip712Struct(type, types, value as Record<string, unknown>);
  }

  if (type === 'string') {
    return keccak256Bytes(TEXT_ENCODER.encode(String(value ?? '')));
  }

  if (type === 'bytes') {
    return keccak256Bytes(hexToBytes(String(value ?? '0x')));
  }

  if (type === 'address') {
    const raw = String(value ?? '');
    if (!/^0x[0-9a-fA-F]{40}$/.test(raw)) {
      throw new Error(`Invalid Ethereum address: ${raw}`);
    }
    const out = new Uint8Array(32);
    out.set(hexToBytes(raw), 12);
    return out;
  }

  if (type === 'bool') {
    const out = new Uint8Array(32);
    out[31] = value ? 1 : 0;
    return out;
  }

  const bytesNMatch = /^bytes(\d+)$/.exec(type);
  if (bytesNMatch) {
    const length = parseInt(bytesNMatch[1], 10);
    if (length < 1 || length > 32) {
      throw new Error(`Unsupported fixed bytes type: ${type}`);
    }
    const rawBytes = hexToBytes(String(value ?? '0x'));
    if (rawBytes.length > length) {
      throw new Error(`Value exceeds ${length} bytes for ${type}`);
    }
    const out = new Uint8Array(32);
    out.set(rawBytes, 0);
    return out;
  }

  const uintMatch = /^uint(\d*)$/.exec(type);
  if (uintMatch) {
    const bits = uintMatch[1] ? parseInt(uintMatch[1], 10) : 256;
    return encodeBigInt32(parseIntegerInput(value, type), false, bits);
  }

  const intMatch = /^int(\d*)$/.exec(type);
  if (intMatch) {
    const bits = intMatch[1] ? parseInt(intMatch[1], 10) : 256;
    return encodeBigInt32(parseIntegerInput(value, type), true, bits);
  }

  throw new Error(`Unsupported EIP-712 field type: ${type}`);
}

export async function hashEip712Struct(
  primaryType: string,
  types: Eip712Types,
  data: Record<string, unknown>,
): Promise<Uint8Array> {
  const typeHash = await keccak256Bytes(TEXT_ENCODER.encode(encodeEip712Type(primaryType, types)));
  const fields = types[primaryType];
  const encodedFields = await Promise.all(
    fields.map((field) => encodeValue(field.type, data[field.name], types)),
  );
  return keccak256Bytes(concatBytes(typeHash, ...encodedFields));
}

function buildDomainFields(domain: Eip712Domain): Eip712TypeField[] {
  const fields: Eip712TypeField[] = [];
  if (domain.name !== undefined) fields.push({ name: 'name', type: 'string' });
  if (domain.version !== undefined) fields.push({ name: 'version', type: 'string' });
  if (domain.chainId !== undefined) fields.push({ name: 'chainId', type: 'uint256' });
  if (domain.verifyingContract !== undefined) {
    fields.push({ name: 'verifyingContract', type: 'address' });
  }
  if (domain.salt !== undefined) fields.push({ name: 'salt', type: 'bytes32' });
  return fields;
}

function inferFieldType(name: string, value: unknown, types: Eip712Types): string {
  if (typeof value === 'boolean') return 'bool';
  if (typeof value === 'number' || typeof value === 'bigint') return 'uint256';
  if (typeof value === 'string') {
    if (/^0x[0-9a-fA-F]{40}$/.test(value)) return 'address';
    if (/^0x[0-9a-fA-F]{64}$/.test(value)) return 'bytes32';
    return 'string';
  }
  if (Array.isArray(value)) {
    const elemType = value.length > 0 ? inferFieldType(name, value[0], types) : 'string';
    return `${elemType}[]`;
  }
  if (value !== null && typeof value === 'object') {
    const structName = name.charAt(0).toUpperCase() + name.slice(1);
    types[structName] = Object.entries(value as Record<string, unknown>).map(([k, v]) => ({
      name: k,
      type: inferFieldType(k, v, types),
    }));
    return structName;
  }
  return 'string';
}

function inferTypes(primaryType: string, message: Record<string, unknown>): Eip712Types {
  const types: Eip712Types = {};
  types[primaryType] = Object.entries(message).map(([name, value]) => ({
    name,
    type: inferFieldType(name, value, types),
  }));
  return types;
}

/**
 * Computes real EIP-712 domainSeparator, structHash, and eip712Digest using Keccak-256.
 */
export async function computeEip712Hash(
  domain: Eip712Domain,
  primaryType: string,
  message: Record<string, unknown>,
  types?: Eip712Types,
): Promise<Eip712HashResult> {
  if (!primaryType.trim()) {
    throw new Error('Primary type is required.');
  }

  const domainFields = buildDomainFields(domain);
  const domainTypes: Eip712Types = { EIP712Domain: domainFields };
  const resolvedTypes = types ?? inferTypes(primaryType, message);

  const domainSeparatorBytes = await hashEip712Struct(
    'EIP712Domain',
    domainTypes,
    domain as Record<string, unknown>,
  );
  const structHashBytes = await hashEip712Struct(primaryType, resolvedTypes, message);
  const digestBytes = await keccak256Bytes(
    concatBytes(new Uint8Array([0x19, 0x01]), domainSeparatorBytes, structHashBytes),
  );

  return {
    domainSeparator: bytesToHex(domainSeparatorBytes),
    structHash: bytesToHex(structHashBytes),
    eip712Digest: bytesToHex(digestBytes),
  };
}
