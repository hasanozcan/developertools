import { describe, it, expect } from 'vitest';
import { generateCotPrompt } from './cotChainOfThoughtPromptBuilder';

describe('cotChainOfThoughtPromptBuilder', () => {
  it('generates chain of thought prompt scaffold', () => {
    expect(generateCotPrompt('Calculate ROI')).toContain('reasoning steps');
  });
});
