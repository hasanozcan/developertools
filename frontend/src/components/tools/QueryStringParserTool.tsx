'use client';

import { useCallback, useState } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import { useLanguage } from '@/context/LanguageContext';

type Mode = 'parse' | 'build';

function extractQuery(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    return '';
  }

  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)) {
    const parsedUrl = new URL(trimmed);
    return parsedUrl.search.startsWith('?') ? parsedUrl.search.slice(1) : parsedUrl.search;
  }

  let query = trimmed;
  const questionMarkIndex = query.indexOf('?');
  if (questionMarkIndex >= 0) {
    query = query.slice(questionMarkIndex + 1);
  }

  const hashIndex = query.indexOf('#');
  if (hashIndex >= 0) {
    query = query.slice(0, hashIndex);
  }

  if (query.startsWith('?')) {
    return query.slice(1);
  }

  return query;
}

function parseQueryString(input: string): string {
  const query = extractQuery(input);
  const params = new URLSearchParams(query);
  const result: Record<string, string | string[]> = {};

  params.forEach((value, key) => {
    if (!(key in result)) {
      result[key] = value;
      return;
    }

    const current = result[key];
    result[key] = Array.isArray(current) ? [...current, value] : [current, value];
  });

  return JSON.stringify(result, null, 2);
}

function buildQueryString(input: string, prependQuestionMark: boolean): string {
  const parsed = JSON.parse(input) as Record<string, unknown>;
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('JSON input must be an object');
  }

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(parsed)) {
    if (value === null || value === undefined) {
      continue;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, String(item)));
      continue;
    }

    if (typeof value === 'object') {
      params.append(key, JSON.stringify(value));
      continue;
    }

    params.append(key, String(value));
  }

  const result = params.toString();
  if (!prependQuestionMark || !result) {
    return result;
  }

  return `?${result}`;
}

export default function QueryStringParserTool() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<Mode>('parse');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [prependQuestionMark, setPrependQuestionMark] = useState(true);

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const result =
        mode === 'parse' ? parseQueryString(input) : buildQueryString(input, prependQuestionMark);
      setOutput(result);
      setError(null);
    } catch (conversionError) {
      setError((conversionError as Error).message || 'Conversion failed');
      setOutput('');
    }
  }, [input, mode, prependQuestionMark]);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
    setError(null);
  }, []);

  const loadSample = useCallback(() => {
    if (mode === 'parse') {
      setInput('https://example.com/products?page=2&tags=dev&tags=tools&sort=desc');
    } else {
      setInput('{\n  "page": 2,\n  "tags": ["dev", "tools"],\n  "sort": "desc"\n}');
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

      {mode === 'build' && (
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <input
            type="checkbox"
            checked={prependQuestionMark}
            onChange={(event) => setPrependQuestionMark(event.target.checked)}
            className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-primary-600"
          />
          Prepend question mark (?)
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
            language={mode === 'build' ? 'json' : 'text'}
            placeholder={
              mode === 'parse'
                ? 'Enter URL or query string...'
                : 'Enter JSON object to build query string...'
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
            language={mode === 'parse' ? 'json' : 'text'}
            placeholder="Result will appear here..."
            minHeight="220px"
          />
        </div>
      </div>
    </div>
  );
}
