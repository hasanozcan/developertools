export interface LlmModelComparison {
  id: string;
  name: string;
  provider: 'OpenAI' | 'Anthropic' | 'Google' | 'DeepSeek';
  estimatedTokens: number;
  inputCostPer1M: number;
  outputCostPer1M: number;
  totalInputCost: number;
  contextWindow: string;
}

const MODELS_DATA = [
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI' as const, inputRate: 2.5, outputRate: 10.0, context: '128K' },
  { id: 'gpt-4o-mini', name: 'GPT-4o mini', provider: 'OpenAI' as const, inputRate: 0.15, outputRate: 0.6, context: '128K' },
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic' as const, inputRate: 3.0, outputRate: 15.0, context: '200K' },
  { id: 'claude-3-5-haiku', name: 'Claude 3.5 Haiku', provider: 'Anthropic' as const, inputRate: 0.8, outputRate: 4.0, context: '200K' },
  { id: 'gemini-1-5-pro', name: 'Gemini 1.5 Pro', provider: 'Google' as const, inputRate: 1.25, outputRate: 5.0, context: '2M' },
  { id: 'gemini-1-5-flash', name: 'Gemini 1.5 Flash', provider: 'Google' as const, inputRate: 0.075, outputRate: 0.3, context: '1M' },
  { id: 'deepseek-v3', name: 'DeepSeek V3', provider: 'DeepSeek' as const, inputRate: 0.14, outputRate: 0.28, context: '64K' },
  { id: 'deepseek-r1', name: 'DeepSeek R1 (Reasoning)', provider: 'DeepSeek' as const, inputRate: 0.55, outputRate: 2.19, context: '64K' },
];

export function compareLlmCosts(text: string): { wordCount: number; charCount: number; models: LlmModelComparison[] } {
  const clean = text || '';
  const charCount = clean.length;
  const wordCount = clean.trim() ? clean.trim().split(/\s+/).length : 0;
  const estimatedTokens = Math.max(1, Math.round(charCount / 3.75));

  const models: LlmModelComparison[] = MODELS_DATA.map((m) => {
    const totalInputCost = (estimatedTokens / 1_000_000) * m.inputRate;
    return {
      id: m.id,
      name: m.name,
      provider: m.provider,
      estimatedTokens,
      inputCostPer1M: m.inputRate,
      outputCostPer1M: m.outputRate,
      totalInputCost,
      contextWindow: m.context,
    };
  });

  return {
    wordCount,
    charCount,
    models,
  };
}
