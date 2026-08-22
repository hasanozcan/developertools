export function formatToml(tomlString: string): string {
  const lines = tomlString.split('\n');
  const formatted: string[] = [];

  for (let line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      formatted.push('\n' + trimmed);
    } else if (trimmed.includes('=')) {
      const [k, ...v] = trimmed.split('=');
      formatted.push(`${k.trim()} = ${v.join('=').trim()}`);
    } else if (trimmed) {
      formatted.push(trimmed);
    }
  }

  return formatted.join('\n').trim();
}