import { describe, it, expect } from 'vitest';
import { convertPostmanToCurl } from './postmanToCurl';

describe('convertPostmanToCurl', () => {
  it('converts collection items to cURL', () => {
    const postman = JSON.stringify({
      item: [
        {
          name: 'Get Users',
          request: {
            method: 'POST',
            url: { raw: 'https://api.test.com/users' },
            header: [{ key: 'Content-Type', value: 'application/json' }],
            body: { raw: '{"name":"John"}' }
          }
        }
      ]
    });
    const curls = convertPostmanToCurl(postman);
    expect(curls[0]).toContain('curl -X POST "https://api.test.com/users"');
    expect(curls[0]).toContain('-H "Content-Type: application/json"');
  });
});