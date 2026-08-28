import { describe, it, expect } from 'vitest';
import { convertProtobufToJsonSchema } from './protobufToJsonSchema';

describe('protobufToJsonSchema', () => {
  it('converts proto3 to JSON Schema', () => {
    const proto = 'message User { int64 id = 1; string name = 2; }';
    expect(convertProtobufToJsonSchema(proto)).toContain('draft-07');
  });
});
