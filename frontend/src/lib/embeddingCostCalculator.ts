export interface EmbeddingModelConfig {
  id: string;
  name: string;
  provider: string;
  pricePerMillionTokens: number;
  dimensions: number;
  maxTokens: number;
}

export const EMBEDDING_MODELS: EmbeddingModelConfig[] = [
  { id: 'text-embedding-3-small', name: 'OpenAI text-embedding-3-small', provider: 'OpenAI', pricePerMillionTokens: 0.02, dimensions: 1536, maxTokens: 8191 },
  { id: 'text-embedding-3-large', name: 'OpenAI text-embedding-3-large', provider: 'OpenAI', pricePerMillionTokens: 0.13, dimensions: 3072, maxTokens: 8191 },
  { id: 'text-embedding-ada-002', name: 'OpenAI text-embedding-ada-002', provider: 'OpenAI', pricePerMillionTokens: 0.10, dimensions: 1536, maxTokens: 8191 },
  { id: 'embed-english-v3.0', name: 'Cohere embed-english-v3.0', provider: 'Cohere', pricePerMillionTokens: 0.10, dimensions: 1024, maxTokens: 512 },
  { id: 'voyage-3', name: 'Voyage AI voyage-3', provider: 'Voyage AI', pricePerMillionTokens: 0.12, dimensions: 1024, maxTokens: 32000 },
  { id: 'gemini-embedding-001', name: 'Google text-embedding-004', provider: 'Google', pricePerMillionTokens: 0.025, dimensions: 768, maxTokens: 2048 },
];

export function calculateEmbeddingCost(tokenCount: number, modelId: string) {
  const model = EMBEDDING_MODELS.find(m => m.id === modelId) || EMBEDDING_MODELS[0];
  const cost = (tokenCount / 1_000_000) * model.pricePerMillionTokens;
  const vectorStorageBytes = tokenCount > 0 ? model.dimensions * 4 : 0; // 4 bytes per float32
  return {
    model,
    tokenCount,
    estimatedCostUsd: cost,
    dimensions: model.dimensions,
    vectorStorageBytes,
    vectorStorageKb: (vectorStorageBytes / 1024).toFixed(2),
  };
}
