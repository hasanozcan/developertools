import { describe, it, expect } from 'vitest';
import { convertCsvToSqlInsert } from './csvToSqlInsert';

describe('csvToSqlInsert', () => {
  it('should convert CSV with headers to SQL INSERT query', () => {
    const csv = `id,name,active,score
1,John,true,98.5
2,Jane,false,NULL`;

    const sql = convertCsvToSqlInsert(csv, { tableName: 'users', dialect: 'postgres', batchSize: 50 });
    expect(sql).toContain('INSERT INTO users ("id", "name", "active", "score")');
    expect(sql).toContain("(1, 'John', TRUE, 98.5)");
    expect(sql).toContain("(2, 'Jane', FALSE, NULL)");
  });
});
