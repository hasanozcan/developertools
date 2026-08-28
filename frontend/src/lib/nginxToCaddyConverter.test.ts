import { describe, it, expect } from 'vitest';
import { convertNginxToCaddy } from './nginxToCaddyConverter';

describe('nginxToCaddyConverter', () => {
  it('converts Nginx server block to Caddyfile reverse proxy', () => {
    const nginx = `
server {
    listen 80;
    server_name api.example.com;
    location / {
        proxy_pass http://localhost:8080;
    }
}
`;
    const res = convertNginxToCaddy(nginx);
    expect(res.caddyfile).toContain('api.example.com {');
    expect(res.caddyfile).toContain('reverse_proxy localhost:8080');
    expect(res.apache).toContain('ProxyPass / http://localhost:8080');
  });
});
