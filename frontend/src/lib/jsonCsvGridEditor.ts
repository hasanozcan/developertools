const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

export interface GridData {
  headers: string[];
  rows: string[][];
}

export function parseJsonToGrid(jsonStr: string): GridData {
  try {
    const parsed: unknown = JSON.parse(jsonStr);
    const array = Array.isArray(parsed) ? parsed : [parsed];
    if (array.length === 0) return { headers: [], rows: [] };

    const headers = Array.from(
      new Set(
        array.flatMap((item) =>
          typeof item === 'object' && item !== null ? Object.keys(item) : ['value'],
        ),
      ),
    );
    const rows = array.map((item) => {
      if (typeof item === 'object' && item !== null) {
        const rec = item as Record<string, unknown>;
        return headers.map((h) => (rec[h] !== undefined && rec[h] !== null ? String(rec[h]) : ''));
      }
      return [String(item)];
    });

    return { headers, rows };
  } catch {
    return { headers: [], rows: [] };
  }
}

export function parseCsvToGrid(csvStr: string): GridData {
  const text = (csvStr || '').replace(/^\uFEFF/, '');
  if (!text.trim()) return { headers: [], rows: [] };

  const records: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(cell);
      cell = '';
    } else if (ch === '\r' && next === '\n') {
      row.push(cell);
      records.push(row);
      row = [];
      cell = '';
      i++;
    } else if (ch === '\n' || ch === '\r') {
      row.push(cell);
      records.push(row);
      row = [];
      cell = '';
    } else {
      cell += ch;
    }
  }

  row.push(cell);
  if (row.length > 1 || row[0] !== '') {
    records.push(row);
  }

  if (records.length === 0) return { headers: [], rows: [] };

  const colCount = Math.max(...records.map((r) => r.length));
  const rawHeaders = records[0];
  const headers = Array.from({ length: colCount }, (_, idx) => {
    const name = (rawHeaders[idx] ?? '').trim();
    return name || `column_${idx + 1}`;
  });

  const rows = records
    .slice(1)
    .map((r) => Array.from({ length: colCount }, (_, idx) => r[idx] ?? ''));

  return { headers, rows };
}

export function gridToJson(headers: string[], rows: string[][]): string {
  const result = rows.map((row) => {
    const obj: Record<string, unknown> = {};
    headers.forEach((h, i) => {
      if (!h || DANGEROUS_KEYS.has(h)) return;
      const val = row[i] ?? '';
      const coerced = !isNaN(Number(val)) && val.trim() !== '' ? Number(val) : val;
      Object.defineProperty(obj, h, {
        value: coerced,
        enumerable: true,
        writable: true,
        configurable: true,
      });
    });
    return obj;
  });
  return JSON.stringify(result, null, 2);
}

export function gridToCsv(headers: string[], rows: string[][]): string {
  const escapeCsv = (str: string) => {
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const lines = [headers.map(escapeCsv).join(',')];
  for (const row of rows) {
    lines.push(headers.map((_, idx) => escapeCsv(row[idx] ?? '')).join(','));
  }
  return lines.join('\n');
}
