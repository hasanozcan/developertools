import { describe, it, expect } from 'vitest';
import { parseJsonToGrid, gridToJson, gridToCsv } from './jsonCsvGridEditor';

describe('jsonCsvGridEditor', () => {
  it('converts JSON array to grid matrix and back', () => {
    const json = JSON.stringify([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
    const grid = parseJsonToGrid(json);
    expect(grid.headers).toEqual(['id', 'name']);
    expect(grid.rows).toEqual([['1', 'Alice'], ['2', 'Bob']]);

    const csv = gridToCsv(grid.headers, grid.rows);
    expect(csv).toBe('id,name\n1,Alice\n2,Bob');
  });
});
