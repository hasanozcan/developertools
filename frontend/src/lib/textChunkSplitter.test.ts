import { describe, it, expect } from 'vitest';
import { splitTextIntoChunks } from './textChunkSplitter';

describe('textChunkSplitter', () => {
  it('splits text into overlapping chunks', () => {
    const text = 'Sentence one. Sentence two. Sentence three. Sentence four.';
    const chunks = splitTextIntoChunks(text, { chunkSize: 25, chunkOverlap: 5 });
    expect(chunks.length).toBeGreaterThan(1);
  });
});
