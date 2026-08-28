import { describe, it, expect } from 'vitest';
import { validateBech32Address } from './bitcoinBech32AddressEncoder';

describe('bitcoinBech32AddressEncoder', () => {
  it('validates mainnet bech32 addresses', () => {
    expect(validateBech32Address('bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4').isValid).toBe(true);
  });
});
