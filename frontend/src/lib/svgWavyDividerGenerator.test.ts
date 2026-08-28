import { describe, it, expect } from 'vitest';
import { generateSvgWave } from './svgWavyDividerGenerator';

describe('svgWavyDividerGenerator', () => {
  it('generates SVG wave code', () => {
    expect(generateSvgWave('#000', 80)).toContain('<svg');
  });
});
