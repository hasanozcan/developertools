import { describe, expect, it } from 'vitest';
import { mongodbToSql } from './mongodbToSql';

describe('mongodbToSql', () => {
  it('translates mongo find filter to SQL WHERE clause', () => {
    const q = '{"status":"active","age":{"$gte":18}}';
    const sql = mongodbToSql(q, 'members');
    expect(sql).toBe("SELECT * FROM members WHERE status = 'active' AND age >= 18;");
  });
});
