const CONTROL_OR_NEWLINE_RE = /[\r\n\x00-\x1f\x7f]/;
const VALID_DOMAIN_OR_SAN_RE =
  /^(?:\*\.)?[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

function validateHostnameEntry(value: string, label: string): string {
  if (CONTROL_OR_NEWLINE_RE.test(value)) {
    throw new Error(`${label} contains invalid control or newline characters.`);
  }
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 253 || !VALID_DOMAIN_OR_SAN_RE.test(trimmed)) {
    throw new Error(`${label} contains invalid characters or is not a valid hostname.`);
  }
  return trimmed;
}

export function generateOpenSslCsrConfig(domain: string, sans: string[]): string {
  const safeDomain = validateHostnameEntry(domain, 'Domain');
  const safeSans = sans.map((s, i) => validateHostnameEntry(s, `SAN[${i}]`));
  const altNames = safeSans.map((s, i) => 'DNS.' + (i + 1) + ' = ' + s).join('\n');
  return (
    '[req]\ndistinguished_name = req_distinguished_name\nreq_extensions = v3_req\nprompt = no\n\n[req_distinguished_name]\nCN = ' +
    safeDomain +
    '\n\n[v3_req]\nkeyUsage = keyEncipherment, dataEncipherment\nextendedKeyUsage = serverAuth\nsubjectAltName = @alt_names\n\n[alt_names]\n' +
    altNames +
    '\n'
  );
}
