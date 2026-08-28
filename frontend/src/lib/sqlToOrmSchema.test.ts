import { describe, it, expect } from 'vitest';
import { convertSqlToOrm } from './sqlToOrmSchema';

describe('sqlToOrmSchema', () => {
  it('converts SQL DDL to Prisma schema model', () => {
    const sql = 'CREATE TABLE users ( id INT PRIMARY KEY, name VARCHAR(255), is_active BOOLEAN );';
    const prisma = convertSqlToOrm(sql, 'prisma');
    expect(prisma).toContain('model Users {');
    expect(prisma).toContain('id Int @id');
    expect(prisma).toContain('name String');
  });

  it('converts SQL DDL to Drizzle table declaration', () => {
    const sql = 'CREATE TABLE posts ( id INT PRIMARY KEY, title TEXT );';
    const drizzle = convertSqlToOrm(sql, 'drizzle');
    expect(drizzle).toContain("export const posts = pgTable('posts', {");
    expect(drizzle).toContain("id: serial('id').primaryKey()");
  });
});
