import { describe, it, expect } from 'vitest';
import { formatWsPayload } from './websocketTester';

describe('websocketTester', () => {
  it('formats WebSocket JSON payload with proper indentation', () => {
    const raw = '{"type":"ping","id":123}';
    const formatted = formatWsPayload(raw);
    expect(formatted).toContain('"type": "ping"');
  });
});
