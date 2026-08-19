import { describe, it, expect } from 'vitest';
import { analyzePasswordStrength } from './passwordStrength';

describe('passwordStrength', () => {
  it('should identify weak passwords', () => {
    const weak = analyzePasswordStrength('123456');
    expect(weak.score).toBe(0);
    expect(weak.hasDigits).toBe(true);
    expect(weak.hasUpper).toBe(false);
  });

  it('should identify strong complex passwords', () => {
    const strong = analyzePasswordStrength('K9#mQ!8z$vL2@pX0');
    expect(strong.score).toBe(4);
    expect(strong.entropy).toBeGreaterThan(80);
    expect(strong.hasSymbols).toBe(true);
  });
});
