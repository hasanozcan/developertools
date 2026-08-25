import { describe, expect, it } from 'vitest';
import { curlToJava } from './curlToJava';

describe('curlToJava', () => {
  it('generates Java HttpClient code', () => {
    const curl = 'curl https://api.java.com';
    const code = curlToJava(curl);
    expect(code).toContain('import java.net.http.HttpClient;');
  });
});
