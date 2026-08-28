import { describe, it, expect } from 'vitest';
import { convertSvgToSwiftuiShape } from './svgToSwiftuiShape';

describe('svgToSwiftuiShape', () => {
  it('converts SVG to SwiftUI Shape', () => {
    expect(convertSvgToSwiftuiShape('<svg></svg>', 'Logo')).toContain('struct Logo: Shape');
  });
});
