import { describe, expect, it } from 'vitest';
import { generateUuidV5 } from './uuidV5Generator';

describe('uuidV5Generator', () => {
  it('generates consistent uuid v5', () => {
    const u1 = generateUuidV5('6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'example.com');
    const u2 = generateUuidV5('6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'example.com');
    expect(u1).toBe(u2);
    expect(u1.charAt(14)).toBe('5');
  });
});
