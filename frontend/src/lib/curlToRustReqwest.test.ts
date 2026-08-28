import { describe, it, expect } from 'vitest';
import { convertCurlToRustReqwest } from './curlToRustReqwest';

describe('curlToRustReqwest', () => {
  it('converts curl to Rust reqwest', () => {
    expect(convertCurlToRustReqwest('curl https://api.com')).toContain('reqwest::get');
  });
});
