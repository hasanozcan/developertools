export function formatTerraformHcl(hcl: string): string {
  const lines = hcl.split(/\r?\n/);
  const formatted: string[] = [];
  let indentLevel = 0;

  for (const rawLine of lines) {
    let line = rawLine.trim();
    if (!line) {
      formatted.push('');
      continue;
    }

    if (line.startsWith('}') || line.startsWith(']')) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    const spaces = '  '.repeat(indentLevel);
    formatted.push(spaces + line);

    if (line.endsWith('{') || line.endsWith('[')) {
      indentLevel++;
    }
  }

  return formatted.join('\n').trim();
}
