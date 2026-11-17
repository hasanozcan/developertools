import { describe, expect, it, vi, afterEach } from 'vitest';
import { generateCustomNanoId } from './nanoidCustomAlphabet';

describe('nanoidCustomAlphabet', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('generates custom length and alphabet nanoid without Math.random', () => {
    vi.spyOn(Math, 'random').mockImplementation(() => {
      throw new Error('Unsafe randomness');
    });

    const id = generateCustomNanoId('1234567890', 10);
    expect(id).toHaveLength(10);
    expect(id).toMatch(/^\d{10}$/);
  });

  it('rejects empty alphabet and invalid sizes', () => {
    expect(() => generateCustomNanoId('', 10)).toThrow(RangeError);
    expect(() => generateCustomNanoId('abc', 0)).toThrow(RangeError);
    expect(() => generateCustomNanoId('abc', -1)).toThrow(RangeError);
    expect(() => generateCustomNanoId('abc', 2.5)).toThrow(RangeError);
  });
});
