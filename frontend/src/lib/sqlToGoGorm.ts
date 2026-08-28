export function convertSqlToGoGorm(sqlDdl: string): string {
  const tableRegex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?["`]?([a-zA-Z0-9_]+)["`]?\s*\(([^;]+)\)/gi;
  let match: RegExpExecArray | null;
  const structs: string[] = [];

  function toPascalCase(str: string): string {
    return str.replace(/(^|_)([a-z0-9])/gi, (_, __, c) => c.toUpperCase());
  }

  while ((match = tableRegex.exec(sqlDdl)) !== null) {
    const tableName = match[1];
    const columnsBody = match[2];
    const structName = toPascalCase(tableName);
    const lines = columnsBody.split('\n');
    const fields: string[] = [];

    for (let line of lines) {
      line = line.trim().replace(/,$/, '');
      if (!line || /^PRIMARY\s+KEY/i.test(line) || /^CONSTRAINT/i.test(line) || /^KEY/i.test(line)) continue;
      const parts = line.split(/\s+/);
      const colName = parts[0].replace(/["`]/g, '');
      const colType = (parts[1] || '').toUpperCase();
      const isPk = /PRIMARY\s+KEY/i.test(line);

      let goType = 'string';
      if (/INT/i.test(colType)) goType = isPk ? 'uint' : 'int';
      else if (/FLOAT|DOUBLE|DECIMAL|NUMERIC/i.test(colType)) goType = 'float64';
      else if (/BOOL/i.test(colType)) goType = 'bool';
      else if (/TIME|DATE/i.test(colType)) goType = 'time.Time';
      else if (/JSON/i.test(colType)) goType = 'datatypes.JSON';

      let gormTag = 'gorm:"column:' + colName;
      if (isPk) gormTag += ';primaryKey;autoIncrement';
      gormTag += '" json:"' + colName + '"';

      fields.push('\t' + toPascalCase(colName) + ' ' + goType + ' ' + '`' + gormTag + '`');
    }

    structs.push('type ' + structName + ' struct {\n' + fields.join('\n') + '\n}\n\nfunc (' + structName + ') TableName() string {\n\treturn "' + tableName + '"\n}');
  }

  if (structs.length === 0) return '// Please enter valid SQL CREATE TABLE DDL';
  return 'package models\n\nimport (\n\t"time"\n\t"gorm.io/gorm"\n)\n\n' + structs.join('\n\n');
}
