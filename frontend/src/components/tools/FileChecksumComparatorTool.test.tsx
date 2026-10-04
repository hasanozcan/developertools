import React from 'react';
import { createHash, webcrypto } from 'node:crypto';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as checksumLibrary from '@/lib/fileChecksumComparator';
import FileChecksumComparatorTool from './FileChecksumComparatorTool';

const encoder = new TextEncoder();
const defaultText = 'DevsTools Secure Client-Side Hash Verification';
const expectedPlaceholder = 'e.g. 5eb63bbbe01eeed093cb22bb8f5acdc3...';

beforeEach(() => vi.stubGlobal('crypto', webcrypto));
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function md5(value: string | Uint8Array): string {
  return createHash('md5').update(value).digest('hex');
}

function hashes(container: HTMLElement): string[] {
  return Array.from(
    container.querySelectorAll<HTMLInputElement>('input[readonly]'),
    (input) => input.value,
  );
}

function inputs(container: HTMLElement) {
  return {
    file: container.querySelector<HTMLInputElement>('input[type="file"]')!,
    text: container.querySelector<HTMLTextAreaElement>('textarea')!,
    expected: screen.getByPlaceholderText(expectedPlaceholder),
  };
}

function selectFile(input: HTMLInputElement, name: string, bytes: Uint8Array) {
  fireEvent.change(input, { target: { files: [new File([bytes], name)] } });
}

function controlledReaders() {
  const readers: ControlledFileReader[] = [];

  class ControlledFileReader {
    static readonly EMPTY = 0;
    static readonly LOADING = 1;
    static readonly DONE = 2;
    readyState = ControlledFileReader.EMPTY;
    result: ArrayBuffer | null = null;
    error: DOMException | null = null;
    onload: ((event: ProgressEvent<FileReader>) => void) | null = null;
    onerror: ((event: ProgressEvent<FileReader>) => void) | null = null;
    onabort: ((event: ProgressEvent<FileReader>) => void) | null = null;
    private queuedLoad: ((event: ProgressEvent<FileReader>) => void) | null = null;
    private queuedError: ((event: ProgressEvent<FileReader>) => void) | null = null;

    readAsArrayBuffer() {
      this.readyState = ControlledFileReader.LOADING;
      this.queuedLoad = this.onload;
      this.queuedError = this.onerror;
      readers.push(this);
    }

    abort = vi.fn(() => {
      this.readyState = ControlledFileReader.DONE;
    });

    complete(bytes: Uint8Array) {
      const buffer = new ArrayBuffer(bytes.byteLength);
      new Uint8Array(buffer).set(bytes);
      this.result = buffer;
      this.readyState = ControlledFileReader.DONE;
      // A callback already queued by the browser can arrive after cancellation.
      this.queuedLoad?.({ target: this } as unknown as ProgressEvent<FileReader>);
    }

    fail() {
      this.error = new DOMException('Synthetic read failure', 'NotReadableError');
      this.readyState = ControlledFileReader.DONE;
      this.queuedError?.({ target: this } as unknown as ProgressEvent<FileReader>);
    }
  }

  vi.stubGlobal('FileReader', ControlledFileReader);
  return readers;
}

type DigestRequest = { resolve: (buffer: ArrayBuffer) => void };

function controlledDigests() {
  const pending: DigestRequest[] = [];
  const lengths: Record<string, number> = { 'SHA-256': 32, 'SHA-384': 48, 'SHA-512': 64 };
  const digest = vi.fn((algorithm: string) => {
    // Each calculation pauses on its first asynchronous digest; later families finish immediately.
    if (algorithm === 'SHA-1') {
      return new Promise<ArrayBuffer>((resolve) => pending.push({ resolve }));
    }
    return Promise.resolve(new ArrayBuffer(lengths[algorithm]));
  });
  vi.stubGlobal('crypto', { subtle: { digest } });
  return pending;
}

async function finishDigest(request: DigestRequest) {
  await act(async () => request.resolve(new ArrayBuffer(20)));
}

async function completeRead(
  reader: ReturnType<typeof controlledReaders>[number],
  bytes: Uint8Array,
) {
  await act(async () => reader.complete(bytes));
}

async function readyControlledTool() {
  const readers = controlledReaders();
  const pending = controlledDigests();
  const view = render(<FileChecksumComparatorTool />);
  await finishDigest(pending[0]);
  await waitFor(() => expect(hashes(view.container)).toHaveLength(6));
  return { ...view, readers, pending, ...inputs(view.container) };
}

async function finishLateRead(
  reader: ReturnType<typeof controlledReaders>[number],
  bytes: Uint8Array,
  pending: DigestRequest[],
) {
  const previousCount = pending.length;
  await completeRead(reader, bytes);
  for (const request of pending.slice(previousCount)) await finishDigest(request);
}

describe('FileChecksumComparatorTool source changes', () => {
  it.each([
    { name: 'binary.bin', bytes: new Uint8Array([0, 255, 128, 65, 0, 254]), crc32: 'bda2e8f8' },
    { name: 'empty.bin', bytes: new Uint8Array(), crc32: '00000000' },
  ])(
    'hashes the raw bytes of $name and compares all algorithms without rehashing',
    async ({ name, bytes, crc32 }) => {
      const calculate = vi.spyOn(checksumLibrary, 'calculateAllChecksums');
      const digest = vi.spyOn(webcrypto.subtle, 'digest');
      const { container } = render(<FileChecksumComparatorTool />);
      await waitFor(() => expect(hashes(container)).toHaveLength(6));
      const { file, expected } = inputs(container);
      const references = [
        md5(bytes),
        crc32,
        ...['sha1', 'sha256', 'sha384', 'sha512'].map((algorithm) =>
          createHash(algorithm).update(bytes).digest('hex'),
        ),
      ];
      selectFile(file, name, bytes);
      await waitFor(() => expect(hashes(container)).toEqual(references));
      expect(screen.getByText(new RegExp(name.replace('.', '\\.')))).toBeInTheDocument();
      const calculationCount = calculate.mock.calls.length;
      const digestCount = digest.mock.calls.length;

      for (const reference of references) {
        fireEvent.change(expected, { target: { value: ` \n${reference.toUpperCase()}\t ` } });
        expect(screen.getByText(/Perfect Match!/)).toBeInTheDocument();
        expect(screen.getAllByText('MATCH', { exact: true })).toHaveLength(1);
        expect(hashes(container)).toEqual(references);
      }
      fireEvent.change(expected, { target: { value: '' } });
      expect(screen.queryByText('MATCH', { exact: true })).not.toBeInTheDocument();
      expect(hashes(container)).toEqual(references);
      expect(calculate).toHaveBeenCalledTimes(calculationCount);
      expect(digest).toHaveBeenCalledTimes(digestCount);
    },
  );

  it('uses the latest expected hash when a pending file calculation finishes', async () => {
    const view = await readyControlledTool();
    const bytes = encoder.encode('abc');
    selectFile(view.file, 'pending.bin', bytes);
    await completeRead(view.readers[0], bytes);
    const fileDigest = view.pending[1];
    fireEvent.change(view.expected, { target: { value: md5(defaultText) } });
    fireEvent.change(view.expected, { target: { value: ` ${md5(bytes).toUpperCase()} ` } });
    expect(hashes(view.container)).toEqual([]);
    expect(screen.queryByText(/Perfect Match!/)).not.toBeInTheDocument();
    expect(view.pending).toHaveLength(2);
    await finishDigest(fileDigest);
    await waitFor(() => expect(screen.getByText(/Perfect Match!/)).toBeInTheDocument());
    expect(screen.getAllByText('MATCH', { exact: true })).toHaveLength(1);
    expect(screen.getByDisplayValue(md5(bytes))).toBeInTheDocument();
  });

  it.each(['read', 'hash'] as const)('keeps file B when file A %s finishes last', async (phase) => {
    const view = await readyControlledTool();
    const a = encoder.encode('file A');
    const b = encoder.encode('file B');
    selectFile(view.file, 'a.bin', a);
    const readerA = view.readers[0];
    let digestA: DigestRequest | undefined;
    if (phase === 'hash') {
      await completeRead(readerA, a);
      digestA = view.pending[1];
    }
    selectFile(view.file, 'b.bin', b);
    expect(hashes(view.container)).toEqual([]);
    await completeRead(view.readers[1], b);
    await finishDigest(view.pending[view.pending.length - 1]);
    await waitFor(() => expect(screen.getByDisplayValue(md5(b))).toBeInTheDocument());
    const newestHashes = hashes(view.container);
    if (digestA) await finishDigest(digestA);
    else await finishLateRead(readerA, a, view.pending);
    expect(hashes(view.container)).toEqual(newestHashes);
    expect(screen.getByText(/b\.bin/)).toBeInTheDocument();
    expect(screen.queryByText(/a\.bin/)).not.toBeInTheDocument();
  });

  it.each(['read', 'hash'] as const)(
    'keeps edited text when an earlier file %s finishes',
    async (phase) => {
      const view = await readyControlledTool();
      const bytes = encoder.encode('old file');
      selectFile(view.file, 'old.bin', bytes);
      const reader = view.readers[0];
      let fileDigest: DigestRequest | undefined;
      if (phase === 'hash') {
        await completeRead(reader, bytes);
        fileDigest = view.pending[1];
      }
      fireEvent.change(view.text, { target: { value: 'new text' } });
      expect(hashes(view.container)).toEqual([]);
      await finishDigest(view.pending[view.pending.length - 1]);
      await waitFor(() => expect(screen.getByDisplayValue(md5('new text'))).toBeInTheDocument());
      const textHashes = hashes(view.container);
      if (fileDigest) await finishDigest(fileDigest);
      else await finishLateRead(reader, bytes, view.pending);
      expect(hashes(view.container)).toEqual(textHashes);
      expect(screen.queryByText(/old\.bin/)).not.toBeInTheDocument();
    },
  );

  it('keeps the selected file when the previous text digest finishes afterward', async () => {
    const readers = controlledReaders();
    const pending = controlledDigests();
    const { container } = render(<FileChecksumComparatorTool />);
    const previousTextDigest = pending[0];
    const bytes = encoder.encode('new file');
    selectFile(inputs(container).file, 'new.bin', bytes);
    await completeRead(readers[0], bytes);
    await finishDigest(pending[1]);
    await waitFor(() => expect(screen.getByDisplayValue(md5(bytes))).toBeInTheDocument());
    const fileHashes = hashes(container);
    await finishDigest(previousTextDigest);
    expect(hashes(container)).toEqual(fileHashes);
    expect(screen.getByText(/new\.bin/)).toBeInTheDocument();
  });

  it('returns to text when the file input is cleared and resets the input for reselection', async () => {
    const view = await readyControlledTool();
    const bytes = encoder.encode('cancelled file');
    // jsdom cannot assign a native file path, so emulate the browser's populated value.
    Object.defineProperty(view.file, 'value', {
      configurable: true,
      writable: true,
      value: 'C:\\fakepath\\cancelled.bin',
    });
    selectFile(view.file, 'cancelled.bin', bytes);
    expect(view.file.value).toBe('');
    const reader = view.readers[0];
    fireEvent.change(view.file, { target: { files: [] } });
    await finishDigest(view.pending[view.pending.length - 1]);
    await waitFor(() => expect(screen.getByDisplayValue(md5(defaultText))).toBeInTheDocument());
    const textHashes = hashes(view.container);
    await finishLateRead(reader, bytes, view.pending);
    expect(hashes(view.container)).toEqual(textHashes);
    expect(screen.queryByText(/cancelled\.bin/)).not.toBeInTheDocument();
  });

  it('aborts an unfinished read on unmount and ignores its queued completion', async () => {
    const calculate = vi.spyOn(checksumLibrary, 'calculateAllChecksums');
    const view = await readyControlledTool();
    const bytes = encoder.encode('unmounted file');
    selectFile(view.file, 'unmounted.bin', bytes);
    const reader = view.readers[0];
    const calculationCount = calculate.mock.calls.length;
    view.unmount();
    expect(reader.abort).toHaveBeenCalledTimes(1);
    await completeRead(reader, bytes);
    expect(calculate).toHaveBeenCalledTimes(calculationCount);
    expect(view.container).toBeEmptyDOMElement();
  });

  it('reads and calculates again when the same File object is selected twice', async () => {
    const view = await readyControlledTool();
    const bytes = encoder.encode('same file bytes');
    const sameFile = new File([bytes], 'same.bin');
    fireEvent.change(view.file, { target: { files: [sameFile] } });
    await completeRead(view.readers[0], bytes);
    await finishDigest(view.pending[1]);
    await waitFor(() => expect(screen.getByDisplayValue(md5(bytes))).toBeInTheDocument());
    const originalHashes = hashes(view.container);

    fireEvent.change(view.file, { target: { files: [sameFile] } });
    expect(hashes(view.container)).toEqual([]);
    expect(view.readers).toHaveLength(2);
    await completeRead(view.readers[1], bytes);
    expect(view.pending).toHaveLength(3);
    await finishDigest(view.pending[2]);
    await waitFor(() => expect(hashes(view.container)).toEqual(originalHashes));
    expect(screen.getByText(/same\.bin/)).toBeInTheDocument();
  });

  it('ignores old read errors, reports an active read error, and clears it when switching to text', async () => {
    const view = await readyControlledTool();
    const a = encoder.encode('old file');
    const b = encoder.encode('current file');
    selectFile(view.file, 'old-error.bin', a);
    const oldReader = view.readers[0];
    selectFile(view.file, 'current.bin', b);
    await act(async () => oldReader.fail());
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    await completeRead(view.readers[1], b);
    await finishDigest(view.pending[view.pending.length - 1]);
    await waitFor(() => expect(screen.getByDisplayValue(md5(b))).toBeInTheDocument());
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    selectFile(view.file, 'broken.bin', a);
    const brokenReader = view.readers[2];
    await act(async () => brokenReader.fail());
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Could not read or hash this input. Try again.',
    );
    expect(hashes(view.container)).toEqual([]);
    fireEvent.change(view.text, { target: { value: 'recovered text' } });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    await finishDigest(view.pending[view.pending.length - 1]);
    await waitFor(() =>
      expect(screen.getByDisplayValue(md5('recovered text'))).toBeInTheDocument(),
    );
    await act(async () => brokenReader.fail());
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue(md5('recovered text'))).toBeInTheDocument();
  });
});

describe('FileChecksumComparatorTool', () => {
  it('preserves file hashes when the expected checksum is pasted, changed and cleared', async () => {
    const calculate = vi.spyOn(checksumLibrary, 'calculateAllChecksums');
    const { container } = render(<FileChecksumComparatorTool />);
    const fileInput = container.querySelector<HTMLInputElement>('input[type="file"]')!;
    const digest = 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad';
    fireEvent.change(fileInput, { target: { files: [new File(['abc'], 'sample.txt')] } });
    await waitFor(() => expect(screen.getByDisplayValue(digest)).toBeInTheDocument());
    const hashes = () =>
      Array.from(
        container.querySelectorAll<HTMLInputElement>('input[readonly]'),
        (input) => input.value,
      );
    const originalHashes = hashes();
    const calculations = calculate.mock.calls.length;
    const expected = screen.getByPlaceholderText('e.g. 5eb63bbbe01eeed093cb22bb8f5acdc3...');
    fireEvent.change(expected, { target: { value: ` ${digest.toUpperCase()} ` } });
    await waitFor(() => expect(screen.getByText(/Perfect Match!/)).toBeInTheDocument());
    expect(hashes()).toEqual(originalHashes);
    expect(screen.queryByText(/File checksum is authentic/)).not.toBeInTheDocument();
    for (const hash of originalHashes) {
      fireEvent.change(expected, { target: { value: hash } });
      expect(screen.getByText('MATCH')).toBeInTheDocument();
      expect(hashes()).toEqual(originalHashes);
    }
    fireEvent.change(expected, { target: { value: '0'.repeat(64) } });
    await waitFor(() => expect(screen.getByText(/No matching hash/)).toBeInTheDocument());
    expect(hashes()).toEqual(originalHashes);
    expect(calculate).toHaveBeenCalledTimes(calculations);
    fireEvent.change(expected, { target: { value: '' } });
    await waitFor(() => expect(screen.queryByText(/No matching hash/)).not.toBeInTheDocument());
    expect(hashes()).toEqual(originalHashes);
  });
});
