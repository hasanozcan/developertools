export function markdownTableToCsv(markdown: string): string {
  const lines = markdown.trim().split(/\r\n|\r|\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return '';

  const csvRows: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    // Skip separator lines like |---|:---:|---|
    if (/^\|?(\s*:?-+:?\s*\|?)+$/.test(trimmed)) {
      continue;
    }

    if (!trimmed.includes('|')) continue;

    const cells = trimmed
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((c) => {
        const clean = c.trim();
        if (clean.includes(',') || clean.includes('"') || clean.includes('\n')) {
          return `"${clean.replace(/"/g, '""')}"`;
        }
        return clean;
      });

    csvRows.push(cells.join(','));
  }

  return csvRows.join('\n');
}
