export interface ClaudeTokenResult {
  tokens: number;
  characters: number;
  words: number;
  costHaikuInput: number;
  costHaikuOutput: number;
  costSonnetInput: number;
  costSonnetOutput: number;
  costOpusInput: number;
  costOpusOutput: number;
}

export function calculateClaudeTokens(text: string): ClaudeTokenResult {
  const characters = (text || '').length;
  const words = (text || '').trim() ? (text || '').trim().split(/\s+/).length : 0;
  const tokens = Math.max(0, Math.ceil(characters / 3.8));

  return {
    tokens,
    characters,
    words,
    costHaikuInput: (tokens / 1000000) * 0.80,
    costHaikuOutput: (tokens / 1000000) * 4.00,
    costSonnetInput: (tokens / 1000000) * 3.00,
    costSonnetOutput: (tokens / 1000000) * 15.00,
    costOpusInput: (tokens / 1000000) * 15.00,
    costOpusOutput: (tokens / 1000000) * 75.00,
  };
}