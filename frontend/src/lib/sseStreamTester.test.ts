import { describe, it, expect } from 'vitest';
import { parseSseChunk } from './sseStreamTester';

describe('sseStreamTester', () => {
  it('parses Server-Sent Events stream chunk', () => {
    const raw = 'event: update\ndata: {"status":"running"}\n\n';
    const events = parseSseChunk(raw);
    expect(events).toHaveLength(1);
    expect(events[0].event).toBe('update');
    expect(events[0].data).toBe('{"status":"running"}');
  });
});
