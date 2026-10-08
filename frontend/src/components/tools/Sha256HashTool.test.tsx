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
        'tool.sha256Hash.textHash': 'Hash UTF-8 text',
        'tool.sha256Hash.fileMemoryHelp': 'Files are read into browser memory. Use a local terminal for large downloads.',
        'tool.sha256Hash.removeFile': 'Remove file',
        'tool.sha256Hash.hashingFile': 'Hashing file...',
        'tool.sha256Hash.uploadFile': 'Click to upload a file',
        'tool.sha256Hash.fileHash': 'File SHA-256 hash',
        'tool.sha256Hash.fileError':
          'Could not read or hash this file. Try again or choose another file.',
        'tool.sha256Hash.retryFile': 'Retry file hash',
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
  it('loads the documented abc text sample before the separate file task and shows memory guidance', async () => {
    const { container } = render(<Sha256HashTool />);
    const textHeading = screen.getByRole('heading', { name: 'Hash UTF-8 text' });
    const fileHeading = screen.getByRole('heading', { name: 'Hash a file' });
    expect(textHeading.compareDocumentPosition(fileHeading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container.querySelectorAll('textarea')).toHaveLength(1);
    expect(container.querySelectorAll('input[type="file"]')).toHaveLength(1);
    expect(screen.getByText(/Files are read into browser memory/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'common.loadSample' }));
    expect(screen.getByDisplayValue('abc')).toBeInTheDocument();
    await waitFor(() => expect(container.querySelector('code')).toHaveTextContent('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'));
  });

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

  it('announces a file-read failure and retries the same selected file successfully', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(FileReader.prototype, 'readAsArrayBuffer').mockImplementationOnce(function (
      this: FileReader,
    ) {
      queueMicrotask(() => this.onerror?.(new ProgressEvent('error') as ProgressEvent<FileReader>));
    });

    const { container } = render(<Sha256HashTool />);
    fireEvent.change(container.querySelector<HTMLInputElement>('input[type="file"]')!, {
      target: { files: [new File(['abc'], 'sample.txt')] },
    });
    expect(await screen.findByRole('alert')).toHaveTextContent('Could not read or hash this file.');
    expect(screen.getByText('sample.txt')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Retry file hash' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(
      await screen.findByText('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'),
    ).toBeInTheDocument();
  });

  it('announces a digest failure, then retries without requiring a new file selection', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const digest = vi
      .fn((algorithm: string, data: ArrayBuffer) => webcrypto.subtle.digest(algorithm, data))
      .mockRejectedValueOnce(new Error('Digest unavailable'));
    vi.stubGlobal('crypto', { subtle: { digest } });

    const { container } = render(<Sha256HashTool />);
    fireEvent.change(container.querySelector<HTMLInputElement>('input[type="file"]')!, {
      target: { files: [new File(['abc'], 'sample.txt')] },
    });
    expect(await screen.findByRole('alert')).toHaveTextContent('Could not read or hash this file.');
    fireEvent.click(screen.getByRole('button', { name: 'Retry file hash' }));
    expect(
      await screen.findByText('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'),
    ).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(digest).toHaveBeenCalledTimes(2);
  });

  it('clears an error when removing the file and allows a different file to be hashed', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const digest = vi
      .fn((algorithm: string, data: ArrayBuffer) => webcrypto.subtle.digest(algorithm, data))
      .mockRejectedValueOnce(new Error('Digest unavailable'));
    vi.stubGlobal('crypto', { subtle: { digest } });
    const { container } = render(<Sha256HashTool />);
    fireEvent.change(container.querySelector<HTMLInputElement>('input[type="file"]')!, {
      target: { files: [new File(['broken'], 'first.txt')] },
    });
    await screen.findByRole('alert');
    fireEvent.click(screen.getByRole('button', { name: 'Remove file' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    fireEvent.change(container.querySelector<HTMLInputElement>('input[type="file"]')!, {
      target: { files: [new File(['abc'], 'second.txt')] },
    });
    expect(
      await screen.findByText('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'),
    ).toBeInTheDocument();
    expect(screen.queryByText('first.txt')).not.toBeInTheDocument();
  });

  it('ignores a stale failure while the newest file is still being hashed', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    let rejectFirst!: (reason: Error) => void;
    let resolveSecond!: (value: ArrayBuffer) => void;
    const digest = vi
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise<ArrayBuffer>((_, reject) => {
            rejectFirst = reject;
          }),
      )
      .mockImplementationOnce(
        () =>
          new Promise<ArrayBuffer>((resolve) => {
            resolveSecond = resolve;
          }),
      );
    vi.stubGlobal('crypto', { subtle: { digest } });
    const { container } = render(<Sha256HashTool />);
    fireEvent.change(container.querySelector<HTMLInputElement>('input[type="file"]')!, {
      target: { files: [new File(['first'], 'first.txt')] },
    });
    await waitFor(() => expect(digest).toHaveBeenCalledTimes(1));
    fireEvent.click(screen.getByRole('button', { name: 'Remove file' }));
    fireEvent.change(container.querySelector<HTMLInputElement>('input[type="file"]')!, {
      target: { files: [new File(['second'], 'second.txt')] },
    });
    await waitFor(() => expect(digest).toHaveBeenCalledTimes(2));
    await act(async () => rejectFirst(new Error('Late failure')));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByText('Hashing file...')).toBeInTheDocument();
    expect(screen.getByText('second.txt')).toBeInTheDocument();
    await act(async () => resolveSecond(Uint8Array.from({ length: 32 }, () => 0xab).buffer));
    expect(await screen.findByText('ab'.repeat(32))).toBeInTheDocument();
    expect(screen.queryByText('Hashing file...')).not.toBeInTheDocument();
  });
});
