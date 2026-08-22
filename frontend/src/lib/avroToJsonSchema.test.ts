import { describe, it, expect } from 'vitest';
import { convertAvroToJsonSchema } from './avroToJsonSchema';

describe('convertAvroToJsonSchema', () => {
  it('converts avro schema to json schema', () => {
    const avro = JSON.stringify({
      type: 'record',
      name: 'User',
      fields: [{ name: 'id', type: 'long' }, { name: 'email', type: 'string' }]
    });
    const res = convertAvroToJsonSchema(avro);
    const parsed = JSON.parse(res);
    expect(parsed.properties.id.type).toBe('number');
    expect(parsed.properties.email.type).toBe('string');
  });
});