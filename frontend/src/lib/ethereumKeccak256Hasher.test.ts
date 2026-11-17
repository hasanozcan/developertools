import { describe, it, expect } from 'vitest';
import { computeKeccak256 } from './ethereumKeccak256Hasher';

describe('computeKeccak256', () => {
  it('computes the canonical Ethereum Keccak-256 hash and 4-byte selector for ERC-20 transfer', async () => {
    const res = await computeKeccak256('transfer(address,uint256)');
    expect(res.keccak256Hex).toBe(
      '0xa9059cbb2ab09eb219583f4a59a5d0623ade346d962bcd4e46b11da047c9049b',
    );
    expect(res.methodSig).toBe('0xa9059cbb');
  });

  it('computes the empty-string Keccak-256 vector (distinct from NIST SHA3-256)', async () => {
    const res = await computeKeccak256('');
    expect(res.keccak256Hex).toBe(
      '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    );
  });
});
