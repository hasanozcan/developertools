export const CLAUDE_PRICING = {
  verifiedOn: '2026-10-11',
  source: 'https://platform.claude.com/docs/en/about-claude/pricing',
  tokenCountingSource: 'https://platform.claude.com/docs/en/build-with-claude/token-counting',
  // Standard first-party API USD / million tokens. Update this dated snapshot and
  // boundary tests together; caching, batch, tools and other surcharges are excluded.
  models: [
    { id: 'claude-sonnet-5-5', name: 'Claude Sonnet 5.5', input: 2, output: 10 },
    {
      id: 'claude-haiku-5-5',
      name: 'Claude Haiku 5.5',
      input: 0.1,
      output: 0.5,
      longPrompt: { aboveInputTokens: 100_000, input: 0.5, output: 2.5 },
    },
    { id: 'claude-opus-5-5', name: 'Claude Opus 5.5', input: 4, output: 20 },
    { id: 'claude-fable-5-1', name: 'Claude Fable 5.1', input: 10, output: 50 },
  ],
} as const;

export type ClaudeModelId = (typeof CLAUDE_PRICING.models)[number]['id'];
export const DEFAULT_CLAUDE_MODEL: ClaudeModelId = 'claude-sonnet-5-5';
// Current selected models all support up to 128K output tokens (models overview).
export const MAX_CLAUDE_OUTPUT_TOKENS = 128_000;

export function parseClaudeOutputTokens(value: string): number | null {
  if (!/^\d+$/.test(value)) return null;
  const tokens = Number(value);
  return Number.isSafeInteger(tokens) && tokens <= MAX_CLAUDE_OUTPUT_TOKENS ? tokens : null;
}

export interface ClaudeTokenResult {
  inputTokens: number;
  outputTokens: number;
  characters: number;
  words: number;
  inputRate: number;
  outputRate: number;
  inputCost: number;
  outputCost: number;
  totalCost: number;
}

export function calculateClaudeTokens(
  text: string,
  modelId: ClaudeModelId = DEFAULT_CLAUDE_MODEL,
  outputTokens = 0,
): ClaudeTokenResult {
  const model = CLAUDE_PRICING.models.find(({ id }) => id === modelId);
  if (!model) throw new RangeError('Unknown Claude model');
  if (
    !Number.isSafeInteger(outputTokens) ||
    outputTokens < 0 ||
    outputTokens > MAX_CLAUDE_OUTPUT_TOKENS
  ) {
    throw new RangeError('Invalid expected output token count');
  }
  // Deliberately a local heuristic, NOT Anthropic's tokenizer or count_tokens API.
  // UTF-16 code units preserve the original approximation, including whitespace.
  const characters = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const inputTokens = Math.ceil(characters / 3.8);
  const rates =
    'longPrompt' in model && inputTokens > model.longPrompt.aboveInputTokens
      ? model.longPrompt
      : model;
  const inputCost = (inputTokens * rates.input) / 1_000_000;
  const outputCost = (outputTokens * rates.output) / 1_000_000;
  return {
    inputTokens,
    outputTokens,
    characters,
    words,
    inputRate: rates.input,
    outputRate: rates.output,
    inputCost,
    outputCost,
    totalCost: inputCost + outputCost,
  };
}
