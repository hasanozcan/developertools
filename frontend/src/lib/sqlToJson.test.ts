import { describe, it, expect } from 'vitest';
import { sqlToJson } from './sqlToJson';

describe('sqlToJson', () => {
  it('should parse single and multi-row INSERT INTO queries', () => {
    const sql = `INSERT INTO users (id, name, is_admin, score) VALUES
(1, 'Alice', true, 95.5),
(2, 'Bob', false, 80);`;

    const records = sqlToJson(sql);
    expect(records.length).toBe(2);
    expect(records[0]).toEqual({
      id: 1,
      name: 'Alice',
      is_admin: true,
      score: 95.5,
    });
    expect(records[1]).toEqual({
      id: 2,
      name: 'Bob',
      is_admin: false,
      score: 80,
    });
  });

  it('should handle NULL values and escaped characters', () => {
    const sql = `INSERT INTO logs (id, message, trace) VALUES (10, 'Error occurred', NULL);`;
    const records = sqlToJson(sql);
    expect(records.length).toBe(1);
    expect(records[0]).toEqual({
      id: 10,
      message: 'Error occurred',
      trace: null,
    });
  });
});
