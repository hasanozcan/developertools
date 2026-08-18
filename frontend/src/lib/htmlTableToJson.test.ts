import { describe, it, expect } from 'vitest';
import { htmlTableToJson } from './htmlTableToJson';

describe('htmlTableToJson parser', () => {
  const tableHtml = `<table>
    <tr><th>ID</th><th>Name</th></tr>
    <tr><td>1</td><td>Alice</td></tr>
    <tr><td>2</td><td>Bob</td></tr>
  </table>`;

  it('parses HTML table to array of objects', () => {
    const objects = htmlTableToJson(tableHtml, true) as Record<string, any>[];
    expect(objects.length).toBe(2);
    expect(objects[0]).toEqual({ ID: '1', Name: 'Alice' });
    expect(objects[1]).toEqual({ ID: '2', Name: 'Bob' });
  });

  it('parses HTML table to 2D array', () => {
    const matrix = htmlTableToJson(tableHtml, false) as string[][];
    expect(matrix.length).toBe(3);
    expect(matrix[0]).toEqual(['ID', 'Name']);
    expect(matrix[1]).toEqual(['1', 'Alice']);
  });
});
