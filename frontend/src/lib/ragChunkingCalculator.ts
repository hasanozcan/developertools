export interface ChunkResult {
  chunkIndex: number;
  text: string;
  charCount: number;
  estimatedTokens: number;
}

export function chunkText(text: string, chunkSize: number = 500, overlap: number = 50): ChunkResult[] {
  if (!text || text.length === 0) return [];
  const safeSize = Math.max(50, chunkSize);
  const safeOverlap = Math.min(safeSize - 10, Math.max(0, overlap));
  const step = safeSize - safeOverlap;

  const chunks: ChunkResult[] = [];
  let index = 0;

  for (let i = 0; i < text.length; i += step) {
    const chunkText = text.slice(i, i + safeSize);
    chunks.push({
      chunkIndex: index++,
      text: chunkText,
      charCount: chunkText.length,
      estimatedTokens: Math.ceil(chunkText.length / 4),
    });
    if (i + safeSize >= text.length) break;
  }

  return chunks;
}

export function estimateEmbeddingCost(totalTokens: number, costPer1M: number = 0.02): number {
  return (totalTokens / 1_000_000) * costPer1M;
}
