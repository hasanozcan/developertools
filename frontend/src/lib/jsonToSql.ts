// JSON to SQL Converter (INSERT and CREATE TABLE)

export type SqlDialect = 'postgresql' | 'mysql' | 'sqlite' | 'sqlserver';

export interface JsonToSqlOptions {
  tableName: string;
  dialect: SqlDialect;
  generateCreateTable: boolean;
  generateInsert: boolean;
  batchInsert: boolean;
  quoteIdentifiers: boolean;
}

function inferSqlType(value: unknown, dialect: SqlDialect): string {
  if (value === null || value === undefined) {
    return 'VARCHAR(255)';
  }

  if (typeof value === 'boolean') {
    return dialect === 'sqlite' ? 'INTEGER' : 'BOOLEAN';
  }

  if (typeof value === 'number') {
    if (Number.isInteger(value)) {
      return value > 2147483647 || value < -2147483648 ? 'BIGINT' : 'INTEGER';
    }
    return dialect === 'postgresql' ? 'NUMERIC' : 'DECIMAL(10,2)';
  }

  if (typeof value === 'string') {
    // ISO date/time format
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
      return dialect === 'postgresql' ? 'TIMESTAMP WITH TIME ZONE' : 'DATETIME';
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return 'DATE';
    }
    if (value.length > 255) {
      return 'TEXT';
    }
    return 'VARCHAR(255)';
  }

  if (typeof value === 'object') {
    return dialect === 'postgresql' ? 'JSONB' : 'TEXT';
  }

  return 'VARCHAR(255)';
}

function formatSqlIdentifier(name: string, dialect: SqlDialect, quote: boolean): string {
  if (!quote) return name;
  if (dialect === 'mysql') return `\`${name}\``;
  if (dialect === 'sqlserver') return `[${name}]`;
  return `"${name}"`;
}

function formatSqlValue(value: unknown): string {
  if (value === null || value === undefined) return 'NULL';
  if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'object') return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
  return `'${String(value).replace(/'/g, "''")}'`;
}

export function convertJsonToSql(jsonStr: string, options: JsonToSqlOptions): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr);
  } catch (err: any) {
    throw new Error(`Invalid JSON: ${err.message}`);
  }

  const rows: Record<string, unknown>[] = Array.isArray(parsed)
    ? (parsed.filter((item) => item !== null && typeof item === 'object') as Record<string, unknown>[])
    : parsed !== null && typeof parsed === 'object'
      ? [parsed as Record<string, unknown>]
      : [];

  if (rows.length === 0) {
    throw new Error('JSON must be an object or an array of objects.');
  }

  // Aggregate all distinct column keys across all rows
  const columnTypes = new Map<string, string>();
  for (const row of rows) {
    for (const [col, val] of Object.entries(row)) {
      if (!columnTypes.has(col) || columnTypes.get(col) === 'VARCHAR(255)') {
        columnTypes.set(col, inferSqlType(val, options.dialect));
      }
    }
  }

  const columns = Array.from(columnTypes.keys());
  const tableName = options.tableName.trim() || 'my_table';
  const tableIdent = formatSqlIdentifier(tableName, options.dialect, options.quoteIdentifiers);

  const output: string[] = [];

  // 1. CREATE TABLE
  if (options.generateCreateTable) {
    const colDefs = columns.map((col) => {
      const colIdent = formatSqlIdentifier(col, options.dialect, options.quoteIdentifiers);
      const colType = columnTypes.get(col) || 'VARCHAR(255)';
      return `  ${colIdent} ${colType}`;
    });

    output.push(`CREATE TABLE ${tableIdent} (\n${colDefs.join(',\n')}\n);`);
    output.push('');
  }

  // 2. INSERT statements
  if (options.generateInsert) {
    const colIdents = columns.map((c) => formatSqlIdentifier(c, options.dialect, options.quoteIdentifiers)).join(', ');

    if (options.batchInsert && rows.length > 1) {
      const valuesList = rows
        .map((row) => {
          const rowVals = columns.map((col) => formatSqlValue(row[col])).join(', ');
          return `  (${rowVals})`;
        })
        .join(',\n');

      output.push(`INSERT INTO ${tableIdent} (${colIdents})\nVALUES\n${valuesList};`);
    } else {
      for (const row of rows) {
        const rowVals = columns.map((col) => formatSqlValue(row[col])).join(', ');
        output.push(`INSERT INTO ${tableIdent} (${colIdents}) VALUES (${rowVals});`);
      }
    }
  }

  return output.join('\n').trim();
}
