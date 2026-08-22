export function generateHexDump(text: string): string {
  const bytes = new TextEncoder().encode(text);
  const lines: string[] = [];

  for (let i = 0; i < bytes.length; i += 16) {
    const offset = i.toString(16).padStart(8, '0');
    const chunk = bytes.slice(i, i + 16);

    const hexParts = Array.from(chunk)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join(' ')
      .padEnd(48, ' ');

    const asciiParts = Array.from(chunk)
      .map((b) => (b >= 32 && b <= 126 ? String.fromCharCode(b) : '.'))
      .join('');

    lines.push(`${offset}  ${hexParts}  |${asciiParts}|`);
  }

  return lines.join('\n');
}
