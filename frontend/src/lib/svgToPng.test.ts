import { describe, it, expect } from 'vitest';
import { parseSvgDimensions, calculateExportDimensions, sanitizeSvg } from './svgToPng';

describe('svgToPng', () => {
  it('parses SVG width, height and viewBox', () => {
    const svg = '<svg width="200" height="100" viewBox="0 0 200 100"></svg>';
    expect(parseSvgDimensions(svg)).toEqual({ width: 200, height: 100 });
  });

  it('calculates scaled export dimensions', () => {
    expect(calculateExportDimensions({ width: 100, height: 100 }, 4)).toEqual({ width: 400, height: 400 });
  });

  it('adds xmlns namespace if missing', () => {
    const svg = '<svg viewBox="0 0 10 10"></svg>';
    expect(sanitizeSvg(svg)).toContain('xmlns="http://www.w3.org/2000/svg"');
  });
});
