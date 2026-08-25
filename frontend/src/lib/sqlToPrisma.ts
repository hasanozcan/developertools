export function sqlToPrisma(sql: string): string {
  const models: string[] = [];
  const tableMatches = sql.matchAll(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?:["'`]?(\w+)["'`]?\.)?["'`]?(\w+)["'`]?\s*\(([\s\S]*?)\);/gi);

  for (const match of tableMatches) {
    const tableName = match[2];
    const body = match[3];
    const fields: string[] = [];

    const lines = body.split(',\n').map(l => l.trim()).filter(Boolean);
    for (const line of lines) {
      if (/^(?:PRIMARY\s+KEY|FOREIGN\s+KEY|CONSTRAINT|INDEX|UNIQUE)/i.test(line)) continue;
      const colMatch = line.match(/^["'`]?(\w+)["'`]?\s+([A-Za-z0-9_()]+)(.*)$/);
      if (colMatch) {
        const colName = colMatch[1];
        const colType = colMatch[2].toLowerCase();
        const colRest = colMatch[3] || '';

        let prismaType = 'String';
        if (colType.includes('int')) prismaType = 'Int';
        else if (colType.includes('bool')) prismaType = 'Boolean';
        else if (colType.includes('date') || colType.includes('time')) prismaType = 'DateTime';
        else if (colType.includes('float') || colType.includes('double') || colType.includes('decimal')) prismaType = 'Float';
        else if (colType.includes('json')) prismaType = 'Json';

        let attr = '';
        if (/PRIMARY\s+KEY/i.test(colRest)) attr += ' @id @default(autoincrement())';
        if (/UNIQUE/i.test(colRest)) attr += ' @unique';
        if (/DEFAULT/i.test(colRest) && !attr.includes('@default')) attr += ' @default(...)';

        fields.push(`  ${colName} ${prismaType}${attr}`);
      }
    }

    models.push(`model ${tableName.charAt(0).toUpperCase() + tableName.slice(1)} {\n${fields.join('\n')}\n}`);
  }

  return models.length > 0
    ? `datasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\ngenerator client {\n  provider = "prisma-client-js"\n}\n\n` + models.join('\n\n')
    : '// No valid CREATE TABLE statements found in SQL';
}
