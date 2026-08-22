export function convertZodCodeToJsonSchema(zodSnippet: string): string {
  // Simple AST transformer for basic Zod object schemas
  const schema: any = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    properties: {},
    required: [],
  };

  const lines = zodSnippet.split('\n');
  for (const line of lines) {
    const match = line.match(/(\w+):\s*z\.(string|number|boolean|array)/);
    if (match) {
      const key = match[1];
      const type = match[2];
      const isOptional = line.includes('.optional()');
      
      let jsonType: string = 'string';
      if (type === 'number') jsonType = 'number';
      else if (type === 'boolean') jsonType = 'boolean';
      else if (type === 'array') jsonType = 'array';

      schema.properties[key] = { type: jsonType };
      if (!isOptional) {
        schema.required.push(key);
      }
    }
  }

  return JSON.stringify(schema, null, 2);
}