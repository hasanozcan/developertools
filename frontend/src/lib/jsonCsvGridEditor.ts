export function parseJsonToGrid(jsonStr: string): { headers: string[]; rows: string[][] } {
  try {
    const parsed = JSON.parse(jsonStr);
    const array = Array.isArray(parsed) ? parsed : [parsed];
    if (array.length === 0) return { headers: [], rows: [] };

    const headers = Array.from(new Set(array.flatMap(item => typeof item === 'object' && item !== null ? Object.keys(item) : ['value'])));
    const rows = array.map(item => {
      if (typeof item === 'object' && item !== null) {
        return headers.map(h => item[h] !== undefined ? String(item[h]) : '');
      }
      return [String(item)];
    });

    return { headers, rows };
  } catch {
    return { headers: [], rows: [] };
  }
}

export function gridToJson(headers: string[], rows: string[][]): string {
  const result = rows.map(row => {
    const obj: Record<string, any> = {};
    headers.forEach((h, i) => {
      const val = row[i] || '';
      obj[h] = !isNaN(Number(val)) && val.trim() !== '' ? Number(val) : val;
    });
    return obj;
  });
  return JSON.stringify(result, null, 2);
}

export function gridToCsv(headers: string[], rows: string[][]): string {
  const escapeCsv = (str: string) => {
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const lines = [headers.map(escapeCsv).join(',')];
  for (const row of rows) {
    lines.push(row.map(escapeCsv).join(','));
  }
  return lines.join('\n');
}
