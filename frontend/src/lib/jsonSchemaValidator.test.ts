import { describe, expect, it } from 'vitest';
import { JSON_SCHEMA_INPUT_LIMITS, validateJsonSchema } from './jsonSchemaValidator';

describe('validateJsonSchema', () => {
  it('accepts a document that satisfies its schema', () => {
    const result = validateJsonSchema(
      JSON.stringify({ name: 'Ada', age: 36 }),
      JSON.stringify({
        type: 'object',
        required: ['name', 'age'],
        properties: {
          name: { type: 'string' },
          age: { type: 'integer', minimum: 18 },
        },
      }),
    );

    expect(result).toEqual({
      status: 'valid',
      valid: true,
      errors: [],
      warnings: [],
    });
  });

  it('returns every Ajv validation error with its diagnostic fields', () => {
    const result = validateJsonSchema(
      JSON.stringify({ age: 16, extra: true }),
      JSON.stringify({
        type: 'object',
        additionalProperties: false,
        required: ['name'],
        properties: {
          name: { type: 'string' },
          age: { type: 'integer', minimum: 18 },
        },
      }),
    );

    expect(result.status).toBe('invalid');
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(3);
    expect(result.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          instancePath: '',
          schemaPath: '#/additionalProperties',
          keyword: 'additionalProperties',
          message: expect.any(String),
          params: { additionalProperty: 'extra' },
        }),
        expect.objectContaining({
          instancePath: '',
          schemaPath: '#/required',
          keyword: 'required',
          message: expect.stringContaining('name'),
          params: { missingProperty: 'name' },
        }),
        expect.objectContaining({
          instancePath: '/age',
          schemaPath: '#/properties/age/minimum',
          keyword: 'minimum',
          message: expect.any(String),
        }),
      ]),
    );
  });

  it('validates standard string formats through ajv-formats', () => {
    const schema = JSON.stringify({ type: 'string', format: 'email' });

    expect(validateJsonSchema('"ada@example.com"', schema).status).toBe('valid');
    const invalid = validateJsonSchema('"not-an-email"', schema);
    expect(invalid.status).toBe('invalid');
    expect(invalid.errors[0]).toMatchObject({
      keyword: 'format',
      message: 'must match format "email"',
    });
  });

  it('reports malformed document JSON before schema validation', () => {
    const result = validateJsonSchema('{"name":}', '{"type":"object"}');

    expect(result.status).toBe('error');
    expect(result.issue?.source).toBe('document');
    expect(result.issue?.message).toBeTruthy();
    expect(result.errors).toEqual([]);
  });

  it('reports malformed schema JSON', () => {
    const result = validateJsonSchema('{}', '{"type":}');

    expect(result.status).toBe('error');
    expect(result.issue?.source).toBe('schema');
    expect(result.issue?.message).toBeTruthy();
  });

  it('reports Ajv schema compilation errors', () => {
    const result = validateJsonSchema('"text"', '{"type":"string","pattern":"["}');

    expect(result.status).toBe('error');
    expect(result.issue?.source).toBe('compile');
    expect(result.issue?.message).toMatch(/regular expression|pattern/i);
  });

  it('rejects asynchronous schemas instead of treating their Promise as valid', () => {
    const result = validateJsonSchema('"not-an-email"', '{"$async":true,"format":"email"}');

    expect(result.status).toBe('error');
    expect(result.issue).toEqual({
      source: 'compile',
      message: 'Asynchronous JSON Schemas are not supported by this browser tool.',
    });
  });

  it('warns when unknown extension keywords are ignored', () => {
    const result = validateJsonSchema('{}', '{"type":"object","requried":["name"]}');

    expect(result.status).toBe('valid');
    expect(result.warnings.join(' ')).toMatch(/unknown keyword.*requried/i);
  });

  it('explains when either editor is empty', () => {
    expect(validateJsonSchema('', '{}').issue).toEqual({
      source: 'document',
      message: 'JSON document is required.',
    });
    expect(validateJsonSchema('{}', ' ').issue).toEqual({
      source: 'schema',
      message: 'JSON schema is required.',
    });
  });

  it('rejects oversized inputs before parsing or compiling them', () => {
    const oversizedDocument = validateJsonSchema(
      'x'.repeat(JSON_SCHEMA_INPUT_LIMITS.document + 1),
      '{}',
    );
    const oversizedSchema = validateJsonSchema(
      '{}',
      'x'.repeat(JSON_SCHEMA_INPUT_LIMITS.schema + 1),
    );

    expect(oversizedDocument.issue).toEqual({
      source: 'document',
      message: 'JSON document exceeds the 1,000,000 character limit.',
    });
    expect(oversizedSchema.issue).toEqual({
      source: 'schema',
      message: 'JSON schema exceeds the 250,000 character limit.',
    });
  });
});
