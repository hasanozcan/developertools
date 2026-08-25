import { describe, expect, it } from 'vitest';
import { generateCustomNanoId } from './nanoidCustomAlphabet';

describe('nanoidCustomAlphabet', () => {
  it('generates custom length and alphabet nanoid', () => {
    const id = generateCustomNanoId('1234567890', 10);
    expect(id).toHaveLength(10);
    expect(id).toMatch(/^\d+$/);
  });
});
