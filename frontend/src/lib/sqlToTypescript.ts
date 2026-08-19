export function sqlTableToTypeScript(sql: string, interfaceNameOverride?: string): string {
  const tableMatch = sql.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?:`|"|')?([a-zA-Z0-9_]+)(?:`|"|')?\s*\(([\s\S]*)\)\s*[^)]*$/i)
    || sql.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?:`|"|')?([a-zA-Z0-9_]+)(?:`|"|')?\s*\(([\s\S]*)\)/i);
  if (!tableMatch) {
    throw new Error('Could not find CREATE TABLE statement in SQL');
  }

  const tableName = tableMatch[1];
  const body = tableMatch[2];

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const interfaceName = interfaceNameOverride?.trim() || capitalize(tableName.replace(/s$/, ''));

  const fields: string[] = [];
  const lines = body.split('\n');

  for (const line of lines) {
    const trimmed = line.trim().replace(/,$/, '');
    if (!trimmed || trimmed.toUpperCase().startsWith('PRIMARY KEY') || trimmed.toUpperCase().startsWith('FOREIGN KEY') || trimmed.toUpperCase().startsWith('CONSTRAINT') || trimmed.toUpperCase().startsWith('KEY') || trimmed.toUpperCase().startsWith('INDEX') || trimmed.toUpperCase().startsWith('UNIQUE')) {
      continue;
    }

    const colMatch = trimmed.match(/^(?:`|"|')?([a-zA-Z0-9_]+)(?:`|"|')?\s+([a-zA-Z0-9_()]+)(.*)$/);
    if (!colMatch) continue;

    const colName = colMatch[1];
    const colType = colMatch[2].toUpperCase();
    const colModifiers = colMatch[3].toUpperCase();

    const isRequired = trimmed.toUpperCase().includes('NOT NULL') || trimmed.toUpperCase().includes('PRIMARY KEY');
    const isNullable = !isRequired;

    let tsType = 'string';
    if (colType.includes('INT') || colType.includes('FLOAT') || colType.includes('DOUBLE') || colType.includes('DECIMAL') || colType.includes('NUMERIC') || colType.includes('SERIAL')) {
      tsType = 'number';
    } else if (colType.includes('BOOL')) {
      tsType = 'boolean';
    } else if (colType.includes('JSON')) {
      tsType = 'Record<string, unknown>';
    } else if (colType.includes('DATE') || colType.includes('TIME')) {
      tsType = 'Date | string';
    }

    fields.push(`  ${colName}${isNullable ? '?' : ''}: ${tsType};`);
  }

  return `export interface ${interfaceName} {\n${fields.join('\n')}\n}`;
}
