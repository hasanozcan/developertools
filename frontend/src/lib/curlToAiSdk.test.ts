import { describe, expect, it } from 'vitest';
import { curlToAiSdk } from './curlToAiSdk';

describe('curlToAiSdk', () => {
  it('converts to openai sdk call', () => {
    const curl = 'curl https://api.openai.com/v1/chat/completions -d "{\"model\":\"gpt-4o\",\"messages\":[{\"role\":\"user\",\"content\":\"hi\"}]}"';
    const code = curlToAiSdk(curl, 'openai');
    expect(code).toContain("import OpenAI from 'openai'");
    expect(code).toContain("model: 'gpt-4o'");
  });

  it('converts to anthropic sdk call', () => {
    const curl = 'curl https://api.anthropic.com/v1/messages -d "{\"model\":\"claude-3-5-sonnet\",\"messages\":[]}"';
    const code = curlToAiSdk(curl, 'anthropic');
    expect(code).toContain("import Anthropic from '@anthropic-ai/sdk'");
  });
});
