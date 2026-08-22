import { describe, it, expect } from 'vitest';
import { prismaToSql } from './prismaToSql';

describe('prismaToSql', () => {
  it('converts Prisma models into standard SQL CREATE TABLE statements', () => {
    const prisma = `
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
`;
    const sql = prismaToSql(prisma);
    expect(sql).toContain('CREATE TABLE user (');
    expect(sql).toContain('id SERIAL PRIMARY KEY');
    expect(sql).toContain('email VARCHAR(255) NOT NULL');
  });
});
