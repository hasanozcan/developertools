import { describe, it, expect } from 'vitest';
import { convertZodCodeToJsonSchema } from './zodToJsonSchema';

describe('convertZodCodeToJsonSchema', () => {
  it('converts zod snippet to json schema', () => {
    const zod = `const User = z.object({
  name: z.string(),
  age: z.number().optional(),
});`;
    const res = convertZodCodeToJsonSchema(zod);
    const parsed = JSON.parse(res);
    expect(parsed.properties.name.type).toBe('string');
    expect(parsed.required).toContain('name');
  });
});