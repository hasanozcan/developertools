import { describe, it, expect } from 'vitest';
import { convertJsonToSqlInsert } from './jsonToSqlInsert';

describe('jsonToSqlInsert', () => {
  it('converts JSON array into SQL INSERT statement with proper escaping', () => {
    const json = JSON.stringify([
      { id: 1, name: "O'Reilly", active: true, balance: 120.5 },
      { id: 2, name: 'Alice Smith', active: false, balance: 0.0 },
    ]);

    const sql = convertJsonToSqlInsert(json, { tableName: 'users', dialect: 'postgres' });
    expect(sql).toContain('INSERT INTO "users" ("id", "name", "active", "balance")');
    expect(sql).toContain("'O''Reilly'");
    expect(sql).toContain('TRUE');
  });

  it('generates UPDATE statements when requested', () => {
    const json = JSON.stringify([{ id: 10, status: 'shipped' }]);
    const sql = convertJsonToSqlInsert(json, { tableName: 'orders', mode: 'UPDATE', primaryKey: 'id' });
    expect(sql).toContain('UPDATE "orders" SET "status" = \'shipped\' WHERE "id" = 10;');
  });
});
