import { describe, it, expect } from 'vitest';
import { generateBorderRadius, DEFAULT_BORDER_RADIUS, BORDER_RADIUS_PRESETS } from './cssBorderRadius';

describe('cssBorderRadius', () => {
  it('should generate 8-point asymmetric border radius value', () => {
    const res = generateBorderRadius(DEFAULT_BORDER_RADIUS);

    expect(res.value).toBe('30% 70% 70% 30% / 30% 30% 70% 70%');
    expect(res.css).toContain('border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;');
  });

  it('should generate 4-point symmetric border radius value when horizontal and vertical are equal', () => {
    const res = generateBorderRadius({
      topLeftH: 20,
      topRightH: 20,
      bottomRightH: 20,
      bottomLeftH: 20,
      topLeftV: 20,
      topRightV: 20,
      bottomRightV: 20,
      bottomLeftV: 20,
      unit: 'px',
    });

    expect(res.value).toBe('20px 20px 20px 20px');
  });

  it('should include preset styles', () => {
    expect(BORDER_RADIUS_PRESETS.length).toBeGreaterThan(2);
    expect(BORDER_RADIUS_PRESETS[0].name).toBe('Organic Blob');
  });
});
