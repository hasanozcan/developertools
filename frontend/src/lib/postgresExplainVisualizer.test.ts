import { describe, expect, it } from 'vitest';
import { parsePostgresExplainJson } from './postgresExplainVisualizer';

describe('postgresExplainVisualizer', () => {
  it('parses postgres EXPLAIN JSON tree', () => {
    const raw = JSON.stringify([{
      Plan: {
        'Node Type': 'Seq Scan',
        'Relation Name': 'users',
        'Total Cost': 15.50,
        'Actual Total Time': 0.12,
        'Actual Rows': 100
      }
    }]);
    const res = parsePostgresExplainJson(raw);
    expect(res.nodes[0].nodeType).toBe('Seq Scan');
    expect(res.nodes[0].relationName).toBe('users');
  });
});
