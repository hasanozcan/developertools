export function convertCaddyToNginx(caddyfile: string): string {
  const domainMatch = caddyfile.match(/^([a-zA-Z0-9_.-]+)\s*\{/m);
  const domain = domainMatch ? domainMatch[1] : 'example.com';

  const reverseProxyMatch = caddyfile.match(/reverse_proxy\s+([^\s\n]+)/);
  const target = reverseProxyMatch ? reverseProxyMatch[1] : 'localhost:3000';

  return `server {
  listen 80;
  listen [::]:80;
  server_name ${domain};

  location / {
    proxy_pass http://${target};
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}`;
}
