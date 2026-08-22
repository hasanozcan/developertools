import { describe, it, expect } from 'vitest';
import { convertCaddyToNginx } from './caddyToNginx';

describe('caddyToNginx', () => {
  it('converts Caddyfile reverse_proxy directives into Nginx server blocks', () => {
    const caddy = 'api.example.com {\n  reverse_proxy localhost:8080\n}';
    const nginx = convertCaddyToNginx(caddy);
    expect(nginx).toContain('server_name api.example.com;');
    expect(nginx).toContain('proxy_pass http://localhost:8080;');
  });
});
