import { describe, expect, it } from 'vitest';
import {
  generateBcryptHash,
  getBcryptCost,
  getBcryptPasswordByteLength,
  verifyBcryptHash,
} from './bcrypt';

describe('bcrypt helpers', () => {
  it('generates salted hashes and verifies only the matching password', async () => {
    const first = await generateBcryptHash('test-password', 4);
    const second = await generateBcryptHash('test-password', 4);

    expect(first).toMatch(/^\$2[ab]\$04\$/);
    expect(second).not.toBe(first);
    await expect(verifyBcryptHash('test-password', first)).resolves.toBe(true);
    await expect(verifyBcryptHash('wrong-password', first)).resolves.toBe(false);
  });

  it('validates cost and hash formats before expensive work', async () => {
    await expect(generateBcryptHash('password', 3)).rejects.toThrow('Cost must be');
    await expect(generateBcryptHash('password', 15)).rejects.toThrow('Cost must be');
    await expect(verifyBcryptHash('password', 'not-a-hash')).rejects.toThrow(
      'Enter a valid bcrypt',
    );
    expect(getBcryptCost('$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy')).toBe(10);
  });

  it('rejects empty or silently truncated UTF-8 passwords', async () => {
    await expect(generateBcryptHash('', 4)).rejects.toThrow('Password is required');
    expect(getBcryptPasswordByteLength('🔐'.repeat(18))).toBe(72);
    await expect(generateBcryptHash(`a${'🔐'.repeat(18)}`, 4)).rejects.toThrow(
      'only processes the first 72 bytes',
    );
  });
});
