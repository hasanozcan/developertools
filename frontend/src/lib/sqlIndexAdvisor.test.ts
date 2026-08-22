import { describe, it, expect } from 'vitest';
import { recommendSqlIndexes } from './sqlIndexAdvisor';

describe('sqlIndexAdvisor', () => {
  it('recommends B-Tree composite index based on SQL filter columns', () => {
    const sql = "SELECT * FROM orders WHERE customer_id = 42 AND status = 'shipped'";
    const res = recommendSqlIndexes(sql);
    expect(res.tableName).toBe('orders');
    expect(res.indexedColumns).toContain('customer_id');
    expect(res.indexedColumns).toContain('status');
    expect(res.createIndexSql).toContain('CREATE INDEX idx_orders_customer_id_status');
  });
});
