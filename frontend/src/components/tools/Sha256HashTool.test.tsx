import React from 'react';
import { webcrypto } from 'node:crypto';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import Sha256HashTool, { sha256File } from './Sha256HashTool';

vi.mock('@/context/LanguageContext', () => ({
  useLanguage: () => ({
    t: (key: string) => {
      const labels: Record<string, string> = {
        'tool.sha256Hash.hashFile': 'Hash a file',
        'tool.sha256Hash.removeFile': 'Remove file',
        'tool.sha256Hash.hashingFile': 'Hashing file...',
        'tool.sha256Hash.uploadFile': 'Click to upload a file',
        'tool.sha256Hash.fileHash': 'File SHA-256 hash',
        'tool.sha256Hash.expectedChecksum': 'Expected SHA-256 checksum',
        'tool.sha256Hash.expectedPlaceholder': 'Paste a checksum',
        'tool.sha256Hash.checksumHelp': 'Paste a trusted checksum.',
        'tool.sha256Hash.checksumInvalid': 'Checksum is invalid.',
        'tool.sha256Hash.checksumMatch': 'Checksum matches this file.',
        'tool.sha256Hash.checksumMismatch': 'Checksum does not match this file.',
        'tool.sha256Hash.inputPlaceholder': 'Enter text',
        'tool.sha256Hash.outputPlaceholder': 'Hash will appear here',
      };

      return labels[key] ?? key;
    },
  }),
}));

vi.mock('@/components/common/CodeEditor', () => ({
  default: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
    <textarea value={value} onChange={(event) => onChange(event.target.value)} />
  ),
}));

vi.mock('@/components/common/CopyButton', () => ({
  default: () => null,
}));

beforeAll(() => {
  vi.stubGlobal('crypto', webcrypto);
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.stubGlobal('crypto', webcrypto);
});

afterAll(() => {
  vi.unstubAllGlobals();
});

describe('Sha256HashTool file checksum verification', () => {
  it('reports matching, mismatching, and malformed expected checksums', async () => {
    const { container } = render(<Sha256HashTool />);
    const fileInput = container.querySelector<HTMLInputElement>('input[type="file"]');

    expect(fileInput).not.toBeNull();
    fireEvent.change(fileInput!, {
      target: { files: [new File(['abc'], 'sample.txt', { type: 'text/plain' })] },
    });

    const digest = 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad';
    await waitFor(() => expect(screen.getByText(digest)).toBeInTheDocument());

    const expectedInput = screen.getByLabelText('Expected SHA-256 checksum');
    fireEvent.change(expectedInput, { target: { value: `SHA256: ${digest.toUpperCase()}` } });
    expect(screen.getByText('Checksum matches this file.')).toBeInTheDocument();

    fireEvent.change(expectedInput, { target: { value: `${digest.slice(0, -1)}0` } });
    expect(screen.getByText('Checksum does not match this file.')).toBeInTheDocument();

    fireEvent.change(expectedInput, { target: { value: 'not-a-checksum' } });
    expect(screen.getByText('Checksum is invalid.')).toBeInTheDocument();
  });

  it('keeps the newest text digest and derives uppercase after async completion', async () => {
    let resolveFirst!: (value: ArrayBuffer) => void;
    let resolveSecond!: (value: ArrayBuffer) => void;
    const digest = vi
      .fn()
      .mockImplementationOnce(() => new Promise<ArrayBuffer>((resolve) => (resolveFirst = resolve)))
      .mockImplementationOnce(
        () => new Promise<ArrayBuffer>((resolve) => (resolveSecond = resolve)),
      );
    vi.stubGlobal('crypto', { subtle: { digest } });

    const { container } = render(<Sha256HashTool />);
    const textInput = container.querySelector<HTMLTextAreaElement>('textarea');
    const output = container.querySelector('code');

    expect(textInput).not.toBeNull();
    expect(output).not.toBeNull();
    fireEvent.change(textInput!, { target: { value: 'first' } });
    fireEvent.change(textInput!, { target: { value: 'second' } });
    fireEvent.click(screen.getByRole('checkbox'));
    expect(digest).toHaveBeenCalledTimes(2);

    await act(async () => resolveSecond(Uint8Array.of(0xab).buffer));
    await waitFor(() => expect(output).toHaveTextContent('AB'));

    await act(async () => resolveFirst(Uint8Array.of(0xcd).buffer));
    expect(output).toHaveTextContent('AB');
    expect(output).not.toHaveTextContent('CD');
  });

  it('rejects when Web Crypto cannot digest a loaded file', async () => {
    vi.stubGlobal('crypto', {
      subtle: { digest: vi.fn().mockRejectedValue(new Error('Digest unavailable')) },
    });

    await expect(sha256File(new File(['abc'], 'sample.txt'))).rejects.toThrow('Digest unavailable');
  });
});
