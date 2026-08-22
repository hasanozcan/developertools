import { describe, it, expect } from 'vitest';
import { inspectMcpMessage } from './mcpInspector';

describe('inspectMcpMessage', () => {
  it('validates standard MCP request', () => {
    const raw = JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list',
      params: {}
    });
    const res = inspectMcpMessage(raw);
    expect(res.isValid).toBe(true);
    expect(res.type).toBe('request');
    expect(res.method).toBe('tools/list');
  });
});