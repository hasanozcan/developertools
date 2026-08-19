import { describe, it, expect } from 'vitest';
import { generateAsciiArt } from './asciiArt';

describe('asciiArt', () => {
  it('should generate standard ASCII banner text', () => {
    const art = generateAsciiArt('DEV', 'standard');
    expect(art).toContain('|___/');
    expect(art).toContain('|___|');
    expect(art.split('\n').length).toBe(4);
  });

  it('should generate blocks font ASCII text', () => {
    const art = generateAsciiArt('HI', 'blocks');
    expect(art).toContain('█');
    expect(art.split('\n').length).toBe(3);
  });

  it('should return empty string for empty input', () => {
    expect(generateAsciiArt('')).toBe('');
  });
});
