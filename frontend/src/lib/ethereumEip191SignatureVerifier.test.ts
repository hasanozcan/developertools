import { describe, it, expect } from 'vitest';
import { formatEip191Message } from './ethereumEip191SignatureVerifier';

describe('ethereumEip191SignatureVerifier', () => {
  it('prefixes message with EIP-191 header', () => {
    expect(formatEip191Message('hello')).toContain('Ethereum Signed Message:\n5hello');
  });
});
