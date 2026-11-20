import { describe, expect, it } from 'vitest';
import { sortJsonKeys } from './jsonKeySorter';

describe('jsonKeySorter', () => {
  it('sorts keys alphabetically ascending and descending', () => {
    const asc = sortJsonKeys({ z: 1, a: 2, m: { y: 1, b: 2 } }) as Record<string, unknown>;
    expect(Object.keys(asc)).toEqual(['a', 'm', 'z']);
    expect(Object.keys(asc.m as Record<string, unknown>)).toEqual(['b', 'y']);

    const desc = sortJsonKeys({ z: 1, a: 2, m: { y: 1, b: 2 } }, 'desc') as Record<string, unknown>;
    expect(Object.keys(desc)).toEqual(['z', 'm', 'a']);
    expect(Object.keys(desc.m as Record<string, unknown>)).toEqual(['y', 'b']);
  });

  it('recursively sorts objects inside arrays', () => {
    const res = sortJsonKeys([{ b: 1, a: 2 }]) as Array<Record<string, unknown>>;
    expect(Object.keys(res[0])).toEqual(['a', 'b']);
  });
});
