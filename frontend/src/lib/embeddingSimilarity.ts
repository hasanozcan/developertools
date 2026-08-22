export function parseVector(str: string): number[] {
  const cleaned = str.replace(/[\[\]()\n\r]/g, ' ').trim();
  if (!cleaned) return [];
  return cleaned
    .split(/[,\s]+/)
    .map((v) => parseFloat(v.trim()))
    .filter((v) => !isNaN(v));
}

export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length === 0 || vecB.length === 0 || vecA.length !== vecB.length) {
    throw new Error('Vectors must be non-empty and of identical length');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;
  return dotProduct / denominator;
}

export function euclideanDistance(vecA: number[], vecB: number[]): number {
  if (vecA.length === 0 || vecB.length === 0 || vecA.length !== vecB.length) {
    throw new Error('Vectors must be non-empty and of identical length');
  }

  let sum = 0;
  for (let i = 0; i < vecA.length; i++) {
    const diff = vecA[i] - vecB[i];
    sum += diff * diff;
  }
  return Math.sqrt(sum);
}

export function dotProduct(vecA: number[], vecB: number[]): number {
  if (vecA.length === 0 || vecB.length === 0 || vecA.length !== vecB.length) {
    throw new Error('Vectors must be non-empty and of identical length');
  }
  return vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
}
