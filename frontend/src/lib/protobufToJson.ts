export function protobufToJsonSchema(protoDefinition: string): string {
  const lines = protoDefinition.split(/\r?\n/);
  const properties: Record<string, { type: string }> = {};
  let messageName = 'Message';

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('//')) continue;

    const msgMatch = line.match(/^message\s+([a-zA-Z0-9_]+)/);
    if (msgMatch) {
      messageName = msgMatch[1];
      continue;
    }

    const fieldMatch = line.match(/^(?:repeated\s+)?([a-zA-Z0-9_]+)\s+([a-zA-Z0-9_]+)\s*=\s*\d+;/);
    if (fieldMatch) {
      const protoType = fieldMatch[1].toLowerCase();
      const fieldName = fieldMatch[2];
      const isRepeated = line.startsWith('repeated');

      let jsonType = 'string';
      if (['int32', 'int64', 'uint32', 'uint64', 'sint32', 'float', 'double'].includes(protoType)) {
        jsonType = 'number';
      } else if (protoType === 'bool') {
        jsonType = 'boolean';
      } else if (protoType === 'bytes') {
        jsonType = 'string';
      }

      properties[fieldName] = {
        type: isRepeated ? 'array' : jsonType,
      };
    }
  }

  const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: messageName,
    type: 'object',
    properties,
  };

  return JSON.stringify(schema, null, 2);
}
