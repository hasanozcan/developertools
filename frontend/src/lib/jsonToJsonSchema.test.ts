import { describe, it, expect } from 'vitest';
import { generateJsonSchema } from './jsonToJsonSchema';

describe('jsonToJsonSchema', () => {
  it('generates standard JSON Schema from object payload', () => {
    const json = JSON.stringify({ id: 101, username: 'dev', tags: ['typescript', 'react'] });
    const schema = JSON.parse(generateJsonSchema(json));
    expect(schema.type).toBe('object');
    expect(schema.properties.id.type).toBe('integer');
    expect(schema.properties.tags.type).toBe('array');
  });
});
