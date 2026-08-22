export function jsonToSqlDdl(jsonString: string, tableName = 'records'): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonString);
  } catch (err: unknown) {
    throw new Error('Invalid JSON: ' + (err instanceof Error ? err.message : String(err)));
  }

  const targetObj = Array.isArray(parsed) ? parsed[0] : parsed;
  if (!targetObj || typeof targetObj !== 'object') {
    throw new Error('JSON must be an object or array of objects');
  }

  const columns: string[] = ['  id SERIAL PRIMARY KEY'];

  for (const [key, value] of Object.entries(targetObj)) {
    if (key.toLowerCase() === 'id') continue;

    let sqlType = 'VARCHAR(255)';
    if (typeof value === 'boolean') sqlType = 'BOOLEAN';
    else if (typeof value === 'number') sqlType = Number.isInteger(value) ? 'INTEGER' : 'NUMERIC(10, 2)';
    else if (typeof value === 'object' && value !== null) sqlType = 'JSONB';
    else if (typeof value === 'string') {
      if (value.length > 255) sqlType = 'TEXT';
      else if (/^\d{4}-\d{2}-\d{2}/.test(value)) sqlType = 'TIMESTAMP';
    }

    columns.push(`  ${key} ${sqlType}`);
  }

  return `CREATE TABLE ${tableName} (\n${columns.join(',\n')}\n);`;
}
