import { describe, expect, it } from 'vitest';
import { curlToJavascript } from './curlToJavascript';

describe('curlToJavascript', () => {
  it('generates fetch code', () => {
    const curl = 'curl -X POST https://api.test.com/data -d "hello=world"';
    const code = curlToJavascript(curl, 'fetch');
    expect(code).toContain("fetch('https://api.test.com/data'");
    expect(code).toContain("method: 'POST'");
  });
});
