import { describe, it, expect } from 'vitest';
import { formatFewShotPrompt } from './llmFewShotPromptFormatter';

describe('llmFewShotPromptFormatter', () => {
  it('formats few shot prompts', () => {
    expect(formatFewShotPrompt('Translate', [{ input: 'Hi', output: 'Selam' }])).toContain('Example 1:');
  });
});
