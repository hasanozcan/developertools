import { describe, expect, it } from 'vitest';
import { generateLangGraphState } from './langgraphStateGenerator';

describe('langgraphStateGenerator', () => {
  it('generates python TypedDict state with add_messages', () => {
    const code = generateLangGraphState('Agent', [
      { name: 'messages', type: 'messages' },
      { name: 'user_id', type: 'str' },
    ], 'python');
    expect(code).toContain('class AgentState(TypedDict):');
    expect(code).toContain('add_messages');
  });
});
