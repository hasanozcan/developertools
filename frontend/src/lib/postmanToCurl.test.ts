import { describe, it, expect } from 'vitest';
import { convertPostmanToCurl } from './postmanToCurl';

describe('postmanToCurl', () => {
  it('converts Postman collection JSON to cURL commands', () => {
    const postmanJson = JSON.stringify({
      info: { name: 'Sample Collection' },
      item: [
        {
          name: 'Create User',
          request: {
            method: 'POST',
            header: [{ key: 'Content-Type', value: 'application/json' }],
            url: { raw: 'https://api.example.com/users' },
            body: { mode: 'raw', raw: '{"name":"Alice"}' }
          }
        }
      ]
    });

    const result = convertPostmanToCurl(postmanJson);
    expect(result).toContain('curl -X POST "https://api.example.com/users"');
    expect(result).toContain('-H "Content-Type: application/json"');
    expect(result).toContain("-d '{\"name\":\"Alice\"}'");
  });
});
