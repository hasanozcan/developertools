export function generateCaddyfile(domain = 'api.example.com', proxyPort = 8080): string {
  return domain + ' {\n    encode zstd gzip\n    \n    header {\n        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"\n        X-Content-Type-Options "nosniff"\n        X-Frame-Options "DENY"\n    }\n\n    reverse_proxy 127.0.0.1:' + proxyPort + '\n}\n';
}
