import { describe, it, expect } from 'vitest';
import { convertPxToUnits, convertRemToPx } from './pxToRem';

describe('pxToRem unit converter', () => {
  it('converts 16px to 1rem with base 16', () => {
    const result = convertPxToUnits(16, 16);
    expect(result.rem).toBe('1rem');
    expect(result.em).toBe('1em');
    expect(result.percent).toBe('100%');
    expect(result.pt).toBe('12pt');
  });

  it('converts 24px with custom base font size 10', () => {
    const result = convertPxToUnits(24, 10);
    expect(result.rem).toBe('2.4rem');
  });

  it('converts rem back to px accurately', () => {
    expect(convertRemToPx(1.5, 16)).toBe(24);
    expect(convertRemToPx(2, 10)).toBe(20);
  });
});
