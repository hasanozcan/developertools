import { describe, it, expect } from 'vitest';
import { buildOptimizedAgentPrompt } from './aiAgentPromptOptimizer';

describe('buildOptimizedAgentPrompt', () => {
  it('structures agent prompt with markdown sections', () => {
    const res = buildOptimizedAgentPrompt({
      role: 'Senior Code Reviewer',
      goal: 'Find concurrency and security bugs in Rust code.',
      constraints: ['Be concise', 'Always provide code fixes'],
      outputFormat: 'Markdown bullet points with diff blocks',
    });
    expect(res).toContain('## ROLE');
    expect(res).toContain('## CONSTRAINTS & BEHAVIOR');
  });
});