import { describe, expect, it } from 'vitest';
import { convertCryptoUnits } from './cryptoUnitConverter';

describe('cryptoUnitConverter', () => {
  it('converts 1 Ether into Wei and Gwei', () => {
    const res = convertCryptoUnits('1', 'ether');
    expect(res.gwei).toBe('1000000000');
    expect(res.ether).toBe('1');
  });
});
