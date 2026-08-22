import { describe, it, expect } from 'vitest';
import { generateColorHarmonies } from './colorHarmonyGenerator';

describe('colorHarmonyGenerator', () => {
  it('generates harmonic color palettes from base hex color', () => {
    const palette = generateColorHarmonies('#3B82F6', 'triadic');
    expect(palette).toHaveLength(5);
    expect(palette[0].hex).toBe('#3B82F6');
    expect(palette[1].hex).toBeDefined();
  });
});
