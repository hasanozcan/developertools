import { describe, it, expect } from 'vitest';
import { typescriptToJsonSchema } from './typescriptToJsonSchema';

describe('typescriptToJsonSchema', () => {
  it('converts TypeScript interface definitions to standard JSON Schema', () => {
    const ts = `interface User {
  id: number;
  name: string;
  isAdmin?: boolean;
}`;
    const schemaStr = typescriptToJsonSchema(ts, 'UserSchema');
    const parsed = JSON.parse(schemaStr);
    expect(parsed.title).toBe('UserSchema');
    expect(parsed.properties.id.type).toBe('number');
    expect(parsed.properties.name.type).toBe('string');
    expect(parsed.required).toContain('id');
    expect(parsed.required).not.toContain('isAdmin');
  });
});
