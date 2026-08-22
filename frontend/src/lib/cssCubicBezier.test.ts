import { describe, it, expect } from 'vitest';
import { formatCubicBezier, CUBIC_BEZIER_PRESETS } from './cssCubicBezier';

describe('cssCubicBezier', () => {
  it('formats cubic-bezier timing function CSS declaration', () => {
    const res = formatCubicBezier(CUBIC_BEZIER_PRESETS.bounce);
    expect(res.cssValue).toBe('cubic-bezier(0.68, -0.55, 0.265, 1.55)');
    expect(res.transitionCss).toContain('transition: all 0.3s');
  });
});
