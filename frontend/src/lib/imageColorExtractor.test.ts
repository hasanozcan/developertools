import { describe, expect, it } from 'vitest';
import {
  extractPaletteFromImageData,
  getContrastTextColor,
  rgbToHex,
  rgbToHsl,
} from './imageColorExtractor';

describe('imageColorExtractor', () => {
  it('converts RGB to HEX and HSL', () => {
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
    expect(rgbToHex(0, 255, 0)).toBe('#00ff00');
    expect(rgbToHex(0, 0, 255)).toBe('#0000ff');

    const hsl = rgbToHsl(255, 0, 0);
    expect(hsl.h).toBe(0);
    expect(hsl.s).toBe(100);
    expect(hsl.l).toBe(50);
  });

  it('determines contrast text color (black or white)', () => {
    expect(getContrastTextColor(255, 255, 255)).toBe('#000000'); // on white, text should be black
    expect(getContrastTextColor(0, 0, 0)).toBe('#ffffff'); // on black, text should be white
  });

  it('extracts dominant colors from pixel array', () => {
    // 4 red pixels and 1 blue pixel
    const pixels = new Uint8ClampedArray([
      255, 0, 0, 255,
      255, 0, 0, 255,
      255, 0, 0, 255,
      255, 0, 0, 255,
      0, 0, 255, 255,
    ]);

    const palette = extractPaletteFromImageData(pixels, 2);
    expect(palette.length).toBeGreaterThanOrEqual(1);
    expect(palette[0].hex).toBe('#ff0000');
  });
});
