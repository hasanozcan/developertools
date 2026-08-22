export interface ChunkOptions {
  chunkSize: number;
  chunkOverlap: number;
  splitBy: 'characters' | 'words' | 'paragraphs';
}

export interface ChunkItem {
  index: number;
  text: string;
  charCount: number;
  wordCount: number;
}

export function splitTextIntoChunks(
  text: string,
  options: Partial<ChunkOptions> = {},
): ChunkItem[] {
  const {
    chunkSize = 500,
    chunkOverlap = 100,
    splitBy = 'characters',
  } = options;

  if (!text || text.trim() === '') {
    return [];
  }

  const safeSize = Math.max(10, chunkSize);
  const safeOverlap = Math.min(safeSize - 1, Math.max(0, chunkOverlap));
  const chunks: string[] = [];

  if (splitBy === 'paragraphs') {
    const paragraphs = text.split(/\n\s*\n+/).map((p) => p.trim()).filter(Boolean);
    let currentChunk = '';
    for (const p of paragraphs) {
      if ((currentChunk + '\n\n' + p).trim().length > safeSize && currentChunk) {
        chunks.push(currentChunk.trim());
        currentChunk = p;
      } else {
        currentChunk = currentChunk ? currentChunk + '\n\n' + p : p;
      }
    }
    if (currentChunk) chunks.push(currentChunk.trim());
  } else if (splitBy === 'words') {
    const words = text.trim().split(/\s+/);
    const step = Math.max(1, safeSize - safeOverlap);
    for (let i = 0; i < words.length; i += step) {
      const slice = words.slice(i, i + safeSize);
      if (slice.length > 0) {
        chunks.push(slice.join(' '));
      }
    }
  } else {
    const step = Math.max(1, safeSize - safeOverlap);
    for (let i = 0; i < text.length; i += step) {
      const chunk = text.slice(i, i + safeSize);
      if (chunk) {
        chunks.push(chunk);
      }
      if (i + safeSize >= text.length) break;
    }
  }

  return chunks.map((c, idx) => ({
    index: idx + 1,
    text: c,
    charCount: c.length,
    wordCount: c.trim().split(/\s+/).length,
  }));
}
