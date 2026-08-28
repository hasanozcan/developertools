export interface FunctionParam {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  description: string;
  required: boolean;
  enumOptions?: string[];
}

export interface FunctionSchemaOptions {
  name: string;
  description: string;
  parameters: FunctionParam[];
}

export function buildOpenAiToolDefinition(options: FunctionSchemaOptions): any {
  const properties: Record<string, any> = {};
  const required: string[] = [];

  for (const p of options.parameters) {
    properties[p.name] = {
      type: p.type,
      description: p.description,
    };
    if (p.enumOptions && p.enumOptions.length > 0) {
      properties[p.name].enum = p.enumOptions;
    }
    if (p.required) {
      required.push(p.name);
    }
  }

  return {
    type: 'function',
    function: {
      name: options.name,
      description: options.description,
      parameters: {
        type: 'object',
        properties,
        required,
      },
    },
  };
}
