export function generateJsonSchema(jsonInput: string, draft: 'draft-07' | '2020-12' = '2020-12'): string {
  try {
    const parsed = JSON.parse(jsonInput);
    const schemaUri = draft === 'draft-07' ? 'http://json-schema.org/draft-07/schema#' : 'https://json-schema.org/draft/2020-12/schema';
    const schema = {
      $schema: schemaUri,
      ...inferSchemaType(parsed),
    };
    return JSON.stringify(schema, null, 2);
  } catch (err: any) {
    return `// Invalid JSON: ${err.message}`;
  }
}

function inferSchemaType(val: any): any {
  if (val === null) return { type: 'null' };
  if (typeof val === 'string') return { type: 'string' };
  if (typeof val === 'number') return { type: Number.isInteger(val) ? 'integer' : 'number' };
  if (typeof val === 'boolean') return { type: 'boolean' };
  if (Array.isArray(val)) {
    return {
      type: 'array',
      items: val.length > 0 ? inferSchemaType(val[0]) : {},
    };
  }
  if (typeof val === 'object') {
    const properties: Record<string, any> = {};
    const required: string[] = [];
    for (const [k, v] of Object.entries(val)) {
      properties[k] = inferSchemaType(v);
      required.push(k);
    }
    return {
      type: 'object',
      properties,
      required,
    };
  }
  return {};
}
