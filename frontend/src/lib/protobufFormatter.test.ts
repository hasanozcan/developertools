import { describe, it, expect } from 'vitest';
import { formatProtobufSyntax } from './protobufFormatter';

describe('formatProtobufSyntax', () => {
  it('indents proto messages cleanly', () => {
    const input = 'syntax = "proto3";\nmessage User {\nstring name = 1;\nint32 id = 2;\n}';
    const res = formatProtobufSyntax(input);
    expect(res).toContain('  string name = 1;');
    expect(res).toContain('}');
  });
});