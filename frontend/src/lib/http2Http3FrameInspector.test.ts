import { describe, it, expect } from 'vitest';
import { inspectFrame } from './http2Http3FrameInspector';

describe('http2Http3FrameInspector', () => {
  it('returns frame descriptions', () => {
    expect(inspectFrame('HEADERS')).toContain('HPACK');
  });
});
