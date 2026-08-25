import { describe, expect, it } from 'vitest';
import { curlToRust } from './curlToRust';

describe('curlToRust', () => {
  it('generates rust reqwest code', () => {
    const curl = 'curl https://api.rust-lang.org';
    const code = curlToRust(curl);
    expect(code).toContain('reqwest::Client::new()');
  });
});
