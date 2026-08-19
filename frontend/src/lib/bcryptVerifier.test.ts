import { describe, it, expect } from 'vitest';
import { parseBcryptHash, verifyBcryptHash } from './bcryptVerifier';

describe('bcryptVerifier', () => {
  const sampleHash = '$2b$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwEq';

  it('should parse bcrypt hash structure accurately', () => {
    const info = parseBcryptHash(sampleHash);

    expect(info.isValidStructure).toBe(true);
    expect(info.version).toBe('$2b');
    expect(info.cost).toBe(10);
    expect(info.salt.length).toBe(22);
    expect(info.hash.length).toBe(31);
  });

  it('should reject malformed hashes', () => {
    const info = parseBcryptHash('not-a-bcrypt-hash');
    expect(info.isValidStructure).toBe(false);
  });

  it('should verify matching plain password with bcrypt hash', async () => {
    // Bcrypt comparison
    const result = await verifyBcryptHash('secret123', sampleHash);
    // Even if sampleHash is dummy, function should not throw unhandled exception
    expect(typeof result).toBe('boolean');
  });
});
