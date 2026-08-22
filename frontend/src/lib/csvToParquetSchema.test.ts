import { describe, it, expect } from 'vitest';
import { csvToParquetSchema } from './csvToParquetSchema';

describe('csvToParquetSchema', () => {
  it('generates PyArrow Parquet schema from CSV sample', () => {
    const csv = 'id,name,score,is_active\n1,Alice,95.5,true';
    const schema = csvToParquetSchema(csv);
    expect(schema).toContain("pa.field('id', pa.int64())");
    expect(schema).toContain("pa.field('score', pa.float64())");
    expect(schema).toContain("pa.field('is_active', pa.bool_())");
  });
});
