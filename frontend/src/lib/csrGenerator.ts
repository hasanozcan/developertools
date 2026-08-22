export interface CsrConfig {
  commonName: string;
  organization?: string;
  country?: string;
  state?: string;
  city?: string;
}

export function generateOpenSslCsrCommand(config: CsrConfig): {
  openSslCommand: string;
  subjString: string;
} {
  const {
    commonName = 'example.com',
    organization = 'My Org Inc.',
    country = 'US',
    state = 'California',
    city = 'San Francisco',
  } = config;

  const subjString = `/C=${country}/ST=${state}/L=${city}/O=${organization}/CN=${commonName}`;
  const openSslCommand = `openssl req -new -newkey rsa:2048 -nodes -keyout server.key -out server.csr -subj "${subjString}"`;

  return { openSslCommand, subjString };
}
