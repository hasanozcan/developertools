import { describe, it, expect } from 'vitest';
import { inspectPgpKey } from './pgpKeyInspector';

describe('pgpKeyInspector', () => {
  it('identifies PGP armored blocks', () => {
    const pub = '-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: BCPG v1.58\n...\n-----END PGP PUBLIC KEY BLOCK-----';
    const res = inspectPgpKey(pub);
    expect(res.isArmored).toBe(true);
    expect(res.type).toBe('PUBLIC');
  });
});
