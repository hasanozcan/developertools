import { describe, it, expect } from 'vitest';
import { convertPostgresToMysql } from './postgresToMysql';

describe('postgresToMysql', () => {
  it('converts Postgres data types to MySQL syntax', () => {
    const pg = 'CREATE TABLE "users" (id SERIAL PRIMARY KEY, is_active BOOLEAN, data JSONB);';
    const mysql = convertPostgresToMysql(pg);
    expect(mysql).toContain('INT AUTO_INCREMENT PRIMARY KEY');
    expect(mysql).toContain('is_active TINYINT(1)');
    expect(mysql).toContain('data JSON');
  });
});
