export interface AnthropicToolParam {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  description: string;
  required: boolean;
}

export function buildAnthropicToolDefinition(
  toolName: string,
  description: string,
  params: AnthropicToolParam[]
): string {
  const properties: Record<string, any> = {};
  const required: string[] = [];

  for (const p of params) {
    properties[p.name] = {
      type: p.type,
      description: p.description || undefined,
    };
    if (p.required) required.push(p.name);
  }

  const tool = {
    name: toolName,
    description,
    input_schema: {
      type: 'object',
      properties,
      required: required.length > 0 ? required : undefined,
    },
  };

  return JSON.stringify([tool], null, 2);
}
