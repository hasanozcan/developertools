import { describe, it, expect } from 'vitest';
import { hashSync } from 'bcryptjs';
import { parseBcryptHash, verifyBcryptHash } from './bcryptVerifier';

describe('bcryptVerifier', () => {
  const sampleHash = '$2b$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwEq';

  it('should parse bcrypt hash structure accurately', () => {
    const info = parseBcryptHash(sampleHash);

    expect(info.isValidStructure).toBe(true);
    expect(info.isSupportedCost).toBe(true);
    expect(info.version).toBe('$2b');
    expect(info.cost).toBe(10);
    expect(info.salt.length).toBe(22);
    expect(info.hash.length).toBe(31);
  });

  it('should reject malformed hashes', () => {
    const info = parseBcryptHash('not-a-bcrypt-hash');
    expect(info.isValidStructure).toBe(false);
    expect(info.isSupportedCost).toBe(false);
  });

  it('verifies matching and non-matching passwords against real bcrypt hashes', async () => {
    const realHash = hashSync('correct-horse-battery', 4);
    await expect(verifyBcryptHash('correct-horse-battery', realHash)).resolves.toBe(true);
    await expect(verifyBcryptHash('wrong-password', realHash)).resolves.toBe(false);
  });

  it('enforces BCRYPT_MAX_BROWSER_COST (4..14) and BCRYPT_MAX_PASSWORD_BYTES (72)', async () => {
    const realHash = hashSync('ok', 4);
    await expect(verifyBcryptHash('a'.repeat(73), realHash)).rejects.toThrow(/72/);
    await expect(verifyBcryptHash('🔐'.repeat(19), realHash)).rejects.toThrow(/72/);

    const highCostHash = `$2b$15$${realHash.slice(7)}`;
    const parsedHigh = parseBcryptHash(highCostHash);
    expect(parsedHigh.isValidStructure).toBe(true);
    expect(parsedHigh.isSupportedCost).toBe(false);
    await expect(verifyBcryptHash('ok', highCostHash)).rejects.toThrow(/4 to 14/);

    const lowCostHash = `$2b$03$${realHash.slice(7)}`;
    await expect(verifyBcryptHash('ok', lowCostHash)).rejects.toThrow(/4 to 14/);
  });
});
