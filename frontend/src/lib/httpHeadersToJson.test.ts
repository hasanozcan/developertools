import { describe, expect, it } from 'vitest';
import { httpHeadersToJson, jsonToHttpHeaders } from './httpHeadersToJson';

describe('httpHeadersToJson', () => {
  it('converts header string to JSON and back', () => {
    const raw = 'Content-Type: application/json\nAuthorization: Bearer token123';
    const json = httpHeadersToJson(raw);
    const parsed = JSON.parse(json);
    expect(parsed['Content-Type']).toBe('application/json');
    const back = jsonToHttpHeaders(json);
    expect(back).toContain('Authorization: Bearer token123');
  });
});
