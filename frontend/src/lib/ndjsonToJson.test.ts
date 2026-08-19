import { describe, it, expect } from 'vitest';
import { ndjsonToJson, jsonToNdjson } from './ndjsonToJson';

describe('ndjsonToJson', () => {
  it('should convert newline-delimited JSON to array', () => {
    const ndjson = '{"id":1}\n{"id":2}\n{"id":3}';
    const json = ndjsonToJson(ndjson);
    const parsed = JSON.parse(json);
    expect(parsed.length).toBe(3);
    expect(parsed[1].id).toBe(2);
  });

  it('should convert JSON array to NDJSON', () => {
    const json = '[{"a":1},{"b":2}]';
    const ndjson = jsonToNdjson(json);
    expect(ndjson).toBe('{"a":1}\n{"b":2}');
  });
});
