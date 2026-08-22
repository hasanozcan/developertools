export interface AgentPromptConfig {
  role: string;
  goal: string;
  constraints: string[];
  outputFormat: string;
}

export function buildOptimizedAgentPrompt(config: AgentPromptConfig): string {
  return `# SYSTEM INSTRUCTIONS & AGENT PERSONA

## ROLE
${config.role.trim()}

## OBJECTIVE & GOAL
${config.goal.trim()}

## CONSTRAINTS & BEHAVIOR
${config.constraints.map(c => `- ${c}`).join('\n')}

## EXPECTED OUTPUT FORMAT
${config.outputFormat.trim()}
`;
}