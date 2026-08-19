import { describe, it, expect } from 'vitest';
import { generatePatternCss, DEFAULT_PATTERN } from './cssPattern';

describe('cssPattern', () => {
  it('should generate dot pattern background CSS', () => {
    const res = generatePatternCss(DEFAULT_PATTERN);
    expect(res.css).toContain('radial-gradient(#38bdf8 2px, transparent 2px)');
    expect(res.backgroundSize).toBe('24px 24px');
  });

  it('should generate grid pattern background CSS', () => {
    const res = generatePatternCss({ ...DEFAULT_PATTERN, type: 'grid' });
    expect(res.css).toContain('linear-gradient(to right, #38bdf8 1px, transparent 1px)');
  });
});
