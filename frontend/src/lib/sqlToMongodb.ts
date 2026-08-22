export function sqlToMongodb(sqlQuery: string): string {
  const query = sqlQuery.trim().replace(/;$/, '');
  const selectMatch = query.match(/^SELECT\s+(.+?)\s+FROM\s+([a-zA-Z0-9_]+)(?:\s+WHERE\s+(.+?))?(?:\s+LIMIT\s+(\d+))?$/i);

  if (!selectMatch) {
    return '// Unable to parse SQL query. Supported format: SELECT fields FROM table WHERE condition LIMIT n';
  }

  const fields = selectMatch[1].trim();
  const collection = selectMatch[2].trim();
  const whereClause = selectMatch[3]?.trim();
  const limit = selectMatch[4]?.trim();

  const filterObj: Record<string, unknown> = {};
  if (whereClause) {
    const conds = whereClause.split(/\s+AND\s+/i);
    for (const cond of conds) {
      const eqMatch = cond.match(/^([a-zA-Z0-9_]+)\s*=\s*(.+)$/);
      if (eqMatch) {
        const k = eqMatch[1];
        let v: unknown = eqMatch[2].replace(/^['"]|['"]$/g, '');
        if (v === 'true') v = true;
        else if (v === 'false') v = false;
        else if (!isNaN(Number(v))) v = Number(v);
        filterObj[k] = v;
      }
    }
  }

  const projectionObj: Record<string, number> = {};
  if (fields !== '*') {
    fields.split(',').forEach((f) => {
      const clean = f.trim();
      if (clean) projectionObj[clean] = 1;
    });
  }

  let result = `db.${collection}.find(${JSON.stringify(filterObj, null, 2)}`;
  if (Object.keys(projectionObj).length > 0) {
    result += `, ${JSON.stringify(projectionObj)}`;
  }
  result += ')';

  if (limit) {
    result += `.limit(${limit})`;
  }

  return result;
}
