import { describe, expect, it } from 'vitest';
import { excelTextToJson, parseDelimitedTable, tableRowsToJson } from './excelToJson';

describe('excelToJson', () => {
  it('parses CSV / Excel tabular data to structured JSON array', () => {
    const csv = `id,name,role,active,score
1,"Alice Smith",Admin,true,98.5
2,"Bob Jones",Editor,false,76`;

    const json = excelTextToJson(csv);
    expect(json).toHaveLength(2);
    expect(json[0]).toEqual({
      id: 1,
      name: 'Alice Smith',
      role: 'Admin',
      active: true,
      score: 98.5,
    });
    expect(json[1]).toEqual({
      id: 2,
      name: 'Bob Jones',
      role: 'Editor',
      active: false,
      score: 76,
    });
  });

  it('parses TSV (tab-separated) copied directly from Excel spreadsheets', () => {
    const tsv = "Product\tPrice\tQuantity\nLaptop\t1200\t5\nMouse\t25\t50";
    const json = excelTextToJson(tsv);
    expect(json).toHaveLength(2);
    expect(json[0]).toEqual({ Product: 'Laptop', Price: 1200, Quantity: 5 });
  });

  it('handles quotes and escaped delimiters inside cells', () => {
    const csv = 'City,Description\n"New York","The city that ""never"" sleeps, USA"';
    const rows = parseDelimitedTable(csv, ',');
    expect(rows[1][1]).toBe('The city that "never" sleeps, USA');
  });
});
