import { describe, it, expect } from 'vitest';
import { generateTailwindV4OklchPalette } from './tailwindV4ColorPalette';

describe('generateTailwindV4OklchPalette', () => {
  it('generates 11 shades of OKLCH colors', () => {
    const palette = generateTailwindV4OklchPalette(260);
    expect(palette['500']).toContain('oklch(0.58 0.24 260)');
    expect(palette['50']).toBeDefined();
  });
});