'use client';

import { useCallback, useMemo, useState } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import { useLanguage } from '@/context/LanguageContext';

type ParsedUrlResult = {
  href: string;
  protocol: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  origin: string;
  queryParams: Record<string, string | string[]>;
};

function parseUrlInput(rawInput: string): ParsedUrlResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    throw new Error('URL input is empty');
  }

  const candidate = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const parsed = new URL(candidate);
  const queryParams: Record<string, string | string[]> = {};

  parsed.searchParams.forEach((value, key) => {
    if (!(key in queryParams)) {
      queryParams[key] = value;
      return;
    }

    const existing = queryParams[key];
    queryParams[key] = Array.isArray(existing) ? [...existing, value] : [existing, value];
  });

  return {
    href: parsed.href,
    protocol: parsed.protocol,
    host: parsed.host,
    hostname: parsed.hostname,
    port: parsed.port || '(default)',
    pathname: parsed.pathname,
    search: parsed.search || '(empty)',
    hash: parsed.hash || '(empty)',
    origin: parsed.origin,
    queryParams,
  };
}

export default function UrlParserTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ParsedUrlResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parseUrl = useCallback(() => {
    if (!input.trim()) {
      setResult(null);
      setError(null);
      return;
    }

    try {
      const parsed = parseUrlInput(input);
      setResult(parsed);
      setError(null);
    } catch (parseError) {
      setError((parseError as Error).message || 'Invalid URL');
      setResult(null);
    }
  }, [input]);

  const loadSample = useCallback(() => {
    setInput(
      'https://api.example.com:8443/v1/users/list?page=2&pageSize=25&sort=createdAt#top',
    );
    setResult(null);
    setError(null);
  }, []);

  const clearAll = useCallback(() => {
    setInput('');
    setResult(null);
    setError(null);
  }, []);

  const resultJson = useMemo(() => {
    if (!result) {
      return '';
    }

    return JSON.stringify(result, null, 2);
  }, [result]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={parseUrl}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          Parse URL
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

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          URL Input
        </label>
        <CodeEditor
          value={input}
          onChange={setInput}
          language="text"
          placeholder="Enter a full URL or hostname/path..."
          minHeight="140px"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Parsed Output (JSON)
        </label>
        <CodeEditor
          value={resultJson}
          onChange={() => {}}
          readOnly
          language="json"
          placeholder="Parsed URL result will appear here..."
          minHeight="260px"
        />
      </div>
    </div>
  );
}
