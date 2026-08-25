import { describe, expect, it } from 'vitest';
import { convertToVercelCoreMessages } from './vercelAiCoreMessageConverter';

describe('vercelAiCoreMessageConverter', () => {
  it('converts OpenAI messages to Vercel CoreMessage array', () => {
    const input = JSON.stringify([
      { role: 'user', content: 'What is Next.js?' },
      { role: 'assistant', content: 'Next.js is a React framework.' }
    ]);
    const res = convertToVercelCoreMessages(input);
    expect(res.messages).toHaveLength(2);
    expect(res.code).toContain('CoreMessage[]');
  });
});
