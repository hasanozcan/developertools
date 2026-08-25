import { describe, expect, it } from 'vitest';
import { svgToCss } from './svgToCss';

describe('svgToCss', () => {
  it('encodes svg into clean css background data uri', () => {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>';
    const res = svgToCss(svg);
    expect(res.dataUri).toContain('data:image/svg+xml,');
    expect(res.cssBackground).toContain('background-image: url(');
  });
});
