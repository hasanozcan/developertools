import { describe, it, expect } from 'vitest';
import { generateIsometricCss } from './cssIsometricGridGenerator';

describe('cssIsometricGridGenerator', () => {
  it('generates isometric transform CSS', () => {
    expect(generateIsometricCss()).toContain('rotateX(60deg)');
  });
});
