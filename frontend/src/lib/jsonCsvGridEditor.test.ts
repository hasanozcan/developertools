import { describe, expect, it } from 'vitest';
import { gridToCsv, gridToJson, parseCsvToGrid, parseJsonToGrid } from './jsonCsvGridEditor';

describe('jsonCsvGridEditor', () => {
  it('converts JSON array to grid matrix and back', () => {
    const json = JSON.stringify([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
    const grid = parseJsonToGrid(json);
    expect(grid.headers).toEqual(['id', 'name']);
    expect(grid.rows).toEqual([
      ['1', 'Alice'],
      ['2', 'Bob'],
    ]);

    const csv = gridToCsv(grid.headers, grid.rows);
    expect(csv).toBe('id,name\n1,Alice\n2,Bob');

    const backJson = JSON.parse(gridToJson(grid.headers, grid.rows));
    expect(backJson).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
  });

  it('parses RFC-4180 CSV with quoted commas, escaped quotes, and newlines', () => {
    const csv = 'name,note\r\n"Doe, Jane","He said ""hi"""\r\nBob,"line1\nline2"';
    const grid = parseCsvToGrid(csv);
    expect(grid.headers).toEqual(['name', 'note']);
    expect(grid.rows).toEqual([
      ['Doe, Jane', 'He said "hi"'],
      ['Bob', 'line1\nline2'],
    ]);
  });

  it('ignores __proto__ headers when exporting JSON', () => {
    const out = JSON.parse(gridToJson(['__proto__', 'safe'], [['polluted', 'ok']]));
    expect(out).toEqual([{ safe: 'ok' }]);
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });
});
