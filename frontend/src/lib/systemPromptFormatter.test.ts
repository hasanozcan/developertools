import { describe, it, expect } from 'vitest';
import { generateStructuredSystemPrompt } from './systemPromptFormatter';

describe('systemPromptFormatter', () => {
  it('formats structured markdown system prompt with role and instructions', () => {
    const prompt = generateStructuredSystemPrompt({
      roleTitle: 'a Senior Next.js Developer',
      context: 'Building clean responsive web apps.',
      guidelines: ['Use App Router', 'Ensure strict TypeScript'],
      outputFormat: 'Return only TypeScript code in fences.',
      examples: [{ input: 'Create button', output: 'export function Button()...' }],
    });

    expect(prompt).toContain('# ROLE & OBJECTIVE');
    expect(prompt).toContain('- Use App Router');
    expect(prompt).toContain('<example id="1">');
  });
});
