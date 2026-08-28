import { describe, it, expect } from 'vitest';
import { chunkJsonArray } from './jsonArraySplitterChunker';

describe('jsonArraySplitterChunker', () => {
  it('splits array into batches', () => {
    expect(chunkJsonArray([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });
});
