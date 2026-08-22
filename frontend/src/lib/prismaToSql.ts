export function prismaToSql(prismaSchema: string): string {
  const lines = prismaSchema.split(/\r?\n/);
  const sqlStatements: string[] = [];
  let currentTable = '';
  let columns: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('//')) continue;

    const modelMatch = line.match(/^model\s+([a-zA-Z0-9_]+)\s*\{/);
    if (modelMatch) {
      currentTable = modelMatch[1].toLowerCase();
      columns = [];
      continue;
    }

    if (line === '}') {
      if (currentTable && columns.length > 0) {
        sqlStatements.push(`CREATE TABLE ${currentTable} (\n${columns.join(',\n')}\n);`);
      }
      currentTable = '';
      continue;
    }

    if (currentTable) {
      const fieldMatch = line.match(/^([a-zA-Z0-9_]+)\s+([a-zA-Z0-9_]+)(\?)?(.*)$/);
      if (fieldMatch) {
        const name = fieldMatch[1];
        const type = fieldMatch[2];
        const isOptional = !!fieldMatch[3];
        const attributes = fieldMatch[4];

        let sqlType = 'VARCHAR(255)';
        if (type === 'Int') sqlType = attributes.includes('@id') ? 'SERIAL PRIMARY KEY' : 'INTEGER';
        else if (type === 'String') sqlType = attributes.includes('@id') ? 'VARCHAR(255) PRIMARY KEY' : 'VARCHAR(255)';
        else if (type === 'Boolean') sqlType = 'BOOLEAN';
        else if (type === 'DateTime') sqlType = 'TIMESTAMP';

        if (!isOptional && !sqlType.includes('PRIMARY KEY')) {
          sqlType += ' NOT NULL';
        }

        columns.push(`  ${name} ${sqlType}`);
      }
    }
  }

  return sqlStatements.join('\n\n');
}
