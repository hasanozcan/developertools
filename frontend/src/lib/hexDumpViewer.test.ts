import { describe, it, expect } from 'vitest';
import { generateHexDump } from './hexDumpViewer';

describe('hexDumpViewer', () => {
  it('formats text strings into standard offset hex dump view', () => {
    const dump = generateHexDump('Hello World');
    expect(dump).toContain('00000000');
    expect(dump).toContain('48 65 6c 6c 6f');
    expect(dump).toContain('|Hello World|');
  });
});
