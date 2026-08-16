import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LanguageProvider } from '@/context/LanguageContext';
import { decodeJwt, verifyJwtHmac } from '@/lib/jwt';
import JwtDecoderTool from './JwtDecoderTool';

vi.mock('@/lib/jwt', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/lib/jwt')>();
  return {
    ...original,
    decodeJwt: vi.fn(),
    verifyJwtHmac: vi.fn(),
    signJwtHmac: vi.fn(),
  };
});

const decodeMock = vi.mocked(decodeJwt);
const verifyMock = vi.mocked(verifyJwtHmac);

describe('JwtDecoderTool', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    decodeMock.mockReturnValue({
      header: { alg: 'HS256', typ: 'JWT' },
      payload: { sub: '123', iat: 1516239022 },
      signature: 'signature',
    });
  });

  it('loads a sample and verifies its HMAC signature', async () => {
    verifyMock.mockResolvedValue({
      valid: true,
      signatureValid: true,
      algorithm: 'HS256',
      decoded: { header: { alg: 'HS256' }, payload: { sub: '123' }, signature: 'signature' },
      claimIssues: [],
    });
    render(
      <LanguageProvider>
        <JwtDecoderTool />
      </LanguageProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Load Sample' }));
    expect(screen.getByLabelText('HMAC secret')).toHaveValue('your-256-bit-secret');
    fireEvent.click(screen.getByRole('button', { name: 'Verify signature and claims' }));

    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent('Signature and claims are valid'),
    );
  });
});
