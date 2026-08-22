import { describe, it, expect } from 'vitest';
import { computeSideBySideDiff } from './codeSideBySideDiff';

describe('codeSideBySideDiff', () => {
  it('computes side-by-side lines with modified flags', () => {
    const left = 'const a = 1;\nconst b = 2;';
    const right = 'const a = 1;\nconst b = 3;';
    const diff = computeSideBySideDiff(left, right);
    expect(diff).toHaveLength(2);
    expect(diff[0].isModified).toBe(false);
    expect(diff[1].isModified).toBe(true);
  });
});
