import { describe, it, expect } from 'vitest';
import { convertSvgToReactNative } from './svgToReactNative';

describe('convertSvgToReactNative', () => {
  it('converts standard SVG to react-native-svg components', () => {
    const svg = '<svg width="24" height="24"><path d="M0 0h24v24H0z" stroke-width="2"/></svg>';
    const rn = convertSvgToReactNative(svg, 'CustomIcon');
    expect(rn).toContain('import Svg, { Path');
    expect(rn).toContain('export const CustomIcon');
    expect(rn).toContain('strokeWidth="2"');
  });
});