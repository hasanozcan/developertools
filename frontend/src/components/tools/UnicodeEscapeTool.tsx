'use client';

import { useCallback, useState } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import { useLanguage } from '@/context/LanguageContext';

type Mode = 'encode' | 'decode';

function encodeUnicode(input: string, encodeAscii: boolean): string {
  return Array.from(input)
    .map((char) => {
      const codePoint = char.codePointAt(0);
      if (codePoint === undefined) {
        return char;
      }

      if (!encodeAscii && codePoint <= 0x7f) {
        return char;
      }

      if (codePoint <= 0xffff) {
        return `\\u${codePoint.toString(16).toUpperCase().padStart(4, '0')}`;
      }

      return `\\u{${codePoint.toString(16).toUpperCase()}}`;
    })
    .join('');
}

function decodeUnicode(input: string): string {
  return input
    .replace(/\\u\{([0-9a-fA-F]+)\}/g, (_, hex: string) => {
      const codePoint = Number.parseInt(hex, 16);
      return Number.isNaN(codePoint) ? _ : String.fromCodePoint(codePoint);
    })
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex: string) => {
      const codePoint = Number.parseInt(hex, 16);
      return Number.isNaN(codePoint) ? _ : String.fromCharCode(codePoint);
    })
    .replace(/\\x([0-9a-fA-F]{2})/g, (_, hex: string) => {
      const codePoint = Number.parseInt(hex, 16);
      return Number.isNaN(codePoint) ? _ : String.fromCharCode(codePoint);
    });
}

export default function UnicodeEscapeTool() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<Mode>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [encodeAscii, setEncodeAscii] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const result = mode === 'encode' ? encodeUnicode(input, encodeAscii) : decodeUnicode(input);
      setOutput(result);
      setError(null);
    } catch (conversionError) {
      setError((conversionError as Error).message || 'Conversion failed');
      setOutput('');
    }
  }, [encodeAscii, input, mode]);

  const loadSample = useCallback(() => {
    if (mode === 'encode') {
      setInput('Merhaba dünya 👋 Привет мир');
    } else {
      setInput('\\u0048\\u0065\\u006C\\u006C\\u006F \\u{1F44B} \\u4E16\\u754C');
    }
    setOutput('');
    setError(null);
  }, [mode]);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
    setError(null);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'encode'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            {t('common.encode')}
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'decode'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            {t('common.decode')}
          </button>
        </div>

        <button
          onClick={handleConvert}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          {t('common.convert')}
        </button>
        <button
          onClick={loadSample}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          {t('common.loadSample')}
        </button>
        <button
          onClick={clearAll}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          {t('common.clear')}
        </button>
      </div>

      {mode === 'encode' && (
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <input
            type="checkbox"
            checked={encodeAscii}
            onChange={(event) => setEncodeAscii(event.target.checked)}
            className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-primary-600"
          />
          Encode ASCII characters too
        </label>
      )}

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('common.input')}
          </label>
          <CodeEditor
            value={input}
            onChange={setInput}
            language="text"
            placeholder={
              mode === 'encode'
                ? 'Enter plain text to convert into Unicode escape sequences...'
                : 'Enter escaped text like \\u0041 or \\u{1F680}...'
            }
            minHeight="220px"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('common.output')}
          </label>
          <CodeEditor
            value={output}
            onChange={() => {}}
            readOnly
            language="text"
            placeholder="Result will appear here..."
            minHeight="220px"
          />
        </div>
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
        <p>
          Supports <code>\uXXXX</code>, <code>\u{'{XXXXXX}'}</code>, and <code>\xXX</code> patterns.
        </p>
        <p>Use this tool for JavaScript strings, JSON payloads, and escaped log messages.</p>
      </div>
    </div>
  );
}
