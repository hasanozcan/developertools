export interface DocumentChunk {
  index: number;
  text: string;
  charStart: number;
  charEnd: number;
  wordCount: number;
}

export function chunkDocument(text: string, chunkSize: number = 200, overlap: number = 40): DocumentChunk[] {
  if (!text || chunkSize <= 0) return [];
  const safeOverlap = Math.min(overlap, Math.floor(chunkSize / 2));
  const step = Math.max(1, chunkSize - safeOverlap);
  const chunks: DocumentChunk[] = [];
  let index = 0;

  for (let i = 0; i < text.length; i += step) {
    const chunkText = text.slice(i, i + chunkSize);
    if (!chunkText.trim()) continue;
    chunks.push({
      index: index++,
      text: chunkText,
      charStart: i,
      charEnd: i + chunkText.length,
      wordCount: chunkText.trim().split(/\s+/).length,
    });
    if (i + chunkSize >= text.length) break;
  }

  return chunks;
}