import { describe, it, expect } from 'vitest';
import { calculateFluidTypography } from './fluidTypography';

describe('fluidTypography', () => {
  it('calculates CSS clamp() fluid typography between breakpoints', () => {
    const result = calculateFluidTypography({
      minFontSizePx: 16,
      maxFontSizePx: 24,
      minViewportPx: 320,
      maxViewportPx: 1200,
    });

    expect(result.clampCss).toContain('font-size: clamp(');
    expect(result.clampCss).toContain('1rem');
    expect(result.clampCss).toContain('1.5rem');
  });
});
