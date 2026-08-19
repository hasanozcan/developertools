import { describe, it, expect } from 'vitest';
import { convertHtaccessToNginx } from './htaccessToNginx';

describe('htaccessToNginx', () => {
  it('should convert 301 Redirect and RewriteRules to Nginx rewrites', () => {
    const htaccess = `Redirect 301 /about-us /about\nRewriteRule ^blog/(.*)$ /posts/$1 [R=301,L]`;
    const nginx = convertHtaccessToNginx(htaccess);
    expect(nginx).toContain('rewrite ^/about-us$ /about permanent;');
    expect(nginx).toContain('rewrite ^blog/(.*)$ /posts/$1 permanent;');
  });
});
