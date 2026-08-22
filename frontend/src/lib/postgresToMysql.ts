export function convertPostgresToMysql(pgSql: string): string {
  return pgSql
    .replace(/SERIAL\s+PRIMARY\s+KEY/gi, 'INT AUTO_INCREMENT PRIMARY KEY')
    .replace(/BIGSERIAL\s+PRIMARY\s+KEY/gi, 'BIGINT AUTO_INCREMENT PRIMARY KEY')
    .replace(/JSONB/gi, 'JSON')
    .replace(/BOOLEAN/gi, 'TINYINT(1)')
    .replace(/TIMESTAMP\s+WITH\s+TIME\s+ZONE/gi, 'DATETIME')
    .replace(/TEXT\[\]/gi, 'JSON')
    .replace(/"([a-zA-Z0-9_]+)"/g, '`$1`');
}
