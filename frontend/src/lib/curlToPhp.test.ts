import { describe, expect, it } from 'vitest';
import { curlToPhp } from './curlToPhp';

describe('curlToPhp', () => {
  it('generates php Guzzle code', () => {
    const curl = 'curl https://api.php.net';
    const code = curlToPhp(curl);
    expect(code).toContain('use GuzzleHttp\\Client;');
  });
});
