import { describe, it, expect } from 'vitest';
import { calculateSpecificity, compareSpecificity } from './cssSpecificityCalculator';

describe('cssSpecificityCalculator', () => {
  it('calculates specificity tuple correctly', () => {
    const sel = '#nav .menu-item > a:hover';
    const score = calculateSpecificity(sel);
    expect(score.a).toBe(1); // #nav
    expect(score.b).toBe(2); // .menu-item, :hover
    expect(score.c).toBe(1); // a
    expect(score.formatted).toBe('(1, 2, 1)');
  });

  it('determines winner when comparing two CSS selectors', () => {
    const comp = compareSpecificity('#main .card', 'div.card > span');
    expect(comp.winner).toBe('A');
  });
});
