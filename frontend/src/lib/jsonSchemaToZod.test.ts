import { describe, it, expect } from 'vitest';
import { convertJsonSchemaToZod } from './jsonSchemaToZod';

describe('convertJsonSchemaToZod', () => {
  it('generates zod object code', () => {
    const schema = JSON.stringify({
      type: 'object',
      properties: { title: { type: 'string' }, count: { type: 'number' } },
      required: ['title']
    });
    const code = convertJsonSchemaToZod(schema);
    expect(code).toContain('title: z.string(),');
    expect(code).toContain('count: z.number().optional(),');
  });
});