export type ColumnAlignment = 'left' | 'center' | 'right';

export interface MarkdownTableData {
  headers: string[];
  alignments: ColumnAlignment[];
  rows: string[][];
}

export function generateMarkdownTable(data: MarkdownTableData): string {
  const { headers, alignments, rows } = data;
  if (headers.length === 0) return '';

  const colCount = headers.length;

  // Header row
  const headerRow = `| ${headers.map((h) => h.trim() || ' ').join(' | ')} |`;

  // Separator row with alignments
  const separatorRow = `| ${alignments
    .map((align) => {
      if (align === 'center') return ':---:';
      if (align === 'right') return '---:';
      return ':---';
    })
    .join(' | ')} |`;

  // Data rows
  const dataRows = rows.map((row) => {
    const padded = Array.from({ length: colCount }, (_, i) => (row[i] !== undefined ? row[i].trim() : ''));
    return `| ${padded.join(' | ')} |`;
  });

  return [headerRow, separatorRow, ...dataRows].join('\n');
}

export function createEmptyTable(colCount: number = 3, rowCount: number = 3): MarkdownTableData {
  const headers = Array.from({ length: colCount }, (_, i) => `Header ${i + 1}`);
  const alignments: ColumnAlignment[] = Array.from({ length: colCount }, () => 'left');
  const rows = Array.from({ length: rowCount }, (_, r) =>
    Array.from({ length: colCount }, (_, c) => `Row ${r + 1} Col ${c + 1}`),
  );

  return { headers, alignments, rows };
}
