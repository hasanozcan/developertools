import { describe, it, expect } from 'vitest';
import { convertPostmanToOpenapi } from './postmanToOpenapi';

describe('postmanToOpenapi', () => {
  it('converts Postman to OpenAPI', () => {
    const postman = JSON.stringify({ info: { name: "Test API" }, item: [{ name: "Users", request: { method: "GET", url: "https://api.com/users" } }] });
    expect(convertPostmanToOpenapi(postman)).toContain('3.0.3');
  });
});
