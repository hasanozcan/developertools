export function convertNginxToCaddy(nginxConf: string): { caddyfile: string; apache: string } {
  let domain = 'example.com';
  let rootDir = '/var/www/html';
  let proxyPassUrl = '';
  const locations: { path: string; proxy: string }[] = [];

  const domainMatch = nginxConf.match(/server_name\s+([^;]+);/i);
  if (domainMatch) {
    domain = domainMatch[1].trim().split(/\s+/)[0];
  }

  const rootMatch = nginxConf.match(/root\s+([^;]+);/i);
  if (rootMatch) {
    rootDir = rootMatch[1].trim();
  }

  const locationRegex = /location\s+([^{]+)\{[^}]*proxy_pass\s+([^;]+);[^}]*\}/gi;
  let locMatch;
  while ((locMatch = locationRegex.exec(nginxConf)) !== null) {
    locations.push({
      path: locMatch[1].trim(),
      proxy: locMatch[2].trim(),
    });
  }

  if (locations.length === 0) {
    const directProxy = nginxConf.match(/proxy_pass\s+([^;]+);/i);
    if (directProxy) {
      proxyPassUrl = directProxy[1].trim();
    }
  }

  const caddyLines = [domain + ' {'];
  if (locations.length > 0) {
    for (const loc of locations) {
      const caddyPath = loc.path === '/' ? '' : loc.path + '*';
      const cleanProxy = loc.proxy.replace(/https?:\/\//, '');
      caddyLines.push('  reverse_proxy ' + (caddyPath ? caddyPath + ' ' : '') + cleanProxy);
    }
  } else if (proxyPassUrl) {
    const cleanProxy = proxyPassUrl.replace(/https?:\/\//, '');
    caddyLines.push('  reverse_proxy ' + cleanProxy);
  } else {
    caddyLines.push('  root * ' + rootDir);
    caddyLines.push('  file_server');
    caddyLines.push('  encode gzip');
  }
  caddyLines.push('}');

  const apacheLines = [
    '<VirtualHost *:80>',
    '  ServerName ' + domain,
    '  DocumentRoot ' + rootDir,
  ];
  if (locations.length > 0) {
    for (const loc of locations) {
      apacheLines.push('  ProxyPass ' + loc.path + ' ' + loc.proxy);
      apacheLines.push('  ProxyPassReverse ' + loc.path + ' ' + loc.proxy);
    }
  } else if (proxyPassUrl) {
    apacheLines.push('  ProxyPass / ' + proxyPassUrl);
    apacheLines.push('  ProxyPassReverse / ' + proxyPassUrl);
  }
  apacheLines.push('</VirtualHost>');

  return {
    caddyfile: caddyLines.join('\n'),
    apache: apacheLines.join('\n'),
  };
}
