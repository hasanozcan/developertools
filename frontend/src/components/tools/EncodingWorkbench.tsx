'use client';

import { useMemo, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import {
  convertEncoding,
  EncodingWorkbenchFormat,
  EncodingWorkbenchMode,
} from '@/lib/encodingWorkbench';

const formats: Array<{
  value: EncodingWorkbenchFormat;
  label: string;
  encodeSample: string;
  decodeSample: string;
}> = [
  {
    value: 'base64',
    label: 'Base64',
    encodeSample: 'Hello, world!',
    decodeSample: 'SGVsbG8sIHdvcmxkIQ==',
  },
  {
    value: 'url',
    label: 'URL component',
    encodeSample: 'name=Ada Lovelace&role=admin',
    decodeSample: 'name%3DAda%20Lovelace%26role%3Dadmin',
  },
  { value: 'hex', label: 'Hexadecimal', encodeSample: 'Hello', decodeSample: '48656c6c6f' },
  { value: 'binary', label: 'Binary', encodeSample: 'Hi', decodeSample: '01001000 01101001' },
  {
    value: 'json-string',
    label: 'JSON string',
    encodeSample: 'Line 1\n"quoted"',
    decodeSample: 'Line 1\\n\\"quoted\\"',
  },
];

export default function EncodingWorkbench() {
  const [format, setFormat] = useState<EncodingWorkbenchFormat>('base64');
  const [mode, setMode] = useState<EncodingWorkbenchMode>('encode');
  const [input, setInput] = useState('');

  const conversion = useMemo(() => {
    try {
      return { output: convertEncoding(input, format, mode), error: '' };
    } catch (error) {
      return { output: '', error: error instanceof Error ? error.message : 'Conversion failed.' };
    }
  }, [format, input, mode]);

  const selectedFormat = formats.find((item) => item.value === format) || formats[0];

  const swapDirection = () => {
    if (conversion.output) setInput(conversion.output);
    setMode((currentMode) => (currentMode === 'encode' ? 'decode' : 'encode'));
  };

  return (
    <section
      aria-labelledby="encoding-workbench-heading"
      className="mb-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
      data-tool-interface="true"
    >
      <div className="mb-5">
        <h2
          id="encoding-workbench-heading"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          Encoder online workbench
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Encode or decode UTF-8 text as Base64, a URL component, hexadecimal bytes, binary bytes,
          or JSON string content. Conversion runs in this browser.
        </p>
      </div>

      <div className="mb-5 flex flex-wrap items-end gap-3">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Format
          <select
            value={format}
            onChange={(event) => setFormat(event.target.value as EncodingWorkbenchFormat)}
            className="mt-1 block rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            {formats.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <div className="inline-flex overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600">
          {(['encode', 'decode'] as EncodingWorkbenchMode[]).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={mode === item}
              onClick={() => setMode(item)}
              className={`px-4 py-2 text-sm font-medium capitalize ${
                mode === item
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={swapDirection}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          Swap direction
        </button>
        <button
          type="button"
          onClick={() =>
            setInput(mode === 'encode' ? selectedFormat.encodeSample : selectedFormat.decodeSample)
          }
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          Load sample
        </button>
        <button
          type="button"
          onClick={() => setInput('')}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Input
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            spellCheck={false}
            placeholder={`${mode === 'encode' ? 'Text to encode' : `${selectedFormat.label} to decode`}...`}
            className="mt-2 min-h-48 w-full resize-y rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:ring-primary-800"
          />
        </label>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="encoding-workbench-output"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Output
            </label>
            <CopyButton text={conversion.output} />
          </div>
          <textarea
            id="encoding-workbench-output"
            value={conversion.output}
            readOnly
            spellCheck={false}
            placeholder="Converted output appears here..."
            className="mt-2 min-h-48 w-full resize-y rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
          {conversion.error && (
            <p role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">
              {conversion.error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
