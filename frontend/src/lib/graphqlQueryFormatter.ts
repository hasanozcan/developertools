export function formatGraphQLQuery(query: string, minify = false): string {
  if (minify) {
    return query
      .replace(/#[^\n]*/g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}():,])\s*/g, '$1')
      .trim();
  }

  const lines = query.split(/\r?\n/);
  const formatted: string[] = [];
  let indent = 0;

  for (const rawLine of lines) {
    let line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    if (line.startsWith('}')) indent = Math.max(0, indent - 1);
    formatted.push('  '.repeat(indent) + line);
    if (line.endsWith('{')) indent++;
  }

  return formatted.join('\n').trim();
}
