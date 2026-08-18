export type TableAlignment = 'left' | 'center' | 'right';

export interface CsvToMarkdownOptions {
  alignment?: TableAlignment;
  delimiter?: string;
  hasHeader?: boolean;
}

export function csvToMarkdownTable(csv: string, options: CsvToMarkdownOptions = {}): string {
  const { alignment = 'left', delimiter = ',', hasHeader = true } = options;
  const trimmed = csv.trim();
  if (!trimmed) return '';

  const lines = trimmed.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length === 0) return '';

  const parsedRows = lines.map((line) => {
    // Simple robust CSV tokenizer handling commas/quotes
    const row: string[] = [];
    let inQuotes = false;
    let current = '';
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"' || char === "'") {
        inQuotes = !inQuotes;
      } else if (char === delimiter && !inQuotes) {
        row.push(current.trim().replace(/^["']|["']$/g, ''));
        current = '';
      } else {
        current += char;
      }
    }
    row.push(current.trim().replace(/^["']|["']$/g, ''));
    return row;
  });

  const colCount = Math.max(...parsedRows.map((r) => r.length));
  if (colCount === 0) return '';

  const headerRow = hasHeader ? parsedRows[0] : Array.from({ length: colCount }, (_, i) => `Col ${i + 1}`);
  const dataRows = hasHeader ? parsedRows.slice(1) : parsedRows;

  // Compute column widths
  const colWidths = Array.from({ length: colCount }, (_, colIdx) => {
    let max = (headerRow[colIdx] || '').length;
    for (const r of dataRows) {
      max = Math.max(max, (r[colIdx] || '').length);
    }
    return Math.max(max, 3);
  });

  const alignSeparator = (width: number) => {
    if (alignment === 'center') return `:${'-'.repeat(Math.max(1, width - 2))}:`;
    if (alignment === 'right') return `${'-'.repeat(Math.max(2, width - 1))}:`;
    return `:${'-'.repeat(Math.max(2, width - 1))}`;
  };

  const formatRow = (row: string[]) => {
    const padded = colWidths.map((w, idx) => (row[idx] || '').padEnd(w));
    return `| ${padded.join(' | ')} |`;
  };

  const separatorRow = `| ${colWidths.map((w) => alignSeparator(w)).join(' | ')} |`;

  const output = [
    formatRow(headerRow),
    separatorRow,
    ...dataRows.map((r) => formatRow(r)),
  ];

  return output.join('\n');
}

export function markdownTableToCsv(markdown: string, delimiter: string = ','): string {
  const lines = markdown.trim().split(/\r?\n/).filter((l) => l.includes('|'));
  if (lines.length === 0) return '';

  const rows: string[][] = [];
  for (const line of lines) {
    // skip markdown separator row like |:---|:---|
    const trimmedLine = line.trim();
    if (/^\|?(\s*:?-+:?\s*\|?)+$/.test(trimmedLine) && trimmedLine.includes('-')) continue;
    const rawCells = trimmedLine.split('|');
    const cells = (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')
      ? rawCells.slice(1, -1)
      : rawCells
    ).map((c) => c.trim());
    if (cells.length > 0) {
      rows.push(cells);
    }
  }

  return rows
    .map((row) =>
      row
        .map((cell) => (cell.includes(delimiter) || cell.includes('"') ? `"${cell.replace(/"/g, '""')}"` : cell))
        .join(delimiter),
    )
    .join('\n');
}
