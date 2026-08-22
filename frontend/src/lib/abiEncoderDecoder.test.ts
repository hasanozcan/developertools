import { describe, it, expect } from 'vitest';
import { encodeAbiParams } from './abiEncoderDecoder';

describe('encodeAbiParams', () => {
  it('encodes function parameters into ABI payload', () => {
    const res = encodeAbiParams('transfer', ['address', 'uint256'], ['1234', '100']);
    expect(res.startsWith('0x')).toBe(true);
    expect(res.length).toBeGreaterThan(64);
  });
});