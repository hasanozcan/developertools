export function htmlTableToJson(html: string, asObjects: boolean = true): Record<string, any>[] | string[][] {
  const trimmed = html.trim();
  if (!trimmed) return [];

  // Extract table rows using regex to work both in Node/DOM environments
  const rowMatches = trimmed.match(/<tr[\s\S]*?<\/tr>/gi);
  if (!rowMatches || rowMatches.length === 0) {
    throw new Error('No <tr> table rows found in input HTML');
  }

  const allRows: string[][] = [];

  for (const rowHtml of rowMatches) {
    const cells: string[] = [];
    const cellMatches = rowHtml.match(/<(?:th|td)[\s\S]*?<\/(?:th|td)>/gi);
    if (cellMatches) {
      for (const cellHtml of cellMatches) {
        // Strip HTML tags inside cell & decode basic entities
        const text = cellHtml
          .replace(/<[^>]+>/g, '')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .trim();
        cells.push(text);
      }
    }
    if (cells.length > 0) {
      allRows.push(cells);
    }
  }

  if (allRows.length === 0) return [];

  if (!asObjects) {
    return allRows;
  }

  // Treat first row as headers
  const headers = allRows[0].map((h, i) => (h ? h : `column_${i + 1}`));
  const dataRows = allRows.slice(1);

  return dataRows.map((row) => {
    const obj: Record<string, any> = {};
    headers.forEach((header, idx) => {
      obj[header] = row[idx] ?? '';
    });
    return obj;
  });
}
