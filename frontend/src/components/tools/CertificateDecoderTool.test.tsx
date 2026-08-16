import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LanguageProvider } from '@/context/LanguageContext';
import { parseX509Certificates } from '@/lib/certificate';
import CertificateDecoderTool from './CertificateDecoderTool';

vi.mock('@/lib/certificate', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/lib/certificate')>();
  return { ...original, parseX509Certificates: vi.fn() };
});

const parseMock = vi.mocked(parseX509Certificates);

describe('CertificateDecoderTool', () => {
  beforeEach(() => {
    localStorage.clear();
    parseMock.mockReset();
  });

  it('decodes and renders certificate details', async () => {
    parseMock.mockResolvedValue([
      {
        index: 1,
        subject: 'CN=example.test',
        issuer: 'CN=Example CA',
        serialNumber: '01ab',
        notBefore: '2025-01-01T00:00:00.000Z',
        notAfter: '2030-01-01T00:00:00.000Z',
        validity: 'valid',
        daysRemaining: 100,
        signatureAlgorithm: 'RSASSA-PKCS1-v1_5 / SHA-256',
        publicKeyAlgorithm: 'RSA-PSS',
        publicKeyDetails: ['2048-bit modulus'],
        sha256Fingerprint: 'AA:BB',
        subjectAlternativeNames: [{ type: 'dns', value: 'example.test' }],
        selfIssued: false,
        selfSigned: false,
        extensions: [{ oid: '2.5.29.17', critical: false }],
        rawBytes: 800,
      },
    ]);

    render(
      <LanguageProvider>
        <CertificateDecoderTool />
      </LanguageProvider>,
    );
    fireEvent.change(screen.getByLabelText('PEM or Base64 certificate'), {
      target: { value: 'certificate' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Decode certificate' }));

    await waitFor(() => expect(screen.getByText('CN=example.test')).toBeInTheDocument());
    expect(screen.getByText('dns: example.test')).toBeInTheDocument();
    expect(screen.getByText('AA:BB')).toBeInTheDocument();
  });
});
