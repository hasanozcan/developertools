import { describe, it, expect } from 'vitest';
import { generateTailwindPalette, hexToHsl, hslToHex } from './colorPalette';

describe('colorPalette', () => {
  it('should convert hex to hsl and back accurately', () => {
    const red = hexToHsl('#ff0000');
    expect(red).toEqual({ h: 0, s: 100, l: 50 });
    expect(hslToHex(0, 100, 50).toLowerCase()).toBe('#ff0000');

    const blue = hexToHsl('#0000ff');
    expect(blue).toEqual({ h: 240, s: 100, l: 50 });
    expect(hslToHex(240, 100, 50).toLowerCase()).toBe('#0000ff');
  });

  it('should generate 11 Tailwind palette shades (50 to 950)', () => {
    const shades = generateTailwindPalette('#6366f1');
    expect(shades.length).toBe(11);
    expect(shades[0].shade).toBe(50);
    expect(shades[10].shade).toBe(950);
    expect(shades[0].hex.startsWith('#')).toBe(true);
  });
});
