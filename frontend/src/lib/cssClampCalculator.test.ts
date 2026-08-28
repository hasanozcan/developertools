import { describe, it, expect } from 'vitest';
import { calculateCssClamp } from './cssClampCalculator';

describe('cssClampCalculator', () => {
  it('calculates exact clamp() expression', () => {
    const res = calculateCssClamp({
      minWidth: 320,
      maxWidth: 1200,
      minValue: 16,
      maxValue: 32,
      rootFontSize: 16,
    });
    expect(res).toMatch(/^clamp\([\d.]+rem,\s*-?[\d.]+rem\s*\+\s*[\d.]+vw,\s*[\d.]+rem\)$/);
  });
});
