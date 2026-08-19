export interface CsvToSqlOptions {
  tableName: string;
  dialect: 'generic' | 'postgres' | 'mysql';
  batchSize: number;
}

export function convertCsvToSqlInsert(csv: string, options: CsvToSqlOptions): string {
  const lines = csv.trim().split(/\r\n|\r|\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return '';

  const parseCsvLine = (line: string): string[] => {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    return values;
  };

  const headers = parseCsvLine(lines[0]);
  const table = options.tableName.trim() || 'my_table';
  const columnsList = headers.map((h) => (options.dialect === 'postgres' ? `"${h}"` : options.dialect === 'mysql' ? `\`${h}\`` : h)).join(', ');

  const queries: string[] = [];
  const rows = lines.slice(1);
  const batchSize = Math.max(1, options.batchSize || 100);

  for (let i = 0; i < rows.length; i += batchSize) {
    const chunk = rows.slice(i, i + batchSize);
    const valueTuples = chunk.map((rowStr) => {
      const cells = parseCsvLine(rowStr);
      const formattedCells = cells.map((cell) => {
        if (cell === '' || cell.toUpperCase() === 'NULL') return 'NULL';
        if (/^-?\d+(\.\d+)?$/.test(cell)) return cell;
        if (cell.toLowerCase() === 'true' || cell.toLowerCase() === 'false') return cell.toUpperCase();
        return `'${cell.replace(/'/g, "''")}'`;
      });
      return `(${formattedCells.join(', ')})`;
    });

    queries.push(`INSERT INTO ${table} (${columnsList})\nVALUES\n  ${valueTuples.join(',\n  ')};`);
  }

  return queries.join('\n\n');
}
