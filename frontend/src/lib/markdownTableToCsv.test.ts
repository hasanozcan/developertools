import { describe, it, expect } from 'vitest';
import { markdownTableToCsv } from './markdownTableToCsv';

describe('markdownTableToCsv', () => {
  it('should parse markdown table and convert to CSV format', () => {
    const md = `
      | ID | Product Name | Price |
      |---|---|---|
      | 1 | Laptop, Pro | $1200 |
      | 2 | Mouse | $25 |
    `;
    const csv = markdownTableToCsv(md);
    expect(csv).toContain('ID,Product Name,Price');
    expect(csv).toContain('1,"Laptop, Pro",$1200');
    expect(csv).toContain('2,Mouse,$25');
  });
});
