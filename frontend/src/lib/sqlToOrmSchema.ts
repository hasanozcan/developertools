export function convertSqlToOrm(sql: string, target: 'prisma' | 'drizzle' = 'prisma'): string {
  const tableMatch = sql.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([\w`"\[\]]+)\s*\(([\s\S]*?)\);?/i);
  if (!tableMatch) return '// Error: Could not find valid CREATE TABLE statement.';

  const tableName = tableMatch[1].replace(/[`"\[\]]/g, '');
  const body = tableMatch[2];
  const columnLines = body.split(/[\n,]/).map(l => l.trim()).filter(l => l && !l.startsWith('--') && !l.toUpperCase().startsWith('PRIMARY KEY') && !l.toUpperCase().startsWith('CONSTRAINT'));

  if (target === 'prisma') {
    const lines = [`model ${capitalize(tableName)} {`];
    for (const col of columnLines) {
      const parts = col.replace(/,/g, '').split(/\s+/);
      const name = parts[0]?.replace(/[`"\[\]]/g, '');
      const type = (parts[1] || '').toUpperCase();
      const isPk = col.toUpperCase().includes('PRIMARY KEY');
      if (name) {
        lines.push(`  ${name} ${mapSqlToPrismaType(type)}${isPk ? ' @id @default(autoincrement())' : ''}`);
      }
    }
    lines.push('}');
    return lines.join('\n');
  }

  const lines = [
    `import { pgTable, serial, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core';`,
    '',
    `export const ${tableName} = pgTable('${tableName}', {`,
  ];
  for (const col of columnLines) {
    const parts = col.replace(/,/g, '').split(/\s+/);
    const name = parts[0]?.replace(/[`"\[\]]/g, '');
    const type = (parts[1] || '').toUpperCase();
    const isPk = col.toUpperCase().includes('PRIMARY KEY');
    if (name) {
      lines.push(`  ${name}: ${mapSqlToDrizzleType(type, name, isPk)},`);
    }
  }
  lines.push('});');
  return lines.join('\n');
}

function mapSqlToPrismaType(sqlType: string): string {
  if (sqlType.includes('INT')) return 'Int';
  if (sqlType.includes('VARCHAR') || sqlType.includes('TEXT')) return 'String';
  if (sqlType.includes('BOOL')) return 'Boolean';
  if (sqlType.includes('TIME') || sqlType.includes('DATE')) return 'DateTime';
  if (sqlType.includes('FLOAT') || sqlType.includes('DECIMAL')) return 'Float';
  return 'String';
}

function mapSqlToDrizzleType(sqlType: string, name: string, isPk: boolean): string {
  if (isPk && sqlType.includes('INT')) return `serial('${name}').primaryKey()`;
  if (sqlType.includes('INT')) return `integer('${name}')`;
  if (sqlType.includes('VARCHAR') || sqlType.includes('TEXT')) return `text('${name}')`;
  if (sqlType.includes('BOOL')) return `boolean('${name}')`;
  return `text('${name}')`;
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
