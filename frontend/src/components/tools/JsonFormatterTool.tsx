'use client';

import { useState, useCallback } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import { CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

function sortJsonKeys(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortJsonKeys);
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b));
    const sorted: Record<string, unknown> = {};
    for (const [key, item] of entries) {
      sorted[key] = sortJsonKeys(item);
    }
    return sorted;
  }

  return value;
}

export default function JsonFormatterTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [indentSize, setIndentSize] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);

  const formatJson = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const normalized = sortKeys ? sortJsonKeys(parsed) : parsed;
      const formatted = JSON.stringify(normalized, null, indentSize);
      setOutput(formatted);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  }, [input, indentSize, sortKeys]);

  const minifyJson = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const normalized = sortKeys ? sortJsonKeys(parsed) : parsed;
      const minified = JSON.stringify(normalized);
      setOutput(minified);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  }, [input, sortKeys]);

  const loadSample = useCallback(() => {
    const sampleJson = {
      "name": "John Doe",
      "age": 30,
      "email": "john@example.com",
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "country": "USA"
      },
      "hobbies": ["reading", "coding", "gaming"],
      "isActive": true
    };
    setInput(JSON.stringify(sampleJson));
    setOutput('');
    setError(null);
  }, []);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={formatJson}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          {t('common.format')} JSON
        </button>
        <button
          onClick={minifyJson}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          {t('common.minify')}
        </button>
        <button
          onClick={loadSample}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          {t('common.loadSample')}
        </button>
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <input
            type="checkbox"
            checked={sortKeys}
            onChange={(e) => setSortKeys(e.target.checked)}
            className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-primary-600"
          />
          {t('tool.jsonFormatter.sortKeys')}
        </label>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">{t('tool.jsonFormatter.indentSize')}:</label>
          <select
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value={2}>2 {t('common.spaces')}</option>
            <option value={4}>4 {t('common.spaces')}</option>
            <option value={1}>{t('common.tab')}</option>
          </select>
        </div>
      </div>

      {/* Status */}
      {input && (
        <div className={`flex items-center gap-2 text-sm ${error ? 'text-red-600' : 'text-green-600'}`}>
          {error ? (
            <>
              <XCircle className="w-4 h-4" />
              <span>{t('tool.jsonValidator.invalid')}: {error}</span>
            </>
          ) : output ? (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>{t('tool.jsonValidator.valid')}</span>
            </>
          ) : null}
        </div>
      )}

      {/* Input/Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.input')} JSON</label>
          <CodeEditor
            value={input}
            onChange={setInput}
            placeholder={t('tool.jsonFormatter.inputPlaceholder')}
            language="json"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.output')}</label>
          <CodeEditor
            value={output}
            onChange={() => {}}
            readOnly
            language="json"
            placeholder={t('common.result') + '...'}
          />
        </div>
      </div>
    </div>
  );
}
