import { describe, it, expect } from 'vitest';
import { validateSolanaAddress } from './solanaAddressValidator';

describe('validateSolanaAddress', () => {
  it('validates correct Solana address', () => {
    const res = validateSolanaAddress('7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs');
    expect(res.isValid).toBe(true);
  });

  it('rejects invalid characters', () => {
    const res = validateSolanaAddress('0x1234567890abcdef');
    expect(res.isValid).toBe(false);
  });
});