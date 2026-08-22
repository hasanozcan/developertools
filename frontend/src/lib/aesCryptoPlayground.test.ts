import { describe, it, expect } from 'vitest';
import { formatAesKeyHex } from './aesCryptoPlayground';

describe('aesCryptoPlayground', () => {
  it('generates valid hex representation for 256-bit key', () => {
    const key = formatAesKeyHex(256);
    expect(key).toHaveLength(64);
  });
});
