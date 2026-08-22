import { describe, it, expect } from 'vitest';
import { sqlToMongodb } from './sqlToMongodb';

describe('sqlToMongodb', () => {
  it('converts SQL SELECT queries into MongoDB find() syntax', () => {
    const sql = "SELECT name, email FROM users WHERE active = true LIMIT 10";
    const mongo = sqlToMongodb(sql);
    expect(mongo).toContain('db.users.find(');
    expect(mongo).toContain('"active": true');
    expect(mongo).toContain('.limit(10)');
  });
});
