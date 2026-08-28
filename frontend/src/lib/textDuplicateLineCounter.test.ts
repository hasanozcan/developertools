import { describe, it, expect } from 'vitest';
import { countDuplicateLines } from './textDuplicateLineCounter';

describe('textDuplicateLineCounter', () => {
  it('counts line frequency', () => {
    const res = countDuplicateLines('a\nb\na');
    expect(res[0]).toEqual({ line: 'a', count: 2 });
  });
});
