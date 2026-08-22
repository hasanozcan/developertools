import { describe, it, expect } from 'vitest';
import { generateNanoId } from './nanoidGenerator';

describe('nanoidGenerator', () => {
  it('generates secure random NanoID with custom lengths and alphabets', () => {
    const id = generateNanoId(16, '0123456789ABCDEF');
    expect(id).toHaveLength(16);
    expect(id).toMatch(/^[0-9A-F]{16}$/);
  });
});
