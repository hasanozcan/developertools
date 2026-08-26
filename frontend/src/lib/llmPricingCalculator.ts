export interface LLMModelPricing {
  id: string;
  provider: 'OpenAI' | 'Anthropic' | 'Google' | 'DeepSeek' | 'Meta' | 'Mistral';
  name: string;
  inputPerMillion: number;
  outputPerMillion: number;
  cachedInputPerMillion?: number;
  batchInputPerMillion?: number;
  batchOutputPerMillion?: number;
  contextWindow: number;
  description: string;
}

export const LLM_MODELS: LLMModelPricing[] = [
  {
    id: 'gpt-4o',
    provider: 'OpenAI',
    name: 'GPT-4o',
    inputPerMillion: 2.5,
    outputPerMillion: 10.0,
    cachedInputPerMillion: 1.25,
    batchInputPerMillion: 1.25,
    batchOutputPerMillion: 5.0,
    contextWindow: 128000,
    description: 'Flagship multimodal reasoning model for complex tasks',
  },
  {
    id: 'gpt-4o-mini',
    provider: 'OpenAI',
    name: 'GPT-4o mini',
    inputPerMillion: 0.15,
    outputPerMillion: 0.6,
    cachedInputPerMillion: 0.075,
    batchInputPerMillion: 0.075,
    batchOutputPerMillion: 0.3,
    contextWindow: 128000,
    description: 'Affordable, fast, lightweight model for high-volume tasks',
  },
  {
    id: 'o1',
    provider: 'OpenAI',
    name: 'OpenAI o1',
    inputPerMillion: 15.0,
    outputPerMillion: 60.0,
    cachedInputPerMillion: 7.5,
    contextWindow: 200000,
    description: 'Advanced reasoning model for deep math, coding, and science',
  },
  {
    id: 'o3-mini',
    provider: 'OpenAI',
    name: 'OpenAI o3-mini',
    inputPerMillion: 1.1,
    outputPerMillion: 4.4,
    cachedInputPerMillion: 0.55,
    contextWindow: 200000,
    description: 'High-speed reasoning model with STEM and coding proficiency',
  },
  {
    id: 'claude-3-5-sonnet',
    provider: 'Anthropic',
    name: 'Claude 3.5 Sonnet',
    inputPerMillion: 3.0,
    outputPerMillion: 15.0,
    cachedInputPerMillion: 0.3,
    batchInputPerMillion: 1.5,
    batchOutputPerMillion: 7.5,
    contextWindow: 200000,
    description: 'Industry-leading coding, reasoning, and visual analysis',
  },
  {
    id: 'claude-3-5-haiku',
    provider: 'Anthropic',
    name: 'Claude 3.5 Haiku',
    inputPerMillion: 0.8,
    outputPerMillion: 4.0,
    cachedInputPerMillion: 0.08,
    batchInputPerMillion: 0.4,
    batchOutputPerMillion: 2.0,
    contextWindow: 200000,
    description: 'Ultra-fast, cost-effective lightweight Claude model',
  },
  {
    id: 'claude-3-opus',
    provider: 'Anthropic',
    name: 'Claude 3 Opus',
    inputPerMillion: 15.0,
    outputPerMillion: 75.0,
    contextWindow: 200000,
    description: 'Deep contextual understanding for large-scale enterprise workflows',
  },
  {
    id: 'gemini-2-0-flash',
    provider: 'Google',
    name: 'Gemini 2.0 Flash',
    inputPerMillion: 0.1,
    outputPerMillion: 0.4,
    cachedInputPerMillion: 0.025,
    contextWindow: 1048576,
    description: 'Next-generation multimodal model with ultra-low latency & 1M context',
  },
  {
    id: 'gemini-1-5-pro',
    provider: 'Google',
    name: 'Gemini 1.5 Pro',
    inputPerMillion: 1.25,
    outputPerMillion: 5.0,
    cachedInputPerMillion: 0.3125,
    contextWindow: 2097152,
    description: 'Massive 2M token context window for complex codebases and video analysis',
  },
  {
    id: 'deepseek-v3',
    provider: 'DeepSeek',
    name: 'DeepSeek V3',
    inputPerMillion: 0.14,
    outputPerMillion: 0.28,
    cachedInputPerMillion: 0.014,
    contextWindow: 64000,
    description: 'Extreme cost-efficiency open-weights MoE model with top benchmarks',
  },
  {
    id: 'deepseek-r1',
    provider: 'DeepSeek',
    name: 'DeepSeek R1',
    inputPerMillion: 0.55,
    outputPerMillion: 2.19,
    cachedInputPerMillion: 0.14,
    contextWindow: 64000,
    description: 'Open-weights reasoning model rivaling OpenAI o1',
  },
  {
    id: 'llama-3-3-70b',
    provider: 'Meta',
    name: 'Llama 3.3 70B (Groq / Together)',
    inputPerMillion: 0.59,
    outputPerMillion: 0.79,
    contextWindow: 128000,
    description: 'Open-weights flagship Llama model hosted via fast inference providers',
  },
];

export interface CalculationInput {
  promptTokens: number;
  completionTokens: number;
  requestsPerDay: number;
  cachedPromptPercentage?: number; // 0 to 100
  isBatchMode?: boolean;
}

export interface ModelCostResult {
  model: LLMModelPricing;
  costPerRequest: number;
  costPer1kRequests: number;
  costPer1mRequests: number;
  monthlyCost: number;
}

export function calculateModelCosts(input: CalculationInput): ModelCostResult[] {
  const {
    promptTokens = 0,
    completionTokens = 0,
    requestsPerDay = 1,
    cachedPromptPercentage = 0,
    isBatchMode = false,
  } = input;

  const cachedRatio = Math.min(100, Math.max(0, cachedPromptPercentage)) / 100;
  const regularPromptRatio = 1 - cachedRatio;

  return LLM_MODELS.map((model) => {
    let inputPrice = isBatchMode && model.batchInputPerMillion !== undefined
      ? model.batchInputPerMillion
      : model.inputPerMillion;

    let outputPrice = isBatchMode && model.batchOutputPerMillion !== undefined
      ? model.batchOutputPerMillion
      : model.outputPerMillion;

    let cachedPrice = model.cachedInputPerMillion ?? inputPrice;

    const inputCost =
      (promptTokens * regularPromptRatio * inputPrice) / 1_000_000 +
      (promptTokens * cachedRatio * cachedPrice) / 1_000_000;

    const outputCost = (completionTokens * outputPrice) / 1_000_000;
    const costPerRequest = inputCost + outputCost;

    const costPer1kRequests = costPerRequest * 1_000;
    const costPer1mRequests = costPerRequest * 1_000_000;
    const monthlyCost = costPerRequest * requestsPerDay * 30;

    return {
      model,
      costPerRequest,
      costPer1kRequests,
      costPer1mRequests,
      monthlyCost,
    };
  }).sort((a, b) => a.monthlyCost - b.monthlyCost);
}
