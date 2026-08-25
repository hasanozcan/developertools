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
  });
});
