export interface SqlExplanation {
  type: string;
  targetTable: string;
  selectedColumns: string[];
  joins: string[];
  filters: string[];
  groupBy: string[];
  orderBy: string[];
  summary: string;
}

export function explainSqlQuery(sql: string): SqlExplanation {
  const clean = sql.replace(/\s+/g, ' ').trim();
  const selectMatch = clean.match(/SELECT\s+(.+?)\s+FROM\s+([a-zA-Z0-9_]+)/i);

  const targetTable = selectMatch ? selectMatch[2] : 'unknown';
  const selectedColumns = selectMatch ? selectMatch[1].split(',').map((c) => c.trim()) : [];

  const joinMatches = clean.match(/(?:INNER|LEFT|RIGHT|FULL)?\s*JOIN\s+[a-zA-Z0-9_]+\s+ON\s+[^\s]+/gi) || [];
  const whereMatch = clean.match(/WHERE\s+(.+?)(?:GROUP\s+BY|ORDER\s+BY|LIMIT|$)/i);
  const filters = whereMatch ? whereMatch[1].split(/\s+AND\s+/i).map((f) => f.trim()) : [];

  const groupMatch = clean.match(/GROUP\s+BY\s+(.+?)(?:ORDER\s+BY|LIMIT|$)/i);
  const groupBy = groupMatch ? groupMatch[1].split(',').map((g) => g.trim()) : [];

  const orderMatch = clean.match(/ORDER\s+BY\s+(.+?)(?:LIMIT|$)/i);
  const orderBy = orderMatch ? orderMatch[1].split(',').map((o) => o.trim()) : [];

  const summary = `Queries ${selectedColumns.length} column(s) from table '${targetTable}' with ${joinMatches.length} join(s) and ${filters.length} filter condition(s).`;

  return {
    type: 'SELECT',
    targetTable,
    selectedColumns,
    joins: joinMatches,
    filters,
    groupBy,
    orderBy,
    summary,
  };
}
