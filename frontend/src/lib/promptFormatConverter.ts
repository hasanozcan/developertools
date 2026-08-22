export type PromptFormat = 'chatml' | 'anthropic' | 'llama3' | 'json';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export function parsePromptToMessages(input: string): ChatMessage[] {
  const trimmed = input.trim();
  if (!trimmed) return [];

  // Try JSON first
  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      return parsed.map((m) => ({ role: m.role || 'user', content: m.content || '' }));
    }
    if (parsed.messages && Array.isArray(parsed.messages)) {
      return parsed.messages.map((m: { role?: string; content?: string }) => ({
        role: (m.role as 'system' | 'user' | 'assistant') || 'user',
        content: m.content || '',
      }));
    }
  } catch {
    // continue to text parsing
  }

  // Parse ChatML format: <|im_start|>role ... <|im_end|>
  if (trimmed.includes('<|im_start|>')) {
    const matches = Array.from(trimmed.matchAll(/<\|im_start\|>([a-zA-Z0-9_]+)\n([\s\S]*?)<\|im_end\|>/g));
    if (matches.length > 0) {
      return matches.map((m) => ({
        role: (m[1].toLowerCase() as 'system' | 'user' | 'assistant') || 'user',
        content: m[2].trim(),
      }));
    }
  }

  // Parse Anthropic format: Human: ... Assistant: ...
  if (trimmed.includes('Human:') || trimmed.includes('Assistant:')) {
    const parts = trimmed.split(/(?=Human:|Assistant:|System:)/i);
    const messages: ChatMessage[] = [];
    for (const part of parts) {
      if (/^System:/i.test(part)) {
        messages.push({ role: 'system', content: part.replace(/^System:\s*/i, '').trim() });
      } else if (/^Human:/i.test(part)) {
        messages.push({ role: 'user', content: part.replace(/^Human:\s*/i, '').trim() });
      } else if (/^Assistant:/i.test(part)) {
        messages.push({ role: 'assistant', content: part.replace(/^Assistant:\s*/i, '').trim() });
      }
    }
    if (messages.length > 0) return messages;
  }

  return [{ role: 'user', content: trimmed }];
}

export function formatMessages(messages: ChatMessage[], targetFormat: PromptFormat): string {
  if (messages.length === 0) return '';

  if (targetFormat === 'json') {
    return JSON.stringify({ messages }, null, 2);
  }

  if (targetFormat === 'chatml') {
    return messages
      .map((m) => `<|im_start|>${m.role}\n${m.content}\n<|im_end|>`)
      .join('\n');
  }

  if (targetFormat === 'llama3') {
    return (
      '<|begin_of_text|>' +
      messages
        .map(
          (m) =>
            `<|start_header_id|>${m.role}<|end_header_id|>\n\n${m.content}<|eot_id|>`,
        )
        .join('\n')
    );
  }

  return messages
    .map((m) => {
      if (m.role === 'system') return `System: ${m.content}`;
      if (m.role === 'user') return `\n\nHuman: ${m.content}`;
      return `\n\nAssistant: ${m.content}`;
    })
    .join('')
    .trim();
}
