export function formatApacheConf(conf: string): string {
  const lines = conf.split('\n');
  let indent = 0;
  const out: string[] = [];

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      out.push('');
      continue;
    }
    if (line.startsWith('</')) {
      indent = Math.max(0, indent - 1);
    }
    out.push('  '.repeat(indent) + line);
    if (line.startsWith('<') && !line.startsWith('</') && line.endsWith('>')) {
      indent++;
    }
  }
  return out.join('\n');
}