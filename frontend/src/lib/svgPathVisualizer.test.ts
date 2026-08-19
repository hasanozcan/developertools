import { describe, it, expect } from 'vitest';
import { parseSvgPath, cleanSvgPath } from './svgPathVisualizer';

describe('svgPathVisualizer', () => {
  it('should parse SVG path commands accurately', () => {
    const d = 'M 10 20 L 30 40 Z';
    const parsed = parseSvgPath(d);
    expect(parsed.length).toBe(3);
    expect(parsed[0]).toEqual({ type: 'M', params: [10, 20] });
    expect(parsed[1]).toEqual({ type: 'L', params: [30, 40] });
    expect(parsed[2]).toEqual({ type: 'Z', params: [] });
  });

  it('should strip surrounding path tag if pasted', () => {
    const raw = '<path d="M 0 0 L 100 100" fill="none" />';
    expect(cleanSvgPath(raw)).toBe('M 0 0 L 100 100');
  });
});
