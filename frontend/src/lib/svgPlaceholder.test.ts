import { describe, it, expect } from 'vitest';
import { generateSvgPlaceholder } from './svgPlaceholder';

describe('svgPlaceholder', () => {
  it('should generate valid SVG and data URI', () => {
    const { svg, dataUri } = generateSvgPlaceholder({
      width: 400,
      height: 300,
      bgColor: '#cccccc',
      textColor: '#333333',
      text: 'Sample',
    });

    expect(svg).toContain('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"');
    expect(svg).toContain('fill="#cccccc"');
    expect(svg).toContain('Sample');
    expect(dataUri.startsWith('data:image/svg+xml;utf8,')).toBe(true);
  });

  it('should fallback to dimensions when text is empty', () => {
    const { svg } = generateSvgPlaceholder({
      width: 500,
      height: 200,
      bgColor: '#000',
      textColor: '#fff',
      text: '',
    });

    expect(svg).toContain('500 × 200');
  });
});
