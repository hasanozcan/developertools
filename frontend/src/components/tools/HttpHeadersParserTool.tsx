'use client';

import { useCallback, useState } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import { useLanguage } from '@/context/LanguageContext';

type Mode = 'parse' | 'build';

function parseHeaders(input: string): string {
  const result: Record<string, string | string[]> = {};
  const lines = input.split(/\r?\n/).map((line) => line.trim());

  lines.forEach((line) => {
    if (!line) {
      return;
    }

    const separatorIndex = line.indexOf(':');
    if (separatorIndex < 1) {
      throw new Error(`Invalid header line: ${line}`);
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    if (!(key in result)) {
      result[key] = value;
      return;
    }

    const current = result[key];
    result[key] = Array.isArray(current) ? [...current, value] : [current, value];
  });

  return JSON.stringify(result, null, 2);
}

function buildHeaders(input: string): string {
  const parsed = JSON.parse(input) as Record<string, unknown>;
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('JSON input must be an object');
  }

  const lines: string[] = [];
  for (const [key, value] of Object.entries(parsed)) {
    if (value === null || value === undefined) {
      continue;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => lines.push(`${key}: ${String(item)}`));
      continue;
    }

    lines.push(`${key}: ${String(value)}`);
  }

  return lines.join('\n');
}

export default function HttpHeadersParserTool() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<Mode>('parse');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const result = mode === 'parse' ? parseHeaders(input) : buildHeaders(input);
      setOutput(result);
      setError(null);
    } catch (conversionError) {
      setError((conversionError as Error).message || 'Conversion failed');
      setOutput('');
    }
  }, [input, mode]);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
    setError(null);
  }, []);

  const loadSample = useCallback(() => {
    if (mode === 'parse') {
      setInput(
        'Content-Type: application/json\nAuthorization: Bearer token\nX-Request-ID: abc-123\nCache-Control: no-cache',
      );
    } else {
      setInput(
        '{\n  "Content-Type": "application/json",\n  "Authorization": "Bearer token",\n  "X-Request-ID": "abc-123"\n}',
      );
    }

    setOutput('');
    setError(null);
  }, [mode]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <button
            onClick={() => setMode('parse')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'parse'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Parse
          </button>
          <button
            onClick={() => setMode('build')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'build'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Build
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
            language={mode === 'parse' ? 'text' : 'json'}
            placeholder={mode === 'parse' ? 'Enter raw headers...' : 'Enter headers as JSON object...'}
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
            language={mode === 'parse' ? 'json' : 'text'}
            placeholder="Result will appear here..."
            minHeight="220px"
          />
        </div>
      </div>
    </div>
  );
}
