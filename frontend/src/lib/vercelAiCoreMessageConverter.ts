export interface CoreMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
}

export function convertToVercelCoreMessages(input: string): { messages: CoreMessage[]; code: string } {
  let parsed: any;
  try {
    parsed = JSON.parse(input);
  } catch {
    // If text lines format: "User: hello\nAssistant: hi"
    const lines = input.split('\n').filter(Boolean);
    const messages: CoreMessage[] = [];
    for (const line of lines) {
      if (line.toLowerCase().startsWith('user:')) {
        messages.push({ role: 'user', content: line.slice(5).trim() });
      } else if (line.toLowerCase().startsWith('assistant:') || line.toLowerCase().startsWith('bot:')) {
        messages.push({ role: 'assistant', content: line.slice(line.indexOf(':') + 1).trim() });
      } else if (line.toLowerCase().startsWith('system:')) {
        messages.push({ role: 'system', content: line.slice(7).trim() });
      } else {
        messages.push({ role: 'user', content: line.trim() });
      }
    }
    return {
      messages,
      code: `import { CoreMessage } from 'ai';\n\nexport const messages: CoreMessage[] = ${JSON.stringify(messages, null, 2)};`
    };
  }

  const rawMessages = Array.isArray(parsed) ? parsed : (parsed.messages || [parsed]);
  const messages: CoreMessage[] = rawMessages.map((m: any) => ({
    role: (['system', 'user', 'assistant', 'tool'].includes(m.role) ? m.role : 'user') as CoreMessage['role'],
    content: typeof m.content === 'string' ? m.content : JSON.stringify(m.content),
  }));

  return {
    messages,
    code: `import { CoreMessage } from 'ai';\n\nexport const messages: CoreMessage[] = ${JSON.stringify(messages, null, 2)};`
  };
}
