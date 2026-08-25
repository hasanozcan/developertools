import { describe, expect, it } from 'vitest';
import { curlToGo } from './curlToGo';

describe('curlToGo', () => {
  it('generates go net/http code', () => {
    const curl = 'curl -X POST https://api.go.dev/v1/run -d "test"';
    const code = curlToGo(curl);
    expect(code).toContain('package main');
    expect(code).toContain('http.NewRequest("POST"');
  });
});
