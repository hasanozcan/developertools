import { describe, it, expect } from 'vitest';
import { calculateWcagContrast } from './contrastRatioApcaCalculator';

describe('contrastRatioApcaCalculator', () => {
  it('calculates WCAG contrast ratio', () => {
    expect(calculateWcagContrast(1.0, 0.0)).toBe(21);
  });
});
