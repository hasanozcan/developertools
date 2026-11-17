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

  it('strips script, foreignObject, event handlers, and unsafe href/xlink:href attributes while preserving safe SVG', () => {
    const malicious = `<svg viewBox="0 0 100 100" onload="alert(1)">
      <script>alert(2)</script>
      <foreignObject><img src="x" onerror="alert(3)" /></foreignObject>
      <circle cx="50" cy="50" r="40" fill="#4f46e5" onclick="alert(4)" />
      <a href="javascript:alert(5)"><text x="10" y="20">bad</text></a>
      <use xlink:href="vbscript:msgbox(6)" />
      <use href="#safe-grad" />
    </svg>`;

    const sanitized = sanitizeSvg(malicious);

    expect(sanitized).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(sanitized).toContain('<circle cx="50" cy="50" r="40" fill="#4f46e5"');
    expect(sanitized).toContain('<use href="#safe-grad" />');
    expect(sanitized).not.toMatch(/<script/i);
    expect(sanitized).not.toMatch(/<foreignObject/i);
    expect(sanitized).not.toMatch(/\bon(?:load|error|click)\s*=/i);
    expect(sanitized).not.toMatch(/javascript:/i);
    expect(sanitized).not.toMatch(/vbscript:/i);
  });
});
