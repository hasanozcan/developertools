import { describe, it, expect } from 'vitest';
import { convertSvgToJsx, minifySvg } from './svgConverter';

describe('svgConverter', () => {
  const sampleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <!-- Test Comment -->
    <path d="M12 2v20M2 12h20" style="stroke-opacity: 0.8;" />
  </svg>`;

  it('converts SVG to JSX with TypeScript and camelCase attributes', () => {
    const result = convertSvgToJsx(sampleSvg, {
      componentName: 'CrossIcon',
      typescript: true,
      namedExport: false,
      forwardRef: false,
      spreadProps: true,
      iconMode: false,
    });

    expect(result).toContain('export default function CrossIcon');
    expect(result).toContain('className="icon"');
    expect(result).toContain('strokeWidth="2"');
    expect(result).toContain('strokeLinecap="round"');
    expect(result).toContain("style={{ strokeOpacity: '0.8' }}");
    expect(result).not.toContain('<!-- Test Comment -->');
  });

  it('supports forwardRef mode', () => {
    const result = convertSvgToJsx(sampleSvg, {
      componentName: 'CrossIcon',
      typescript: true,
      namedExport: true,
      forwardRef: true,
      spreadProps: true,
      iconMode: true,
    });

    expect(result).toContain('forwardRef');
    expect(result).toContain('ref={ref}');
    expect(result).toContain('width="1em"');
  });

  it('supports named export mode without forwardRef', () => {
    const result = convertSvgToJsx(sampleSvg, {
      componentName: 'CrossIcon',
      typescript: true,
      namedExport: true,
      forwardRef: false,
      spreadProps: true,
      iconMode: false,
    });

    expect(result).toContain('export function CrossIcon');
  });

  it('minifies SVG and strips comments and metadata', () => {
    const result = minifySvg(sampleSvg);
    expect(result.minified).not.toContain('<!-- Test Comment -->');
    expect(result.minifiedSize).toBeLessThan(result.originalSize);
  });
});
