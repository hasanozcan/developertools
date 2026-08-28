import { describe, it, expect } from 'vitest';
import { splitTextColumns } from './textColumnTabularSplitter';

describe('textColumnTabularSplitter', () => {
  it('splits delimited text into tabular arrays', () => {
    expect(splitTextColumns('a,b,c\n1,2,3')).toEqual([['a', 'b', 'c'], ['1', '2', '3']]);
  });
});
