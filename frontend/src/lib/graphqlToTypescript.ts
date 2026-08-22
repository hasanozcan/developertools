export function graphqlToTypescript(sdlString: string): string {
  const lines = sdlString.split(/\r?\n/);
  const output: string[] = [];
  let inType = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const typeMatch = line.match(/^(?:type|input|interface)\s+([a-zA-Z0-9_]+)\s*\{?/);
    if (typeMatch) {
      inType = true;
      output.push(`export interface ${typeMatch[1]} {`);
      continue;
    }

    if (line === '}') {
      inType = false;
      output.push('}\n');
      continue;
    }

    if (inType) {
      const fieldMatch = line.match(/^([a-zA-Z0-9_]+)(?:\([^)]*\))?\s*:\s*([a-zA-Z0-9_!\[\]]+)/);
      if (fieldMatch) {
        const fieldName = fieldMatch[1];
        let gqlType = fieldMatch[2];
        const isNonNull = gqlType.endsWith('!');
        gqlType = gqlType.replace(/!/g, '');

        let tsType = 'string';
        if (gqlType.startsWith('[') && gqlType.endsWith(']')) {
          const inner = gqlType.slice(1, -1);
          tsType = inner === 'Int' || inner === 'Float' ? 'number[]' : inner === 'Boolean' ? 'boolean[]' : `${inner}[]`;
        } else if (gqlType === 'Int' || gqlType === 'Float') {
          tsType = 'number';
        } else if (gqlType === 'Boolean') {
          tsType = 'boolean';
        } else if (gqlType === 'ID' || gqlType === 'String') {
          tsType = 'string';
        } else {
          tsType = gqlType;
        }

        const optionalMark = isNonNull ? '' : '?';
        output.push(`  ${fieldName}${optionalMark}: ${tsType};`);
      }
    }
  }

  return output.join('\n').trim();
}
