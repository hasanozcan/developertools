import { describe, it, expect } from 'vitest';
import { explainSqlQuery } from './sqlExplainer';

describe('sqlExplainer', () => {
  it('parses SQL query elements into clear human-readable components', () => {
    const sql = "SELECT id, name FROM users WHERE active = true ORDER BY created_at DESC";
    const res = explainSqlQuery(sql);
    expect(res.targetTable).toBe('users');
    expect(res.selectedColumns).toEqual(['id', 'name']);
    expect(res.filters).toEqual(['active = true']);
  });
});
