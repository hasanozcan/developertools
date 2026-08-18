import { describe, it, expect } from 'vitest';
import { calculateAspectRatio } from './aspectRatio';

describe('aspectRatio', () => {
  it('should simplify standard 1920x1080 to 16:9', () => {
    const result = calculateAspectRatio(1920, 1080);
    expect(result.ratioString).toBe('16:9');
    expect(result.cssAspectRatio).toBe('16 / 9');
  });

  it('should calculate scaled height proportionally', () => {
    const result = calculateAspectRatio(1920, 1080, 1280);
    expect(result.scaledWidth).toBe(1280);
    expect(result.scaledHeight).toBe(720);
  });

  it('should simplify square 1080x1080 to 1:1', () => {
    const result = calculateAspectRatio(1080, 1080);
    expect(result.ratioString).toBe('1:1');
  });
});
