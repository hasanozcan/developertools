import { describe, it, expect, vi, afterEach } from 'vitest';
import { generateNanoId } from './nanoidGenerator';

describe('nanoidGenerator', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('generates secure random NanoID with custom lengths and alphabets without Math.random', () => {
    vi.spyOn(Math, 'random').mockImplementation(() => {
      throw new Error('Unsafe randomness');
    });

    const id = generateNanoId(16, '0123456789ABCDEF');
    expect(id).toHaveLength(16);
    expect(id).toMatch(/^[0-9A-F]{16}$/);

    const defaultId = generateNanoId();
    expect(defaultId).toHaveLength(21);
    expect(defaultId).toMatch(/^[A-Za-z0-9_-]{21}$/);

    const fallbackId = generateNanoId(10, '');
    expect(fallbackId).toHaveLength(10);
    expect(fallbackId).toMatch(/^[A-Za-z0-9_-]{10}$/);
  });

  it('rejects invalid sizes', () => {
    expect(() => generateNanoId(0)).toThrow(RangeError);
    expect(() => generateNanoId(-5)).toThrow(RangeError);
    expect(() => generateNanoId(1.5)).toThrow(RangeError);
  });
});
