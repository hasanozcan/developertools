export function sqlToJson(sql: string): Record<string, any>[] {
  const results: Record<string, any>[] = [];
  const insertRegex = /INSERT\s+INTO\s+[`"']?([a-zA-Z0-9_]+)[`"']?\s*(?:\(([^)]+)\))?\s+VALUES\s*([\s\S]+?);/gi;

  let match: RegExpExecArray | null;
  while ((match = insertRegex.exec(sql)) !== null) {
    const rawCols = match[2];
    const rawValuesBlock = match[3];

    let columns: string[] = [];
    if (rawCols) {
      columns = rawCols
        .split(',')
        .map((col) => col.trim().replace(/^[`"']|[`"']$/g, ''));
    }

    // Split multiple value tuples: (val1, val2), (val3, val4)
    const tupleRegex = /\(([^)]+)\)/g;
    let tupleMatch: RegExpExecArray | null;

    while ((tupleMatch = tupleRegex.exec(rawValuesBlock)) !== null) {
      const rawRow = tupleMatch[1];
      const parsedValues = parseSqlRowValues(rawRow);

      const obj: Record<string, any> = {};
      parsedValues.forEach((val, idx) => {
        const colName = columns[idx] || `col_${idx + 1}`;
        obj[colName] = val;
      });

      results.push(obj);
    }
  }

  return results;
}

function parseSqlRowValues(rowStr: string): any[] {
  const values: any[] = [];
  let inQuotes = false;
  let quoteChar = '';
  let current = '';

  for (let i = 0; i < rowStr.length; i++) {
    const char = rowStr[i];

    if ((char === "'" || char === '"') && !inQuotes) {
      inQuotes = true;
      quoteChar = char;
    } else if (char === quoteChar && inQuotes) {
      inQuotes = false;
    } else if (char === ',' && !inQuotes) {
      values.push(castSqlValue(current.trim()));
      current = '';
    } else {
      current += char;
    }
  }

  if (current.length > 0 || rowStr.trim().endsWith(',')) {
    values.push(castSqlValue(current.trim()));
  }

  return values;
}

function castSqlValue(raw: string): any {
  if (/^NULL$/i.test(raw)) return null;
  if (/^TRUE$/i.test(raw)) return true;
  if (/^FALSE$/i.test(raw)) return false;
  if (/^['"].*['"]$/.test(raw)) {
    return raw.slice(1, -1).replace(/\\'/g, "'").replace(/\\"/g, '"');
  }
  if (!isNaN(Number(raw)) && raw.length > 0) {
    return Number(raw);
  }
  return raw;
}
