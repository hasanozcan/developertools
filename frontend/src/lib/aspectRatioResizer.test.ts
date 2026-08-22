import { describe, it, expect } from 'vitest';
import { calculateAspectRatioDimensions } from './aspectRatioResizer';

describe('calculateAspectRatioDimensions', () => {
  it('calculates 16:9 ratio and resizes dimensions', () => {
    const res = calculateAspectRatioDimensions(1920, 1080, 1280);
    expect(res.ratioString).toBe('16:9');
    expect(res.height).toBe(720);
  });
});