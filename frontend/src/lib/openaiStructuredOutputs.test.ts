import { describe, expect, it } from 'vitest';
import { buildOpenAiStructuredOutputSchema } from './openaiStructuredOutputs';

describe('openaiStructuredOutputs', () => {
  it('generates strict schema with additionalProperties false', () => {
    const schema = buildOpenAiStructuredOutputSchema('UserOutput', 'User details', [
      { name: 'username', type: 'string', description: 'Username' },
      { name: 'age', type: 'number' },
    ]);
    const parsed = JSON.parse(schema);
    expect(parsed.json_schema.strict).toBe(true);
    expect(parsed.json_schema.schema.additionalProperties).toBe(false);
    expect(parsed.json_schema.schema.required).toEqual(['username', 'age']);
  });
});
