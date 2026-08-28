import { describe, it, expect } from 'vitest';
import { generateRibbonCss } from './cssRibbonBannerGenerator';

describe('cssRibbonBannerGenerator', () => {
  it('generates corner ribbon CSS', () => {
    expect(generateRibbonCss('NEW')).toContain('transform: rotate(45deg);');
  });
});
