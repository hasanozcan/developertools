import { describe, it, expect } from 'vitest';
import { generateBcryptMockHash, parseBcryptHash } from './bcryptHashCalculator';

describe('bcryptHashCalculator', () => {
  it('generates valid standard $2a$ format Bcrypt hash', () => {
    const hash = generateBcryptMockHash('secretPassword123', 12);
    expect(hash).toMatch(/^\$2a\$12\$[./A-Za-z0-9]{53}$/);
    const parsed = parseBcryptHash(hash);
    expect(parsed.isValid).toBe(true);
    expect(parsed.cost).toBe(12);
    expect(parsed.version).toBe('2a');
  });
});
