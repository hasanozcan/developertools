import { describe, it, expect } from 'vitest';
import { convertJsonSchemaToProtobuf } from './jsonSchemaToProtobuf';

describe('jsonSchemaToProtobuf', () => {
  it('converts json schema to protobuf', () => {
    const schema = JSON.stringify({ title: "User", properties: { id: { type: "integer" } } });
    expect(convertJsonSchemaToProtobuf(schema)).toContain('int64 id = 1;');
  });
});
