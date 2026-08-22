import { describe, it, expect } from 'vitest';
import { chunkDocument } from './ragChunkingVisualizer';

describe('chunkDocument', () => {
  it('splits text with overlap', () => {
    const text = 'This is a comprehensive document for RAG semantic vector search indexing and chunking visual testing.';
    const chunks = chunkDocument(text, 40, 10);
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks[0].charStart).toBe(0);
  });
});