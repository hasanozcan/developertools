import { describe, it, expect } from 'vitest';
import { sortJsonKeys } from './jsonKeySorter';

describe('jsonKeySorter', () => {
  it('sorts keys alphabetically', () => {
    const res = sortJsonKeys({ z: 1, a: 2 });
    expect(Object.keys(res)).toEqual(['a', 'z']);
  });
});
