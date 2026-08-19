import { describe, it, expect } from 'vitest';
import { generateNeumorphismCss, DEFAULT_NEUMORPHISM, hexToRgb } from './cssNeumorphism';

describe('cssNeumorphism', () => {
  it('should parse hex to rgb accurately', () => {
    const rgb = hexToRgb('#ffffff');
    expect(rgb.r).toBe(255);
    expect(rgb.g).toBe(255);
    expect(rgb.b).toBe(255);
  });

  it('should generate flat dual-shadow neumorphism CSS', () => {
    const res = generateNeumorphismCss(DEFAULT_NEUMORPHISM);
    expect(res.boxShadow).toContain('12px 12px 24px');
    expect(res.boxShadow).toContain('-12px -12px 24px');
    expect(res.css).toContain('border-radius: 30px;');
  });

  it('should generate inset shadow for pressed state', () => {
    const res = generateNeumorphismCss({
      ...DEFAULT_NEUMORPHISM,
      shape: 'pressed',
    });
    expect(res.boxShadow).toContain('inset 12px 12px');
    expect(res.boxShadow).toContain('inset -12px -12px');
  });
});
