import { describe, it, expect } from 'vitest';
import { convertSvgToAndroidVector } from './svgToAndroidVector';

describe('svgToAndroidVector', () => {
  it('converts SVG to Android Vector XML', () => {
    expect(convertSvgToAndroidVector('<svg><path d="M0 0" /></svg>')).toContain('<vector');
  });
});
