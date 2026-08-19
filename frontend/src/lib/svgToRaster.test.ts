import { describe, it, expect } from 'vitest';
import { sanitizeSvg, svgToDataUri, extractSvgDimensions } from './svgToRaster';

describe('svgToRaster', () => {
  const sampleSvg = `<svg width="200" height="100" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="100" fill="#4f46e5"/></svg>`;

  it('should extract dimensions accurately', () => {
    const dims = extractSvgDimensions(sampleSvg);
    expect(dims.width).toBe(200);
    expect(dims.height).toBe(100);
  });

  it('should generate valid SVG Data URI', () => {
    const dataUri = svgToDataUri(sampleSvg);
    expect(dataUri.startsWith('data:image/svg+xml;charset=utf-8,')).toBe(true);
  });

  it('should sanitize SVG code before encoding', () => {
    const messySvg = `   \n<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="20"/></svg>`;
    const sanitized = sanitizeSvg(messySvg);
    expect(sanitized.startsWith('<svg')).toBe(true);
  });
});
