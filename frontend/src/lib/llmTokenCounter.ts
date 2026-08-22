export interface ModelPricing {
  name: string;
  provider: string;
  inputCostPer1M: number;
  outputCostPer1M: number;
}

export const MODEL_PRICING_TABLE: Record<string, ModelPricing> = {
  'gpt-4o': { name: 'GPT-4o', provider: 'OpenAI', inputCostPer1M: 2.5, outputCostPer1M: 10.0 },
  'gpt-4o-mini': { name: 'GPT-4o Mini', provider: 'OpenAI', inputCostPer1M: 0.15, outputCostPer1M: 0.6 },
  'claude-3-5-sonnet': { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', inputCostPer1M: 3.0, outputCostPer1M: 15.0 },
  'claude-3-haiku': { name: 'Claude 3 Haiku', provider: 'Anthropic', inputCostPer1M: 0.25, outputCostPer1M: 1.25 },
  'gemini-1-5-pro': { name: 'Gemini 1.5 Pro', provider: 'Google', inputCostPer1M: 1.25, outputCostPer1M: 5.0 },
  'gemini-1-5-flash': { name: 'Gemini 1.5 Flash', provider: 'Google', inputCostPer1M: 0.075, outputCostPer1M: 0.3 },
  'llama-3-70b': { name: 'Llama 3.1 70B', provider: 'Open Source', inputCostPer1M: 0.59, outputCostPer1M: 0.79 },
};

export function estimateTokens(text: string): {
  tokens: number;
  characters: number;
  words: number;
  lines: number;
} {
  if (!text) {
    return { tokens: 0, characters: 0, words: 0, lines: 0 };
  }

  const characters = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text.split(/\r\n|\r|\n/).length;

  const parts = text.match(/[\w]+|[^\s\w]|\s+/g) || [];
  let tokenCount = 0;

  for (const part of parts) {
    if (/^\s+$/.test(part)) {
      tokenCount += Math.ceil(part.length / 4);
    } else if (part.length <= 4) {
      tokenCount += 1;
    } else {
      tokenCount += Math.ceil(part.length / 3.8);
    }
  }

  return {
    tokens: Math.max(1, tokenCount),
    characters,
    words,
    lines,
  };
}

export function estimateCost(
  tokens: number,
  modelKey: string,
  isOutput = false,
): { costUSD: number; formattedCost: string } {
  const model = MODEL_PRICING_TABLE[modelKey] || MODEL_PRICING_TABLE['gpt-4o'];
  const costPerMillion = isOutput ? model.outputCostPer1M : model.inputCostPer1M;
  const costUSD = (tokens / 1_000_000) * costPerMillion;

  let formattedCost = `$${costUSD.toFixed(6)}`;
  if (costUSD >= 0.01) {
    formattedCost = `$${costUSD.toFixed(4)}`;
  }

  return { costUSD, formattedCost };
}
