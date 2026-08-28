import { describe, it, expect } from 'vitest';
import { encodeCrockford } from './crockfordBase32Encoder';

describe('crockfordBase32Encoder', () => {
  it('encodes integers into Crockford Base32', () => {
    expect(encodeCrockford(32)).toBe('10');
  });
});
