import { describe, it, expect } from 'vitest';
import { formatNginxConfig } from './nginxFormatter';

describe('nginxFormatter', () => {
  it('formats unindented Nginx configuration blocks cleanly', () => {
    const unformatted = 'server {\nlisten 80;\nlocation / {\nproxy_pass http://localhost:3000;\n}\n}';
    const result = formatNginxConfig(unformatted);
    expect(result).toContain('server {\n  listen 80;');
    expect(result).toContain('  location / {\n    proxy_pass http://localhost:3000;\n  }\n}');
  });
});
