export function protoToTypescript(protoStr: string): string {
  const interfaces: string[] = [];
  const messageMatches = protoStr.matchAll(/message\s+(\w+)\s*\{([\s\S]*?)\}/gi);

  for (const match of messageMatches) {
    const msgName = match[1];
    const body = match[2];
    const fields: string[] = [];

    const lines = body.split(';').map(l => l.trim()).filter(Boolean);
    for (const line of lines) {
      const parts = line.split(/\s+/);
      if (parts.length >= 3) {
        const isRepeated = parts[0] === 'repeated';
        const type = isRepeated ? parts[1] : parts[0];
        const name = isRepeated ? parts[2] : parts[1];

        let tsType = 'any';
        if (['string', 'bytes'].includes(type)) tsType = 'string';
        else if (['int32', 'int64', 'uint32', 'uint64', 'float', 'double'].includes(type)) tsType = 'number';
        else if (type === 'bool') tsType = 'boolean';
        else tsType = type;

        if (isRepeated) tsType += '[]';
        fields.push(`  ${name}?: ${tsType};`);
      }
    }

    interfaces.push(`export interface ${msgName} {\n${fields.join('\n')}\n}`);
  }

  return interfaces.length > 0 ? interfaces.join('\n\n') : '// No Protobuf messages found';
}
