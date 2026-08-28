import { describe, it, expect } from 'vitest';
import { generateOpenSslCsrConfig } from './x509SanCsrBuilder';

describe('x509SanCsrBuilder', () => {
  it('generates SAN CSR config file', () => {
    const conf = generateOpenSslCsrConfig('example.com', ['example.com', 'api.example.com']);
    expect(conf).toContain('DNS.1 = example.com');
    expect(conf).toContain('DNS.2 = api.example.com');
  });
});
