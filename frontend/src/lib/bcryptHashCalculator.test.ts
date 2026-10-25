import { describe, it, expect } from 'vitest';
import { generateBcryptHash, parseBcryptHash } from './bcryptHashCalculator';

describe('bcryptHashCalculator', () => {
  it('generates valid standard $2b$ format Bcrypt hash', async () => {
    const hash = await generateBcryptHash('secretPassword123', 4);
    expect(hash).toMatch(/^\$2b\$04\$[./A-Za-z0-9]{53}$/);
    const parsed = parseBcryptHash(hash);
    expect(parsed.isValid).toBe(true);
    expect(parsed.cost).toBe(4);
    expect(parsed.version).toBe('2b');
  });
});
