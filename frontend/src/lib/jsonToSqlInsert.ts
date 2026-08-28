export interface SqlInsertOptions {
  tableName: string;
  dialect?: 'postgres' | 'mysql' | 'sqlite' | 'sqlserver';
  mode?: 'INSERT' | 'UPDATE';
  primaryKey?: string;
}

export function convertJsonToSqlInsert(input: string, options: SqlInsertOptions): string {
  const { tableName = 'records', dialect = 'postgres', mode = 'INSERT', primaryKey = 'id' } = options;
  let data: any[] = [];

  const trimmed = input.trim();
  if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
    const parsed = JSON.parse(trimmed);
    data = Array.isArray(parsed) ? parsed : [parsed];
  } else {
    const lines = trimmed.split(/\r?\n/).filter(Boolean);
    if (lines.length >= 2) {
      const headers = lines[0].split(',').map((h) => h.trim().replace(/^["']|["']$/g, ''));
      data = lines.slice(1).map((line) => {
        const vals = line.split(',').map((v) => v.trim().replace(/^["']|["']$/g, ''));
        const obj: Record<string, any> = {};
        headers.forEach((h, idx) => {
          obj[h] = vals[idx] !== undefined ? vals[idx] : null;
        });
        return obj;
      });
    }
  }

  if (data.length === 0) {
    return '-- No records found to convert.';
  }

  const columns = Object.keys(data[0]);
  const quoteCol = (c: string) => (dialect === 'mysql' ? '`' + c + '`' : dialect === 'sqlserver' ? '[' + c + ']' : '"' + c + '"');

  function escapeSqlVal(val: any): string {
    if (val === null || val === undefined) return 'NULL';
    if (typeof val === 'number') return String(val);
    if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
    if (typeof val === 'object') return "'" + JSON.stringify(val).replace(/'/g, "''") + "'";
    return "'" + String(val).replace(/'/g, "''") + "'";
  }

  if (mode === 'UPDATE') {
    return data
      .map((row) => {
        const pkVal = row[primaryKey] !== undefined ? escapeSqlVal(row[primaryKey]) : '1';
        const sets = columns
          .filter((c) => c !== primaryKey)
          .map((c) => quoteCol(c) + ' = ' + escapeSqlVal(row[c]))
          .join(', ');
        return 'UPDATE ' + quoteCol(tableName) + ' SET ' + sets + ' WHERE ' + quoteCol(primaryKey) + ' = ' + pkVal + ';';
      })
      .join('\n');
  }

  const colNames = columns.map(quoteCol).join(', ');
  const valuesList = data
    .map((row) => {
      const rowVals = columns.map((c) => escapeSqlVal(row[c])).join(', ');
      return '  (' + rowVals + ')';
    })
    .join(',\n');

  return 'INSERT INTO ' + quoteCol(tableName) + ' (' + colNames + ')\nVALUES\n' + valuesList + ';';
}
