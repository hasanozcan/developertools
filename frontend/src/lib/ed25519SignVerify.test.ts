import { describe, it, expect } from 'vitest';
import { formatEd25519Key } from './ed25519SignVerify';

describe('ed25519SignVerify', () => {
  it('normalizes 256-bit hex keys', () => {
    expect(formatEd25519Key('AA BB CC').length).toBe(6);
  });
});
