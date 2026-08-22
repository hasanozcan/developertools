export function yamlToTypescript(yamlString: string, rootInterfaceName = 'Config'): string {
  const lines = yamlString.split(/\r?\n/).filter((l) => l.trim() && !l.trim().startsWith('#'));
  const properties: Record<string, string> = {};

  for (const line of lines) {
    const match = line.match(/^\s*([a-zA-Z0-9_.-]+)\s*:\s*(.*)$/);
    if (match) {
      const key = match[1];
      const val = match[2].trim();

      if (!val) {
        properties[key] = 'Record<string, any>';
      } else if (val === 'true' || val === 'false') {
        properties[key] = 'boolean';
      } else if (!isNaN(Number(val))) {
        properties[key] = 'number';
      } else if (val.startsWith('[') && val.endsWith(']')) {
        properties[key] = 'string[]';
      } else {
        properties[key] = 'string';
      }
    }
  }

  const outputLines = [`export interface ${rootInterfaceName} {`];
  for (const [k, v] of Object.entries(properties)) {
    outputLines.push(`  ${k}: ${v};`);
  }
  outputLines.push('}');

  return outputLines.join('\n');
}
