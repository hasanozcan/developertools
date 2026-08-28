import { describe, it, expect } from 'vitest';
import { buildXmlSystemPrompt } from './systemPromptXmlBuilder';

describe('systemPromptXmlBuilder', () => {
  it('builds structured XML system prompt with guidelines and few-shot examples', () => {
    const prompt = buildXmlSystemPrompt({
      role: 'Senior TypeScript Architect',
      context: 'Building clean Next.js tools',
      instructions: ['Analyze request', 'Generate pure functions'],
      rules: ['Never use any', '100% test coverage'],
      outputFormat: 'Return markdown code blocks only.',
      examples: [{ input: 'Create sum', output: 'function sum(a,b){return a+b;}' }],
    });

    expect(prompt).toContain('<system_prompt>');
    expect(prompt).toContain('<identity_and_role>');
    expect(prompt).toContain('<strict_rules>');
    expect(prompt).toContain('<few_shot_examples>');
  });
});
