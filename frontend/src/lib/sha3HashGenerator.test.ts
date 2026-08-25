import { describe, expect, it } from 'vitest';
import { generateSha3Hash } from './sha3HashGenerator';

describe('sha3HashGenerator', () => {
  it('generates sha3-256 and sha3-512 hashes', () => {
    const h256 = generateSha3Hash('hello', 'sha3-256');
    expect(h256).toHaveLength(64);
    const h512 = generateSha3Hash('hello', 'sha3-512');
    expect(h512).toHaveLength(128);
  });
});
