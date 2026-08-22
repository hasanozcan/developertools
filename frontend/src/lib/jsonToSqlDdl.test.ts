import { describe, it, expect } from 'vitest';
import { jsonToSqlDdl } from './jsonToSqlDdl';

describe('jsonToSqlDdl', () => {
  it('generates CREATE TABLE SQL schema from JSON sample', () => {
    const json = JSON.stringify({ name: 'Alice', age: 30, is_admin: true, created_at: '2026-01-01' });
    const ddl = jsonToSqlDdl(json, 'users');
    expect(ddl).toContain('CREATE TABLE users (');
    expect(ddl).toContain('name VARCHAR(255)');
    expect(ddl).toContain('age INTEGER');
    expect(ddl).toContain('is_admin BOOLEAN');
    expect(ddl).toContain('created_at TIMESTAMP');
  });
});
