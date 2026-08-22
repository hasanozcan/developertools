import { describe, it, expect } from 'vitest';
import { generateClickhouseDdl } from './clickhouseDdlGenerator';

describe('generateClickhouseDdl', () => {
  it('generates Clickhouse MergeTree table DDL', () => {
    const ddl = generateClickhouseDdl('events', [
      { name: 'event_id', type: 'UUID' },
      { name: 'user_id', type: 'UInt64' },
      { name: 'created_at', type: 'DateTime64(3)' },
    ], 'event_id, created_at');
    expect(ddl).toContain('ENGINE = MergeTree()');
    expect(ddl).toContain('ORDER BY (event_id, created_at)');
  });
});