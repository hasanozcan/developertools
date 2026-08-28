import { describe, it, expect } from 'vitest';
import { calculateBlake3Fallback } from './blake3HashGenerator';

describe('blake3HashGenerator', () => {
  it('computes 256-bit hash digest', () => {
    expect(calculateBlake3Fallback('hello').length).toBe(64);
  });
});
