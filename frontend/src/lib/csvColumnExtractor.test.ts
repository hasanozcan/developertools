import { describe, it, expect } from 'vitest';
import { extractCsvColumns } from './csvColumnExtractor';

describe('csvColumnExtractor', () => {
  it('should extract only specified columns from CSV data', () => {
    const csv = `id,name,email,created_at
1,Alice,alice@example.com,2026-01-01
2,Bob,bob@example.com,2026-01-02`;

    const extracted = extractCsvColumns(csv, ['name', 'email']);
    expect(extracted).toBe('name,email\nAlice,alice@example.com\nBob,bob@example.com');
  });
});
