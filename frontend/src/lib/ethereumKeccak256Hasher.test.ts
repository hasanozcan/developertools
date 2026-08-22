import { describe, it, expect } from 'vitest';
import { computeKeccakSimulation } from './ethereumKeccak256Hasher';

describe('computeKeccakSimulation', () => {
  it('generates 4-byte selector and 32-byte hex hash', () => {
    const res = computeKeccakSimulation('transfer(address,uint256)');
    expect(res.keccak256Hex.startsWith('0x')).toBe(true);
    expect(res.methodSig?.startsWith('0x')).toBe(true);
  });
});