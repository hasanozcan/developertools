import { describe, it, expect } from 'vitest';
import { getBreakpoint } from './viewportSizeTester';

describe('viewportSizeTester', () => {
  it('classifies viewport widths', () => {
    expect(getBreakpoint(375)).toBe('xs (Mobile)');
  });
});
