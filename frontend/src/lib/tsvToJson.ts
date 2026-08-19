export function convertTsvToJson(tsv: string): string {
  const lines = tsv.trim().split(/\r\n|\r|\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return '[]';

  const headers = lines[0].split('\t').map((h) => h.trim());
  const results: Record<string, unknown>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split('\t');
    const row: Record<string, unknown> = {};

    headers.forEach((header, idx) => {
      const val = values[idx]?.trim() ?? '';
      if (val === '') {
        row[header] = null;
      } else if (!isNaN(Number(val)) && val !== '') {
        row[header] = Number(val);
      } else if (val.toLowerCase() === 'true') {
        row[header] = true;
      } else if (val.toLowerCase() === 'false') {
        row[header] = false;
      } else {
        row[header] = val;
      }
    });

    results.push(row);
  }

  return JSON.stringify(results, null, 2);
}

export function convertJsonToTsv(jsonStr: string): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    throw new Error('Invalid JSON input');
  }

  if (!Array.isArray(parsed) || parsed.length === 0) {
    return '';
  }

  const headers = Object.keys(parsed[0]);
  const lines: string[] = [headers.join('\t')];

  for (const item of parsed) {
    const row = headers.map((h) => {
      const val = item[h];
      if (val === null || val === undefined) return '';
      return String(val);
    });
    lines.push(row.join('\t'));
  }

  return lines.join('\n');
}
