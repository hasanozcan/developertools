import { describe, it, expect } from 'vitest';
import { minifySqlQuery } from './sqlMinifier';

describe('sqlMinifier', () => {
  it('should strip comments and collapse spaces in SQL query', () => {
    const rawSql = `
      -- Fetch all active customers
      SELECT
        users.id,
        users.email, /* User email */
        users.created_at
      FROM users
      WHERE users.status = 'active'
        AND users.age >= 18;
    `;
    const min = minifySqlQuery(rawSql);
    expect(min).toBe("SELECT users.id,users.email,users.created_at FROM users WHERE users.status = 'active' AND users.age >= 18;");
  });
});
