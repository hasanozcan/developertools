import { describe, expect, it } from 'vitest';
import { flattenObject, jsonToDelimitedText } from './jsonToExcel';

describe('jsonToExcel', () => {
  it('converts json array of objects into csv/excel table', () => {
    const data = [
      { id: 1, name: 'Alice', city: 'London' },
      { id: 2, name: 'Bob', city: 'Paris' },
    ];
    const csv = jsonToDelimitedText(data, { delimiter: ',' });
    expect(csv).toContain('id,name,city');
    expect(csv).toContain('1,Alice,London');
    expect(csv).toContain('2,Bob,Paris');
  });

  it('flattens nested json objects', () => {
    const nested = {
      id: 101,
      user: {
        firstName: 'John',
        address: {
          zip: '10001',
        },
      },
    };
    const flattened = flattenObject(nested);
    expect(flattened['user.firstName']).toBe('John');
    expect(flattened['user.address.zip']).toBe('10001');
  });

  it('escapes cells containing commas, quotes and newlines', () => {
    const data = [{ note: 'Line 1\nLine 2', quote: 'He said "Hello"' }];
    const csv = jsonToDelimitedText(data);
    expect(csv).toContain('"Line 1\nLine 2"');
    expect(csv).toContain('"He said ""Hello"""');
  });
});
