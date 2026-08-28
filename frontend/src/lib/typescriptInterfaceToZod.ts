export function convertTsInterfaceToZod(tsCode: string): string {
  const ifaceMatch = /interface\s+([a-zA-Z0-9_]+)\s*\{([^}]+)\}/g;
  let match: RegExpExecArray | null;
  const zodSchemas: string[] = [];

  while ((match = ifaceMatch.exec(tsCode)) !== null) {
    const name = match[1];
    const body = match[2];
    const lines = body.split('\n');
    const fields: string[] = [];

    for (let line of lines) {
      line = line.trim().replace(/;$/, '');
      if (!line) continue;
      const colonIdx = line.indexOf(':');
      if (colonIdx > 0) {
        let key = line.substring(0, colonIdx).trim();
        const isOptional = key.endsWith('?');
        key = key.replace(/\?$/, '');
        const type = line.substring(colonIdx + 1).trim();

        let zodType = 'z.string()';
        if (type === 'number') zodType = 'z.number()';
        else if (type === 'boolean') zodType = 'z.boolean()';
        else if (type.endsWith('[]')) zodType = 'z.array(z.' + type.replace('[]', '') + '())';

        if (isOptional) zodType += '.optional()';
        fields.push('  ' + key + ': ' + zodType + ',');
      }
    }

    zodSchemas.push('export const ' + name + 'Schema = z.object({\n' + fields.join('\n') + '\n});\nexport type ' + name + ' = z.infer<typeof ' + name + 'Schema>;');
  }

  if (zodSchemas.length === 0) return '// Please provide a valid TypeScript interface';
  return 'import { z } from "zod";\n\n' + zodSchemas.join('\n\n');
}
