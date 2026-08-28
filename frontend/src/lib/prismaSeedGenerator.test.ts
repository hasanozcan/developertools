import { describe, it, expect } from 'vitest';
import { generatePrismaSeed } from './prismaSeedGenerator';

describe('prismaSeedGenerator', () => {
  it('generates Prisma seed script', () => {
    expect(generatePrismaSeed('User', 2)).toContain('createMany');
  });
});
