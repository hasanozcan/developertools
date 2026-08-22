export interface ModelfileConfig {
  baseModel: string;
  temperature: number;
  systemPrompt: string;
  template?: string;
}

export function generateOllamaModelfile(config: ModelfileConfig): string {
  return `FROM ${config.baseModel}

PARAMETER temperature ${config.temperature}
PARAMETER top_p 0.9

SYSTEM """
${config.systemPrompt.trim()}
"""
`;
}