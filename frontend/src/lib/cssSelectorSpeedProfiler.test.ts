import { describe, it, expect } from 'vitest';
import { calculateSpecificity } from './cssSelectorSpeedProfiler';

describe('cssSelectorSpeedProfiler', () => {
  it('calculates CSS specificity triplet', () => {
    expect(calculateSpecificity('#main .card p')).toEqual([1, 1, 1]);
  });
});
