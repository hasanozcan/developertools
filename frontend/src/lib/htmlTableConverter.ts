export function convertHtmlTable(html: string): { markdown: string; csv: string; json: string } {
  // Simple regex parser for <table>, <tr>, <th>, <td>
  const rows: string[][] = [];
  const trMatches = html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi);

  for (const tr of trMatches) {
    const cells: string[] = [];
    const cellMatches = tr[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi);
    for (const cell of cellMatches) {
      cells.push(cell[1].replace(/<[^>]+>/g, '').trim());
    }
    if (cells.length > 0) rows.push(cells);
  }

  if (rows.length === 0) {
    return { markdown: '', csv: '', json: '[]' };
  }

  // 1. Markdown
  const header = rows[0];
  const mdRows = [
    '| ' + header.join(' | ') + ' |',
    '| ' + header.map(() => '---').join(' | ') + ' |',
    ...rows.slice(1).map(r => '| ' + r.join(' | ') + ' |'),
  ];

  // 2. CSV
  const csv = rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n');

  // 3. JSON
  const headers = rows[0];
  const jsonArr = rows.slice(1).map(r => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h || `col_${i}`] = r[i] || '';
    });
    return obj;
  });

  return {
    markdown: mdRows.join('\n'),
    csv,
    json: JSON.stringify(jsonArr, null, 2),
  };
}
