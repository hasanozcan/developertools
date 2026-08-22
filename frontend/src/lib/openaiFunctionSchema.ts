export interface FunctionSchemaOptions {
  functionName?: string;
  description?: string;
  strict?: boolean;
}

export function jsonToOpenAIFunctionSchema(
  jsonInput: string,
  options: FunctionSchemaOptions = {},
): string {
  const {
    functionName = 'custom_function',
    description = 'Execute a custom function with structured parameters',
    strict = true,
  } = options;

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonInput);
  } catch (err: unknown) {
    throw new Error('Invalid JSON input: ' + (err instanceof Error ? err.message : String(err)));
  }

  function inferType(val: unknown): Record<string, unknown> {
    if (val === null) return { type: 'string', nullable: true };
    if (typeof val === 'boolean') return { type: 'boolean' };
    if (typeof val === 'number') return { type: Number.isInteger(val) ? 'integer' : 'number' };
    if (typeof val === 'string') return { type: 'string' };

    if (Array.isArray(val)) {
      const itemSchema = val.length > 0 ? inferType(val[0]) : { type: 'string' };
      return {
        type: 'array',
        items: itemSchema,
      };
    }

    if (typeof val === 'object') {
      const properties: Record<string, unknown> = {};
      const required: string[] = [];

      for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
        properties[k] = inferType(v);
        required.push(k);
      }

      const objSchema: Record<string, unknown> = {
        type: 'object',
        properties,
        required,
      };

      if (strict) {
        objSchema.additionalProperties = false;
      }

      return objSchema;
    }

    return { type: 'string' };
  }

  const parameters = typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)
    ? inferType(parsed)
    : {
        type: 'object',
        properties: { data: inferType(parsed) },
        required: ['data'],
        additionalProperties: strict ? false : undefined,
      };

  const schema = {
    type: 'function',
    function: {
      name: functionName,
      description,
      parameters,
      strict,
    },
  };

  return JSON.stringify(schema, null, 2);
}
