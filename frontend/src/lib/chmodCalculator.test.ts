import { describe, expect, it } from 'vitest';
import { calculateChmod, parseChmodOctal } from './chmodCalculator';

describe('chmodCalculator', () => {
  it('calculates 755 correctly', () => {
    const res = calculateChmod({
      user: { r: true, w: true, x: true },
      group: { r: true, w: false, x: true },
      others: { r: true, w: false, x: true },
    });
    expect(res.octal).toBe('755');
    expect(res.symbolic).toBe('-rwxr-xr-x');
  });

  it('parses octal 644', () => {
    const p = parseChmodOctal('644');
    expect(p.user).toEqual({ r: true, w: true, x: false });
    expect(p.group).toEqual({ r: true, w: false, x: false });
  });
});
