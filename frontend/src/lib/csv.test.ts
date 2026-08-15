// @vitest-environment node

import { describe, expect, it } from 'vitest';
import { csvToJson, generateCsvPreview, parseCsvRecords } from './csv';

describe('CSV parsing', () => {
  it('keeps newlines inside quoted fields in the same record', () => {
    expect(
      csvToJson('name,notes\nAlice,"line 1\nline 2"', { delimiter: ',', hasHeaders: true }),
    ).toEqual([{ name: 'Alice', notes: 'line 1\nline 2' }]);
  });

  it('supports escaped quotes and CRLF records', () => {
    expect(parseCsvRecords('name,quote\r\nAlice,"She said ""hello"""', ',')).toEqual([
      ['name', 'quote'],
      ['Alice', 'She said "hello"'],
    ]);
  });

  it('uses the selected delimiter in previews', () => {
    expect(generateCsvPreview('name;age\nAda;37', ';')).toEqual({
      headers: ['name', 'age'],
      rows: [{ name: 'Ada', age: '37' }],
    });
  });

  it('rejects unterminated quoted fields', () => {
    expect(() => parseCsvRecords('name,notes\nAlice,"unfinished', ',')).toThrow(/unterminated/i);
  });
});
