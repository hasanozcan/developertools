export function convertAvroToJsonSchema(avroJson: string): string {
  try {
    const parsed = JSON.parse(avroJson);
    const schema: any = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      title: parsed.name || 'AvroRecord',
      type: 'object',
      properties: {},
      required: [],
    };

    for (const field of parsed.fields || []) {
      let fType = 'string';
      if (field.type === 'int' || field.type === 'long' || field.type === 'float' || field.type === 'double') {
        fType = 'number';
      } else if (field.type === 'boolean') {
        fType = 'boolean';
      } else if (field.type === 'array') {
        fType = 'array';
      }
      schema.properties[field.name] = { type: fType };
      schema.required.push(field.name);
    }

    return JSON.stringify(schema, null, 2);
  } catch (e: any) {
    return '// Error: ' + e.message;
  }
}