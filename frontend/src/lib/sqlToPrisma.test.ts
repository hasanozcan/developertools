import { describe, expect, it } from 'vitest';
import { sqlToPrisma } from './sqlToPrisma';

describe('sqlToPrisma', () => {
  it('converts SQL table to Prisma model schema', () => {
    const sql = `CREATE TABLE users (
      id INT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP
    );`;
    const schema = sqlToPrisma(sql);
    expect(schema).toContain('model Users {');
    expect(schema).toContain('id Int @id @default(autoincrement())');
    expect(schema).toContain('email String @unique');
  });
});
