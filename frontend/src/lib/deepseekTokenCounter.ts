export interface DeepSeekTokenResult {
  tokens: number;
  characters: number;
  words: number;
  costV3Input: number;
  costV3Output: number;
  costR1Input: number;
  costR1Output: number;
}

export function calculateDeepSeekTokens(text: string): DeepSeekTokenResult {
  const trimmed = text || '';
  const characters = trimmed.length;
  const words = trimmed.trim() ? trimmed.trim().split(/\s+/).length : 0;
  // Estimate BPE ratio for English/Code/Multilingual (~3.6 chars per token)
  const tokens = Math.max(0, Math.ceil(characters / 3.6));

  // DeepSeek V3: $0.14 per 1M input, $0.28 per 1M output
  const costV3Input = (tokens / 1000000) * 0.14;
  const costV3Output = (tokens / 1000000) * 0.28;

  // DeepSeek R1: $0.55 per 1M input, $2.19 per 1M output
  const costR1Input = (tokens / 1000000) * 0.55;
  const costR1Output = (tokens / 1000000) * 2.19;

  return {
    tokens,
    characters,
    words,
    costV3Input,
    costV3Output,
    costR1Input,
    costR1Output,
  };
}