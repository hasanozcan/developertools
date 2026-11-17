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

  it('should strip scripts, foreignObject, event handlers, and unsafe URLs', () => {
    const malicious = `<!-- header --><svg/onload="alert(1)" viewBox="0 0 50 50"><script>alert(1)</script><foreignObject><div>x</div></foreignObject><a xlink:href="javascript:alert(2)"><rect width="10" height="10" onmouseover="alert(3)"/></a></svg>`;
    const sanitized = sanitizeSvg(malicious);

    expect(sanitized.startsWith('<svg')).toBe(true);
    expect(sanitized).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(sanitized).toContain('<rect width="10" height="10" />');
    expect(sanitized).not.toMatch(/<script/i);
    expect(sanitized).not.toMatch(/<foreignObject/i);
    expect(sanitized).not.toMatch(/\bon(?:load|mouseover)\s*=/i);
    expect(sanitized).not.toMatch(/javascript:/i);
  });
});
