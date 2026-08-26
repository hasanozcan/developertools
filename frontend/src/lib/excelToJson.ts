export interface ExcelToJsonOptions {
  headerRowIndex?: number; // 0-based
  skipEmptyRows?: boolean;
  parseNumbers?: boolean;
  parseBooleans?: boolean;
  trimValues?: boolean;
}

export function parseDelimitedTable(
  text: string,
  delimiter = ','
): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentCell += '"';
        i++; // skip escaped quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === delimiter && !insideQuotes) {
      currentRow.push(currentCell);
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentCell);
      if (currentRow.some((cell) => cell.trim().length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell);
    if (currentRow.some((cell) => cell.trim().length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

export function tableRowsToJson(
  rows: string[][],
  options: ExcelToJsonOptions = {}
): Record<string, any>[] {
  const {
    headerRowIndex = 0,
    skipEmptyRows = true,
    parseNumbers = true,
    parseBooleans = true,
    trimValues = true,
  } = options;

  if (rows.length <= headerRowIndex) {
    return [];
  }

  const rawHeaders = rows[headerRowIndex];
  const headers = rawHeaders.map((h, idx) => {
    const val = trimValues ? h.trim() : h;
    return val || `column_${idx + 1}`;
  });

  const result: Record<string, any>[] = [];

  for (let r = headerRowIndex + 1; r < rows.length; r++) {
    const row = rows[r];
    if (skipEmptyRows && row.every((c) => !c.trim())) {
      continue;
    }

    const rowObj: Record<string, any> = {};
    headers.forEach((header, colIdx) => {
      let val: any = colIdx < row.length ? row[colIdx] : '';
      if (trimValues && typeof val === 'string') {
        val = val.trim();
      }

      if (parseNumbers && typeof val === 'string' && val !== '' && !isNaN(Number(val))) {
        val = Number(val);
      } else if (parseBooleans && typeof val === 'string') {
        const lower = val.toLowerCase();
        if (lower === 'true') val = true;
        if (lower === 'false') val = false;
      }

      rowObj[header] = val;
    });

    result.push(rowObj);
  }

  return result;
}

export function excelTextToJson(
  tableContent: string,
  options: ExcelToJsonOptions = {}
): Record<string, any>[] {
  // Auto-detect delimiter: tab, semicolon, comma
  const firstLine = tableContent.split('\n')[0] || '';
  let delimiter = ',';
  if (firstLine.includes('\t')) delimiter = '\t';
  else if (firstLine.includes(';') && !firstLine.includes(',')) delimiter = ';';

  const rows = parseDelimitedTable(tableContent, delimiter);
  return tableRowsToJson(rows, options);
}
