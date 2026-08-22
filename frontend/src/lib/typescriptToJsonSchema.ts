export function typescriptToJsonSchema(tsInterface: string, title = 'RootSchema'): string {
  const properties: Record<string, { type: string; description?: string }> = {};
  const required: string[] = [];

  const lines = tsInterface.split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^\s*([a-zA-Z0-9_]+)(\?)?\s*:\s*([a-zA-Z0-9_\[\]|\s]+);?/);
    if (match) {
      const fieldName = match[1];
      const isOptional = !!match[2];
      const rawType = match[3].trim().toLowerCase();

      let jsonType = 'string';
      if (rawType.includes('number')) jsonType = 'number';
      else if (rawType.includes('boolean')) jsonType = 'boolean';
      else if (rawType.includes('[]') || rawType.startsWith('array<')) jsonType = 'array';
      else if (rawType.includes('object') || rawType.includes('{')) jsonType = 'object';

      properties[fieldName] = { type: jsonType };
      if (!isOptional) {
        required.push(fieldName);
      }
    }
  }

  const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title,
    type: 'object',
    properties,
    required: required.length > 0 ? required : undefined,
    additionalProperties: false,
  };

  return JSON.stringify(schema, null, 2);
}
