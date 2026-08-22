import { describe, it, expect } from 'vitest';
import { slugifyToSqlIdentifier } from './sqlSlugifier';

describe('slugifyToSqlIdentifier', () => {
  it('converts mixed strings into valid PostgreSQL snake_case identifiers', () => {
    expect(slugifyToSqlIdentifier('User Orders & Invoices 2026!')).toBe('user_orders_invoices_2026');
  });
});