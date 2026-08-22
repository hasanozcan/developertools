import { describe, it, expect } from 'vitest';
import { formatArgon2idHash } from './argon2HashGenerator';

describe('argon2HashGenerator', () => {
  it('formats Argon2id hash string with parameters', () => {
    const hash = formatArgon2idHash('mypassword', { timeCost: 2, memoryCostKiB: 65536, parallelism: 1 });
    expect(hash).toContain('$argon2id$v=19$m=65536,t=2,p=1$');
  });
});
