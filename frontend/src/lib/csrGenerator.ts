export interface CsrOptions {
  commonName?: string;
  domain?: string;
  country?: string;
  state?: string;
  city?: string;
  organization?: string;
  sans?: string[];
}

export function generateOpenSslCsrCommand(opts: CsrOptions): { openSslCommand: string; config: string; command: string } {
  const domain = opts.commonName || opts.domain || 'example.com';
  const sanLines = (opts.sans && opts.sans.length > 0)
    ? `[alt_names]\n${opts.sans.map((s, i) => `DNS.${i + 1} = ${s}`).join('\n')}`
    : '';

  const config = `[req]
default_bits = 2048
prompt = no
default_md = sha256
req_extensions = req_ext
distinguished_name = dn

[dn]
C = ${opts.country || 'US'}
ST = ${opts.state || 'State'}
L = ${opts.city || 'City'}
O = ${opts.organization || 'Org'}
CN = ${domain}

[req_ext]
subjectAltName = @alt_names

${sanLines}`;

  const command = `openssl req -new -newkey rsa:2048 -nodes -keyout ${domain}.key -out ${domain}.csr -config san.cnf`;
  return { openSslCommand: command, command, config };
}

export function generateOpenSslCsrConfig(opts: { domain: string; country: string; state: string; city: string; organization: string; sans: string[] }): { config: string; command: string } {
  return generateOpenSslCsrCommand(opts);
}
