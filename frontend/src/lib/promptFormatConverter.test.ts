import { describe, it, expect } from 'vitest';
import { parsePromptToMessages, formatMessages } from './promptFormatConverter';

describe('promptFormatConverter', () => {
  it('converts Anthropic format to ChatML and Llama 3 format', () => {
    const input = 'System: You are an expert.\n\nHuman: Write code.\n\nAssistant: Here is code.';
    const msgs = parsePromptToMessages(input);
    expect(msgs).toHaveLength(3);
    expect(msgs[0].role).toBe('system');

    const chatml = formatMessages(msgs, 'chatml');
    expect(chatml).toContain('<|im_start|>system');
    expect(chatml).toContain('<|im_start|>user');

    const llama = formatMessages(msgs, 'llama3');
    expect(llama).toContain('<|start_header_id|>system<|end_header_id|>');
  });
});
