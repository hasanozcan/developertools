export function generateOpenSslCsrConfig(domain: string, sans: string[]): string {
  const altNames = sans.map((s, i) => 'DNS.' + (i + 1) + ' = ' + s).join('\n');
  return '[req]\ndistinguished_name = req_distinguished_name\nreq_extensions = v3_req\nprompt = no\n\n[req_distinguished_name]\nCN = ' + domain + '\n\n[v3_req]\nkeyUsage = keyEncipherment, dataEncipherment\nextendedKeyUsage = serverAuth\nsubjectAltName = @alt_names\n\n[alt_names]\n' + altNames + '\n';
}
