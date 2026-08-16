import { describe, expect, it } from 'vitest';
import {
  analyzeColorContrast,
  contrastRatio,
  hexToRgb,
  normalizeHexColor,
  relativeLuminance,
} from './colorContrast';

describe('color contrast calculations', () => {
  it('normalizes shorthand colors and calculates RGB/luminance', () => {
    expect(normalizeHexColor('abc')).toBe('#AABBCC');
    expect(hexToRgb('#ff8000')).toEqual({ red: 255, green: 128, blue: 0 });
    expect(relativeLuminance('#000')).toBe(0);
    expect(relativeLuminance('#fff')).toBeCloseTo(1, 10);
  });

  it('returns the WCAG black-on-white ratio and pass levels', () => {
    const report = analyzeColorContrast('#000000', '#FFFFFF');
    expect(report.ratio).toBeCloseTo(21, 10);
    expect(report.normalText).toEqual({ aa: true, aaa: true });
    expect(report.largeText).toEqual({ aa: true, aaa: true });
    expect(report.nonText.aa).toBe(true);
  });

  it('distinguishes normal and large-text thresholds', () => {
    const report = analyzeColorContrast('#777777', '#FFFFFF');
    expect(report.ratio).toBeCloseTo(4.478, 3);
    expect(report.normalText).toEqual({ aa: false, aaa: false });
    expect(report.largeText).toEqual({ aa: true, aaa: false });
    expect(report.suggestedTextColor).toBe('#000000');
  });

  it('is symmetric and rejects unsupported alpha or malformed values', () => {
    expect(contrastRatio('#123456', '#abcdef')).toBeCloseTo(
      contrastRatio('#abcdef', '#123456'),
      12,
    );
    expect(() => normalizeHexColor('#12345678')).toThrow(/3- or 6-digit/u);
    expect(() => normalizeHexColor('not-a-color')).toThrow();
  });
});
