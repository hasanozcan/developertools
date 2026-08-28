import { describe, it, expect } from 'vitest';
import { convertSvgToCssDataUri } from './svgToCssDataUri';

describe('svgToCssDataUri', () => {
  it('converts SVG to clean UTF-8 URL-encoded CSS background-image', () => {
    const svg = '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M5 12h14" stroke="#ff0000"/></svg>';
    const css = convertSvgToCssDataUri(svg, { format: 'utf8-encoded', mode: 'background-image' });
    expect(css).toContain('background-image: url("data:image/svg+xml,');
    expect(css).toContain('%23ff0000');
  });

  it('converts SVG to Base64 data URI', () => {
    const svg = '<svg width="10" height="10"></svg>';
    const uri = convertSvgToCssDataUri(svg, { format: 'base64', mode: 'data-uri-only' });
    expect(uri.startsWith('data:image/svg+xml;base64,')).toBe(true);
  });
});
