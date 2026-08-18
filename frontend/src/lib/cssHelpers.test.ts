import { describe, it, expect } from 'vitest';
import { calculateCssClamp, generateBoxShadowCss } from './cssHelpers';

describe('cssHelpers', () => {
  it('calculates fluid clamp CSS correctly', () => {
    const result = calculateCssClamp({
      minWidth: 320,
      maxWidth: 1200,
      minValue: 16,
      maxValue: 32,
      rootFontSize: 16,
      unit: 'rem',
    });

    expect(result.clampCss).toContain('clamp(1rem,');
    expect(result.clampCss).toContain('2rem)');
    expect(result.tailwindClass).toContain('text-[');
  });

  it('generates multi-layer box-shadow CSS', () => {
    const layers = [
      { id: '1', inset: false, offsetX: 0, offsetY: 10, blur: 25, spread: -5, color: '#0f172a', opacity: 0.1 },
      { id: '2', inset: true, offsetX: 0, offsetY: 1, blur: 2, spread: 0, color: '#ffffff', opacity: 0.8 },
    ];
    const css = generateBoxShadowCss(layers);
    expect(css).toContain('0px 10px 25px -5px');
    expect(css).toContain('inset 0px 1px 2px 0px');
  });
});
