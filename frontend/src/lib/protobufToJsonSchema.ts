export function convertProtobufToJsonSchema(proto: string): string {
  const msgRegex = /message\s+([a-zA-Z0-9_]+)\s*\{([^}]+)\}/g;
  let match: RegExpExecArray | null;
  const schemas: Record<string, any> = {};

  while ((match = msgRegex.exec(proto)) !== null) {
    const msgName = match[1];
    const body = match[2];
    const properties: Record<string, any> = {};

    const fieldLines = body.split(';');
    for (let line of fieldLines) {
      line = line.trim();
      if (!line || line.startsWith('//')) continue;
      const parts = line.split(/\s+/);
      let type = parts[0];
      let fieldName = parts[1];
      if (parts[0] === 'repeated') {
        type = parts[1];
        fieldName = parts[2];
      }
      if (!fieldName) continue;

      let jsonType = 'string';
      if (/int32|int64|uint32|uint64/i.test(type)) jsonType = 'integer';
      else if (/float|double/i.test(type)) jsonType = 'number';
      else if (/bool/i.test(type)) jsonType = 'boolean';

      if (parts[0] === 'repeated') {
        properties[fieldName] = { type: 'array', items: { type: jsonType } };
      } else {
        properties[fieldName] = { type: jsonType };
      }
    }

    schemas[msgName] = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      title: msgName,
      type: 'object',
      properties,
      required: Object.keys(properties)
    };
  }

  return JSON.stringify(schemas, null, 2);
}
