import { describe, expect, it } from 'vitest';
import {
  simulateAchromatopsia,
  simulateAllColorBlindness,
  simulateDeuteranopia,
  simulateProtanopia,
  simulateTritanopia,
} from './colorBlindnessSimulator';

describe('colorBlindnessSimulator', () => {
  it('applies Vienot sRGB->LMS CVD matrices instead of returning input unchanged', () => {
    expect(simulateProtanopia('#ff0000')).not.toBe('#ff0000');
    expect(simulateProtanopia('#ff0000')).toBe('#737300');
    expect(simulateDeuteranopia('#00ff00')).toBe('#d6d62e');
    expect(simulateTritanopia('#0000ff')).toBe('#006363');
    expect(simulateAchromatopsia('#ff0000')).toBe('#7f7f7f');
  });

  it('preserves neutral white, black, and gray anchors', () => {
    for (const neutral of ['#ffffff', '#000000', '#808080']) {
      const all = simulateAllColorBlindness(neutral);
      expect(all.protanopia).toBe(neutral);
      expect(all.deuteranopia).toBe(neutral);
      expect(all.tritanopia).toBe(neutral);
      expect(all.achromatopsia).toBe(neutral);
    }
  });

  it('normalizes 3-digit hex and throws on invalid hex input', () => {
    expect(simulateProtanopia('f00')).toBe('#737300');
    expect(() => simulateProtanopia('not-a-color')).toThrow(/valid hex/i);
  });
});
