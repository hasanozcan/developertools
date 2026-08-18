import { describe, it, expect } from 'vitest';
import { optimizeSvg } from './svgOptimizer';

describe('svgOptimizer', () => {
  const dirtySvg = `<?xml version="1.0" encoding="utf-8"?>
  <!-- Generator: Adobe Illustrator -->
  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 0 100 100">
    <circle cx="50.0000" cy="50.0000" r="25.0000" fill="red"/>
  </svg>`;

  it('removes XML declaration, doctype, comments and inkscape tags', () => {
    const result = optimizeSvg(dirtySvg);
    expect(result.optimizedSvg).not.toContain('<?xml');
    expect(result.optimizedSvg).not.toContain('<!DOCTYPE');
    expect(result.optimizedSvg).not.toContain('<!-- Generator');
    expect(result.optimizedSvg).not.toContain('inkscape');
    expect(result.savingsBytes).toBeGreaterThan(0);
    expect(result.savingsPercent).toBeGreaterThan(0);
  });
});
