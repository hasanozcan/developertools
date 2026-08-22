import { describe, it, expect } from 'vitest';
import { parseHarFile } from './harViewer';

describe('harViewer', () => {
  it('parses HTTP Archive (HAR) JSON data', () => {
    const har = JSON.stringify({
      log: {
        pages: [{ id: 'page_1' }],
        entries: [
          { request: { method: 'GET', url: 'https://example.com' }, response: { status: 200, bodySize: 1024 }, time: 45 },
        ],
      },
    });

    const res = parseHarFile(har);
    expect(res.entriesCount).toBe(1);
    expect(res.requests[0].status).toBe(200);
    expect(res.totalBytes).toBe(1024);
  });
});
