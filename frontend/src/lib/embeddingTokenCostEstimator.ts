export function estimateEmbeddingCost(totalTokens: number): { textEmbedding3Small: number; textEmbedding3Large: number; voyage3: number } {
  return {
    textEmbedding3Small: (totalTokens / 1_000_000) * 0.02,
    textEmbedding3Large: (totalTokens / 1_000_000) * 0.13,
    voyage3: (totalTokens / 1_000_000) * 0.12
  };
}
