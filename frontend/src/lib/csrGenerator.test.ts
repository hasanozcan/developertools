import { describe, expect, it } from 'vitest';
import { generateOpenSslCsrConfig } from './csrGenerator';

describe('csrGenerator', () => {
  it('generates OpenSSL config and command', () => {
    const res = generateOpenSslCsrConfig({
      domain: 'example.com',
      country: 'US',
      state: 'CA',
      city: 'San Francisco',
      organization: 'Example Inc',
      sans: ['example.com', 'www.example.com']
    });
    expect(res.config).toContain('CN = example.com');
    expect(res.command).toContain('openssl req -new');
    expect(res.command).toContain("-keyout 'example.com.key'");
    expect(res.command).toContain("-out 'example.com.csr'");
    expect(res.command).toContain("-subj '/C=US/ST=CA/L=San Francisco/O=Example Inc/CN=example.com'");
    expect(res.command).toContain("-config 'san.cnf'");
  });

  it('rejects newline, INI section, quote, and shell metacharacter injections', () => {
    const base = {
      domain: 'example.com',
      country: 'US',
      state: 'CA',
      city: 'San Francisco',
      organization: 'Example Inc',
      sans: ['example.com'],
    };

    expect(() => generateOpenSslCsrConfig({ ...base, domain: 'example.com; rm -rf /' })).toThrow();
    expect(() => generateOpenSslCsrConfig({ ...base, domain: 'example.com\n[evil]\nkey = val' })).toThrow();
    expect(() => generateOpenSslCsrConfig({ ...base, organization: 'Org"; cat /etc/passwd #' })).toThrow();
    expect(() => generateOpenSslCsrConfig({ ...base, city: 'City$(whoami)' })).toThrow();
    expect(() => generateOpenSslCsrConfig({ ...base, state: "CA' && id" })).toThrow();
    expect(() => generateOpenSslCsrConfig({ ...base, sans: ['example.com\nDNS.2 = evil.com'] })).toThrow();
    expect(() => generateOpenSslCsrConfig({ ...base, sans: ['`id`.example.com'] })).toThrow();
  });
});
