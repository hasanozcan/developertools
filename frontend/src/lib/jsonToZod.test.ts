import { describe, expect, it } from 'vitest';
import { generateZodSchema } from './jsonToZod';

describe('generateZodSchema', () => {
  it('generates strict nested schemas and an inferred type', () => {
    const output = generateZodSchema(
      '{"id":1,"profile":{"name":"Ada","active":true},"tags":["admin"]}',
      { schemaName: 'user' },
    );

    expect(output).toContain('export const UserSchema = z.object({');
    expect(output).toContain('id: z.number().int(),');
    expect(output).toContain('profile: z.object({');
    expect(output).toContain('tags: z.array(z.string()),');
    expect(output).toContain('export type User = z.infer<typeof UserSchema>;');
  });

  it('merges object samples in arrays and marks missing properties optional', () => {
    const output = generateZodSchema('[{"id":1,"name":"one"},{"id":2,"enabled":true}]', {
      schemaName: 'items',
    });

    expect(output).toContain('name: z.string().optional(),');
    expect(output).toContain('enabled: z.boolean().optional(),');
    expect(output).toContain('z.array(z.object({');
  });

  it('creates unions for mixed arrays and distinguishes integers', () => {
    const output = generateZodSchema('{"values":[1,"two",null,2.5]}');

    expect(output).toContain('values: z.array(z.union([z.number(), z.string(), z.null()])),');
  });

  it('optionally infers common string formats', () => {
    const output = generateZodSchema(
      '{"email":"dev@example.com","site":"https://example.com","id":"018f82c1-6e89-7cc9-b8a2-f4e5d6c7b8a9","created":"2026-08-16T10:30:00Z"}',
    );

    expect(output).toContain('email: z.string().email()');
    expect(output).toContain('site: z.string().url()');
    expect(output).toContain('id: z.string().uuid()');
    expect(output).toContain('created: z.string().datetime()');
  });

  it('quotes non-identifier keys and supports non-strict output without a type alias', () => {
    const output = generateZodSchema('{"display-name":"Ada"}', {
      schemaName: '123 response',
      inferStringFormats: false,
      strictObjects: false,
      includeInferredType: false,
    });

    expect(output).toContain('export const Root123ResponseSchema');
    expect(output).toContain('"display-name": z.string(),');
    expect(output).not.toContain('.strict()');
    expect(output).not.toContain('export type');
  });

  it('rejects invalid JSON and excessive nesting', () => {
    expect(() => generateZodSchema('{invalid}')).toThrow('Invalid JSON');

    let nested: unknown = true;
    for (let index = 0; index < 32; index += 1) nested = { nested };
    expect(() => generateZodSchema(JSON.stringify(nested))).toThrow('supported depth');
  });
});
