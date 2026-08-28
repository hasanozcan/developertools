export function convertJsonSchemaToProtobuf(schemaStr: string, messageName = 'GeneratedMessage'): string {
  const parsed = JSON.parse(schemaStr);
  const properties = parsed.properties || {};
  const fields: string[] = [];
  let index = 1;

  for (const [key, val] of Object.entries(properties as Record<string, any>)) {
    let type = 'string';
    if (val.type === 'integer') type = 'int64';
    else if (val.type === 'number') type = 'double';
    else if (val.type === 'boolean') type = 'bool';
    else if (val.type === 'array') type = 'repeated string';

    fields.push('  ' + type + ' ' + key + ' = ' + (index++) + ';');
  }

  return 'syntax = "proto3";\n\nmessage ' + (parsed.title || messageName) + ' {\n' + fields.join('\n') + '\n}\n';
}
