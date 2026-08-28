import { describe, it, expect } from 'vitest';
import { generateElevationShadows } from './css3dBoxShadowGenerator';

describe('css3dBoxShadowGenerator', () => {
  it('generates multi-layer shadow declaration for elevation 6', () => {
    const css = generateElevationShadows(6, '15, 23, 42', 0.2);
    expect(css).toContain('box-shadow:');
    expect(css).toContain('rgba(15, 23, 42, 0.200)');
  });
});
