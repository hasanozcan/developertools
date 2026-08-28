import { describe, it, expect } from 'vitest';
import { matchesCaret } from './semverRangeEvaluator';

describe('semverRangeEvaluator', () => {
  it('checks caret compatibility', () => {
    expect(matchesCaret('1.2.0', '1.9.3')).toBe(true);
    expect(matchesCaret('1.2.0', '2.0.0')).toBe(false);
  });
});
