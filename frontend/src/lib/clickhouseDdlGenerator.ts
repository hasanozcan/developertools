export interface ClickhouseColumn {
  name: string;
  type: string;
}

export function generateClickhouseDdl(tableName: string, columns: ClickhouseColumn[], orderBy: string): string {
  const cols = columns.map(c => `    ${c.name} ${c.type}`).join(',\n');
  return `CREATE TABLE IF NOT EXISTS ${tableName} (
${cols}
) ENGINE = MergeTree()
ORDER BY (${orderBy});`;
}