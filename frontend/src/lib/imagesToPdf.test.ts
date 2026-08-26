import { describe, expect, it } from 'vitest';
import { calculateFittedImageSize, getPageDimensions } from './imagesToPdf';

describe('imagesToPdf', () => {
  it('calculates page dimensions for A4 portrait and landscape', () => {
    const portrait = getPageDimensions('a4', 'portrait', 800, 600, 'none');
    expect(portrait.width).toBeLessThan(portrait.height);

    const landscape = getPageDimensions('a4', 'landscape', 800, 600, 'none');
    expect(landscape.width).toBeGreaterThan(landscape.height);
  });

  it('calculates auto orientation based on aspect ratio', () => {
    const wide = getPageDimensions('a4', 'auto', 1200, 800, 'small');
    expect(wide.width).toBeGreaterThan(wide.height);
    expect(wide.marginPt).toBe(20);
  });

  it('fits image inside bounds preserving ratio and centering', () => {
    const fit = calculateFittedImageSize(1000, 500, 500, 500);
    expect(fit.width).toBe(500);
    expect(fit.height).toBe(250);
    expect(fit.x).toBe(0);
    expect(fit.y).toBe(125);
  });
});
