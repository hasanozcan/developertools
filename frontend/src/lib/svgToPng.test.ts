import { describe, it, expect } from 'vitest';
import { parseSvgDimensions, calculateExportDimensions, sanitizeSvg } from './svgToPng';

describe('svgToPng', () => {
  it('parses SVG width, height and viewBox', () => {
    const svg = '<svg width="200" height="100" viewBox="0 0 200 100"></svg>';
    expect(parseSvgDimensions(svg)).toEqual({ width: 200, height: 100 });
  });

  it('calculates scaled export dimensions', () => {
    expect(calculateExportDimensions({ width: 100, height: 100 }, 4)).toEqual({
      width: 400,
      height: 400,
    });
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

  it('strips style, animate*, set, handler, listener tags and external URLs or obfuscated schemes', () => {
    const malicious = `<svg viewBox="0 0 100 100" onbegin="alert(1)" onend="alert(2)" onrepeat="alert(3)">
      <style>circle { fill: url(https://evil.example/track.svg#x); }</style>
      <animate attributeName="href" to="javascript:alert(1)" />
      <animateTransform attributeName="transform" type="rotate" />
      <animateMotion path="M0,0 L10,10" />
      <set attributeName="onmouseover" to="alert(1)" />
      <handler type="text/ecmascript">alert(1)</handler>
      <listener event="click" handler="#x" />
      <image href="https://evil.example/pixel.png" />
      <image xlink:href="http://evil.example/pixel.png" />
      <a href="//evil.example/phish"><text x="10" y="20">link</text></a>
      <a href="java&Tab;script:alert(1)"><text x="10" y="40">tab</text></a>
      <a href="java&NewLine;script:alert(2)"><text x="10" y="60">nl</text></a>
      <rect width="20" height="20" style="background:url(https://evil.example/bg.png)" />
      <circle cx="50" cy="50" r="10" style="stop-color:#4f46e5" fill="url(#grad)" />
    </svg>`;

    const sanitized = sanitizeSvg(malicious);

    expect(sanitized).not.toMatch(/<style/i);
    expect(sanitized).not.toMatch(/<animate/i);
    expect(sanitized).not.toMatch(/<set\b/i);
    expect(sanitized).not.toMatch(/<handler/i);
    expect(sanitized).not.toMatch(/<listener/i);
    expect(sanitized).not.toMatch(/\bon(?:begin|end|repeat)\s*=/i);
    expect(sanitized).not.toMatch(/evil\.example/i);
    expect(sanitized).not.toMatch(/javascript:/i);
    expect(sanitized).not.toMatch(/java&Tab;script:/i);
    expect(sanitized).not.toMatch(/java&NewLine;script:/i);
    expect(sanitized).toContain(
      '<circle cx="50" cy="50" r="10" style="stop-color:#4f46e5" fill="url(#grad)" />',
    );
  });
});
