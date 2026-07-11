import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import HmacGeneratorTool from './HmacGeneratorTool';
import { generateHmac, verifyHmac } from '@/lib/hmac';

vi.mock('@/lib/hmac', () => ({
  generateHmac: vi.fn(),
  verifyHmac: vi.fn(),
}));

vi.mock('@/components/common/CopyButton', () => ({
  default: () => null,
}));

interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason: unknown) => void;
}

function deferred<T>(): Deferred<T> {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((promiseResolve, promiseReject) => {
    resolve = promiseResolve;
    reject = promiseReject;
  });
  return { promise, resolve, reject };
}

const generateHmacMock = vi.mocked(generateHmac);
const verifyHmacMock = vi.mocked(verifyHmac);

function fillRequiredFields(): void {
  fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'old message' } });
  fireEvent.change(screen.getByLabelText('Secret key'), { target: { value: 'secret' } });
}

describe('HmacGeneratorTool async operations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('ignores a stale generated signature without clearing a newer loading state', async () => {
    const staleOperation = deferred<string>();
    const currentOperation = deferred<string>();
    generateHmacMock
      .mockReturnValueOnce(staleOperation.promise)
      .mockReturnValueOnce(currentOperation.promise);

    render(<HmacGeneratorTool />);
    fillRequiredFields();

    fireEvent.click(screen.getByRole('button', { name: 'Generate HMAC' }));
    expect(screen.getByRole('button', { name: 'Generating...' })).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'new message' } });
    fireEvent.click(screen.getByRole('button', { name: 'Generate HMAC' }));

    await act(async () => {
      staleOperation.resolve('stale-signature');
      await staleOperation.promise;
    });

    expect(screen.getByLabelText(/Generated signature/)).toHaveValue('');
    expect(screen.getByRole('button', { name: 'Generating...' })).toBeDisabled();

    await act(async () => {
      currentOperation.resolve('current-signature');
      await currentOperation.promise;
    });

    expect(screen.getByLabelText(/Generated signature/)).toHaveValue('current-signature');
    expect(screen.getByRole('button', { name: 'Generate HMAC' })).toBeEnabled();
  });

  it('ignores a stale verification error without clearing a newer loading state', async () => {
    const staleOperation = deferred<boolean>();
    const currentOperation = deferred<boolean>();
    verifyHmacMock
      .mockReturnValueOnce(staleOperation.promise)
      .mockReturnValueOnce(currentOperation.promise);

    render(<HmacGeneratorTool />);
    fillRequiredFields();
    fireEvent.change(screen.getByLabelText('Signature to verify'), {
      target: { value: 'signature' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Verify signature' }));
    expect(screen.getByRole('button', { name: 'Verifying...' })).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Output format'), { target: { value: 'base64' } });
    fireEvent.click(screen.getByRole('button', { name: 'Verify signature' }));

    await act(async () => {
      staleOperation.reject(new Error('stale verification error'));
      try {
        await staleOperation.promise;
      } catch {
        // The component handles this rejection; awaiting it flushes the state update.
      }
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Verifying...' })).toBeDisabled();

    await act(async () => {
      currentOperation.resolve(true);
      await currentOperation.promise;
    });

    expect(screen.getByRole('status')).toHaveTextContent('Signature is valid');
    expect(screen.getByRole('button', { name: 'Verify signature' })).toBeEnabled();
  });
});
