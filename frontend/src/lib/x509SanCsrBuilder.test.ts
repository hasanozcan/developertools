import { describe, it, expect } from 'vitest';
import { generateOpenSslCsrConfig } from './x509SanCsrBuilder';

describe('x509SanCsrBuilder', () => {
  it('generates SAN CSR config file', () => {
    const conf = generateOpenSslCsrConfig('example.com', ['example.com', 'api.example.com', '*.example.com']);
    expect(conf).toContain('DNS.1 = example.com');
    expect(conf).toContain('DNS.2 = api.example.com');
    expect(conf).toContain('DNS.3 = *.example.com');
  });

  it('rejects newline, INI, quote, and shell injection payloads', () => {
    expect(() => generateOpenSslCsrConfig('example.com\n[evil]\nx = y', ['example.com'])).toThrow();
    expect(() => generateOpenSslCsrConfig('example.com;id', ['example.com'])).toThrow();
    expect(() => generateOpenSslCsrConfig('example.com', ['example.com\nDNS.2 = evil.com'])).toThrow();
    expect(() => generateOpenSslCsrConfig('example.com', ['"evil.com"'])).toThrow();
    expect(() => generateOpenSslCsrConfig('example.com', ['$(whoami).example.com'])).toThrow();
  });
});
