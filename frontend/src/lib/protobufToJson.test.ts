import { describe, it, expect } from 'vitest';
import { protobufToJsonSchema } from './protobufToJson';

describe('protobufToJson', () => {
  it('converts Protobuf message fields to JSON Schema', () => {
    const proto = `
syntax = "proto3";
message SearchRequest {
  string query = 1;
  int32 page_number = 2;
  bool is_active = 3;
}
`;
    const schemaStr = protobufToJsonSchema(proto);
    const parsed = JSON.parse(schemaStr);
    expect(parsed.title).toBe('SearchRequest');
    expect(parsed.properties.query.type).toBe('string');
    expect(parsed.properties.page_number.type).toBe('number');
    expect(parsed.properties.is_active.type).toBe('boolean');
  });
});
