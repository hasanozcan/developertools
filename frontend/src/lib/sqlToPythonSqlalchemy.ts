export function convertSqlToSqlalchemy(sqlDdl: string): string {
  const tableRegex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?["`]?([a-zA-Z0-9_]+)["`]?\s*\(([^;]+)\)/gi;
  let match: RegExpExecArray | null;
  const models: string[] = [];

  function toPascalCase(str: string): string {
    return str.replace(/(^|_)([a-z0-9])/gi, (_, __, c) => c.toUpperCase());
  }

  while ((match = tableRegex.exec(sqlDdl)) !== null) {
    const tableName = match[1];
    const columnsBody = match[2];
    const className = toPascalCase(tableName);
    const lines = columnsBody.split('\n');
    const fields: string[] = [];

    for (let line of lines) {
      line = line.trim().replace(/,$/, '');
      if (!line || /^PRIMARY\s+KEY/i.test(line) || /^CONSTRAINT/i.test(line)) continue;
      const parts = line.split(/\s+/);
      const colName = parts[0].replace(/["`]/g, '');
      const colType = (parts[1] || '').toUpperCase();
      const isPk = /PRIMARY\s+KEY/i.test(line);
      const isNullable = !/NOT\s+NULL/i.test(line);

      let saType = 'String(255)';
      if (/INT/i.test(colType)) saType = 'Integer';
      else if (/FLOAT|DOUBLE|NUMERIC/i.test(colType)) saType = 'Float';
      else if (/BOOL/i.test(colType)) saType = 'Boolean';
      else if (/TIME|DATE/i.test(colType)) saType = 'DateTime';
      else if (/TEXT/i.test(colType)) saType = 'Text';

      let attr = '    ' + colName + ' = Column(' + saType;
      if (isPk) attr += ', primary_key=True';
      if (!isNullable && !isPk) attr += ', nullable=False';
      attr += ')';
      fields.push(attr);
    }

    models.push('class ' + className + '(Base):\n    __tablename__ = "' + tableName + '"\n\n' + fields.join('\n'));
  }

  if (models.length === 0) return '# Please enter valid SQL CREATE TABLE DDL';
  return 'from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime, Text\nfrom sqlalchemy.orm import declarative_base\n\nBase = declarative_base()\n\n' + models.join('\n\n');
}
