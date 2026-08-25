export function sqlToDrizzle(sql: string, dialect: 'pg' | 'mysql' | 'sqlite' = 'pg'): string {
  const tables: string[] = [];
  const tableMatches = sql.matchAll(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?:["'`]?(\w+)["'`]?\.)?["'`]?(\w+)["'`]?\s*\(([\s\S]*?)\);/gi);

  for (const match of tableMatches) {
    const tableName = match[2];
    const body = match[3];
    const fields: string[] = [];

    const lines = body.split('\n').map(l => l.trim().replace(/,$/, '')).filter(Boolean);
    for (const line of lines) {
      if (/^(?:PRIMARY\s+KEY|FOREIGN\s+KEY|CONSTRAINT|INDEX|UNIQUE)/i.test(line)) continue;
      const colMatch = line.match(/^["'`]?(\w+)["'`]?\s+([A-Za-z0-9_()]+)(.*)$/);
      if (colMatch) {
        const colName = colMatch[1];
        const colType = colMatch[2].toLowerCase();
        const colRest = colMatch[3] || '';

        let drizzleCol = `text('${colName}')`;
        if (colType.includes('serial') || (colType.includes('int') && /PRIMARY\s+KEY/i.test(colRest))) {
          drizzleCol = `serial('${colName}').primaryKey()`;
        } else if (colType.includes('int')) {
          drizzleCol = `integer('${colName}')`;
        } else if (colType.includes('bool')) {
          drizzleCol = `boolean('${colName}')`;
        } else if (colType.includes('timestamp')) {
          drizzleCol = `timestamp('${colName}')`;
        }

        if (/NOT\s+NULL/i.test(colRest) && !drizzleCol.includes('.primaryKey()')) {
          drizzleCol += '.notNull()';
        }

        fields.push(`  ${colName}: ${drizzleCol},`);
      }
    }

    tables.push(`export const ${tableName} = pgTable('${tableName}', {\n${fields.join('\n')}\n});`);
  }

  return tables.length > 0
    ? `import { pgTable, serial, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core';\n\n` + tables.join('\n\n')
    : '// No valid SQL CREATE TABLE statements found';
}
