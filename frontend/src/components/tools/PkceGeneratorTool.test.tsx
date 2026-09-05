import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import PkceGeneratorTool from './PkceGeneratorTool';
import { LanguageProvider } from '@/context/LanguageContext';
import {
  deriveCodeChallenge,
  generateCodeVerifier,
  validateCodeVerifier,
  verifyCodeChallenge,
} from '@/lib/pkce';

vi.mock('@/lib/pkce', () => ({
  deriveCodeChallenge: vi.fn(),
  generateCodeVerifier: vi.fn(),
  validateCodeVerifier: vi.fn(),
  verifyCodeChallenge: vi.fn(),
}));

vi.mock('@/components/common/CopyButton', () => ({
  default: () => null,
}));

interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
}

function deferred<T>(): Deferred<T> {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((promiseResolve) => {
    resolve = promiseResolve;
  });
  return { promise, resolve };
}

const deriveCodeChallengeMock = vi.mocked(deriveCodeChallenge);
const generateCodeVerifierMock = vi.mocked(generateCodeVerifier);
const validateCodeVerifierMock = vi.mocked(validateCodeVerifier);
const verifyCodeChallengeMock = vi.mocked(verifyCodeChallenge);

function renderTool(): void {
  render(
    <LanguageProvider>
      <PkceGeneratorTool />
    </LanguageProvider>,
  );
}

describe('PkceGeneratorTool async operations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    generateCodeVerifierMock.mockReturnValue('generated-verifier');
    validateCodeVerifierMock.mockImplementation(() => undefined);
  });

  it('ignores a generated pair when verifier length changes before hashing completes', async () => {
    const staleOperation = deferred<string>();
    deriveCodeChallengeMock.mockReturnValue(staleOperation.promise);

    renderTool();
    fireEvent.click(screen.getByRole('button', { name: 'Generate secure pair' }));
    expect(screen.getByRole('button', { name: 'Generate secure pair' })).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Verifier length'), { target: { value: '80' } });

    await act(async () => {
      staleOperation.resolve('stale-challenge');
      await staleOperation.promise;
    });

    expect(screen.getByLabelText('Code verifier')).toHaveValue('');
    expect(screen.getByLabelText('S256 code challenge')).toHaveValue('');
    expect(screen.getByRole('button', { name: 'Generate secure pair' })).toBeEnabled();
  });

  it('ignores a verification result when the expected challenge changes', async () => {
    const staleOperation = deferred<boolean>();
    verifyCodeChallengeMock.mockReturnValue(staleOperation.promise);

    renderTool();
    fireEvent.change(screen.getByLabelText('Code verifier'), {
      target: { value: 'manual-verifier' },
    });
    fireEvent.change(screen.getByLabelText('Expected code challenge'), {
      target: { value: 'A'.repeat(43) },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Verify pair' }));
    expect(screen.getByRole('button', { name: 'Verify pair' })).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Expected code challenge'), {
      target: { value: 'B'.repeat(43) },
    });

    await act(async () => {
      staleOperation.resolve(true);
      await staleOperation.promise;
    });

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Verify pair' })).toBeEnabled();
  });

  it('uses the selected locale for controls and validation feedback', async () => {
    validateCodeVerifierMock.mockImplementation(() => {
      throw new Error('invalid verifier');
    });
    render(<LanguageProvider initialLocale="tr"><PkceGeneratorTool /></LanguageProvider>);

    const verifier = await screen.findByLabelText('Kod doğrulayıcı');
    fireEvent.change(verifier, { target: { value: 'çok-kısa' } });
    fireEvent.click(screen.getByRole('button', { name: 'S256 challenge üret' }));

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Doğrulayıcı boşluksuz, 43–128 geçerli PKCE karakterinden oluşmalıdır.',
    );
  });
});
