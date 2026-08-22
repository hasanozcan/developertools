import { describe, it, expect } from 'vitest';
import { formatPromptTemplate } from './promptTemplateFormatter';

describe('promptTemplateFormatter', () => {
  it('interpolates variables in {{var}} and {var} template formats', () => {
    const template = 'You are a {{role}} assistant. Help with {topic}.';
    const result = formatPromptTemplate(template, {
      role: 'coding',
      topic: 'TypeScript',
    });

    expect(result.rendered).toBe('You are a coding assistant. Help with TypeScript.');
    expect(result.missingVariables).toEqual([]);
  });
});
