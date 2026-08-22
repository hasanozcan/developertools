export function formatProtobufSyntax(protoCode: string): string {
  const lines = protoCode.split('\n');
  let indentLevel = 0;
  const formatted: string[] = [];

  for (let rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      formatted.push('');
      continue;
    }

    if (line.startsWith('}') || line.startsWith(']')) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    formatted.push('  '.repeat(indentLevel) + line);

    if (line.endsWith('{') || line.endsWith('[')) {
      indentLevel++;
    }
  }

  return formatted.join('\n');
}