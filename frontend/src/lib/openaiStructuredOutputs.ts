export interface SchemaProperty {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  description?: string;
  enum?: string[];
  itemsType?: 'string' | 'number' | 'boolean';
}

export function buildOpenAiStructuredOutputSchema(
  name: string,
  description: string,
  properties: SchemaProperty[]
): string {
  const schemaProps: Record<string, any> = {};
  const required: string[] = [];

  for (const prop of properties) {
    required.push(prop.name);
    if (prop.type === 'array') {
      schemaProps[prop.name] = {
        type: 'array',
        description: prop.description || undefined,
        items: { type: prop.itemsType || 'string' },
      };
    } else if (prop.enum && prop.enum.length > 0) {
      schemaProps[prop.name] = {
        type: 'string',
        description: prop.description || undefined,
        enum: prop.enum,
      };
    } else {
      schemaProps[prop.name] = {
        type: prop.type,
        description: prop.description || undefined,
      };
    }
  }

  const result = {
    type: 'json_schema',
    json_schema: {
      name,
      description: description || undefined,
      strict: true,
      schema: {
        type: 'object',
        properties: schemaProps,
        required,
        additionalProperties: false,
      },
    },
  };

  return JSON.stringify(result, null, 2);
}
