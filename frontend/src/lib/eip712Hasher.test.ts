import { describe, expect, it } from 'vitest';
import { computeEip712Hash } from './eip712Hasher';

describe('eip712Hasher', () => {
  it('computes domain separator and struct hash', () => {
    const res = computeEip712Hash(
      { name: 'MyApp', version: '1', chainId: 1, verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC' },
      'Mail',
      { from: '0x111', to: '0x222', contents: 'Hello!' }
    );
    expect(res.domainSeparator).toContain('0x');
    expect(res.structHash).toContain('0x');
  });
});
