import { describe, it, expect } from 'vitest';
import { derivePbkdf2 } from './pbkdf2KeyDerivation';

describe('pbkdf2KeyDerivation', () => {
  it('derives key with pbkdf2', () => {
    const key = derivePbkdf2('pass', 'salt', 1000, 16);
    expect(key.length).toBe(32);
  });
});
