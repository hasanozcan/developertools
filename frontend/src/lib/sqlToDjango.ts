export function sqlToDjango(sql: string): string {
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

        let djField = 'models.CharField(max_length=255)';
        if (colType.includes('int')) djField = 'models.IntegerField()';
        else if (colType.includes('bool')) djField = 'models.BooleanField(default=False)';
        else if (colType.includes('datetime') || colType.includes('timestamp')) djField = 'models.DateTimeField(auto_now_add=True)';
        else if (colType.includes('text')) djField = 'models.TextField()';

        fields.push(`    ${colName} = ${djField}`);
      }
    }

    const className = tableName.charAt(0).toUpperCase() + tableName.slice(1);
    models.push(`class ${className}(models.Model):\n${fields.join('\n')}\n\n    class Meta:\n        db_table = '${tableName}'`);
  }

  return models.length > 0
    ? `from django.db import models\n\n` + models.join('\n\n')
    : '# No valid SQL CREATE TABLE found';
}
