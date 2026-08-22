export function recommendSqlIndexes(sql: string): {
  tableName: string;
  recommendedIndexName: string;
  createIndexSql: string;
  indexedColumns: string[];
} {
  const clean = sql.replace(/\s+/g, ' ').trim();
  const tableMatch = clean.match(/FROM\s+([a-zA-Z0-9_]+)/i);
  const tableName = tableMatch ? tableMatch[1] : 'table_name';

  const whereMatch = clean.match(/WHERE\s+(.+?)(?:GROUP|ORDER|LIMIT|$)/i);
  const columns: string[] = [];

  if (whereMatch) {
    const conditions = whereMatch[1].split(/\s+AND\s+/i);
    for (const cond of conditions) {
      const colMatch = cond.match(/^([a-zA-Z0-9_]+)/);
      if (colMatch && !columns.includes(colMatch[1])) {
        columns.push(colMatch[1]);
      }
    }
  }

  const indexCols = columns.length > 0 ? columns : ['id'];
  const recommendedIndexName = `idx_${tableName}_${indexCols.join('_')}`;
  const createIndexSql = `CREATE INDEX ${recommendedIndexName} ON ${tableName} (${indexCols.join(', ')});`;

  return {
    tableName,
    recommendedIndexName,
    createIndexSql,
    indexedColumns: indexCols,
  };
}
