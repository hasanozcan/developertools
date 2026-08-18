import { describe, it, expect } from 'vitest';
import { generateCssTriangle } from './cssTriangle';

describe('cssTriangle', () => {
  it('should generate top pointing triangle CSS', () => {
    const result = generateCssTriangle({
      direction: 'top',
      width: 60,
      height: 40,
      color: '#6366F1',
    });

    expect(result.css).toContain('width: 0;');
    expect(result.css).toContain('height: 0;');
    expect(result.css).toContain('border-style: solid;');
    expect(result.css).toContain('border-width: 0 30px 40px 30px;');
    expect(result.css).toContain('border-color: transparent transparent #6366F1 transparent;');
  });

  it('should generate bottom pointing triangle CSS', () => {
    const result = generateCssTriangle({
      direction: 'bottom',
      width: 50,
      height: 25,
      color: '#000000',
    });

    expect(result.css).toContain('border-width: 25px 25px 0 25px;');
  });
});
