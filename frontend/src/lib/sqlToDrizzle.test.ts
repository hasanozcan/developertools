import { describe, expect, it } from 'vitest';
import { sqlToDrizzle } from './sqlToDrizzle';

describe('sqlToDrizzle', () => {
  it('converts SQL table to Drizzle schema', () => {
    const sql = `CREATE TABLE posts (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      published BOOLEAN
    );`;
    const code = sqlToDrizzle(sql);
    expect(code).toContain("export const posts = pgTable('posts'");
    expect(code).toContain("id: serial('id').primaryKey()");
  });
});
