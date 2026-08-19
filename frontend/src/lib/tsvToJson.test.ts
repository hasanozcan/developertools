import { describe, it, expect } from 'vitest';
import { convertTsvToJson, convertJsonToTsv } from './tsvToJson';

describe('tsvToJson', () => {
  it('should convert TSV to structured JSON array', () => {
    const tsv = 'name\tage\tcity\nAlice\t30\tParis\nBob\t25\tLondon';
    const json = convertTsvToJson(tsv);
    const parsed = JSON.parse(json);
    expect(parsed.length).toBe(2);
    expect(parsed[0]).toEqual({ name: 'Alice', age: 30, city: 'Paris' });
    expect(parsed[1]).toEqual({ name: 'Bob', age: 25, city: 'London' });
  });

  it('should convert JSON array to TSV format', () => {
    const data = [{ id: 1, label: 'Item 1' }, { id: 2, label: 'Item 2' }];
    const tsv = convertJsonToTsv(JSON.stringify(data));
    expect(tsv).toBe('id\tlabel\n1\tItem 1\n2\tItem 2');
  });
});
