import { describe, it, expect } from 'vitest';
import { generateOpenSslCsrCommand } from './csrGenerator';

describe('csrGenerator', () => {
  it('generates OpenSSL CSR generation commands', () => {
    const res = generateOpenSslCsrCommand({ commonName: 'api.devstools.app', country: 'TR' });
    expect(res.openSslCommand).toContain('CN=api.devstools.app');
    expect(res.openSslCommand).toContain('C=TR');
  });
});
