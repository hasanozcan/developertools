import { describe, it, expect } from 'vitest';
import { convertJsonToSql } from './jsonToSql';

describe('jsonToSql', () => {
  const sampleJson = JSON.stringify([
    { id: 1, name: 'Alice', is_admin: true, balance: 1450.5, created_at: '2026-01-15T10:00:00Z' },
    { id: 2, name: 'Bob', is_admin: false, balance: 250.0, created_at: '2026-02-20T14:30:00Z' },
  ]);

  it('generates CREATE TABLE and batch INSERT for PostgreSQL', () => {
    const result = convertJsonToSql(sampleJson, {
      tableName: 'users',
      dialect: 'postgresql',
      generateCreateTable: true,
      generateInsert: true,
      batchInsert: true,
      quoteIdentifiers: true,
    });

    expect(result).toContain('CREATE TABLE "users"');
    expect(result).toContain('"id" INTEGER');
    expect(result).toContain('"name" VARCHAR(255)');
    expect(result).toContain('"is_admin" BOOLEAN');
    expect(result).toContain('INSERT INTO "users"');
    expect(result).toContain("(1, 'Alice', TRUE, 1450.5, '2026-01-15T10:00:00Z')");
  });
});
