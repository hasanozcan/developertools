'use client';

import { useCallback, useState } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import { useLanguage } from '@/context/LanguageContext';

type Mode = 'escape' | 'unescape';

function escapeJsonString(input: string): string {
  return JSON.stringify(input).slice(1, -1);
}

function unescapeJsonString(input: string): string {
  const wrapped = `"${input.replace(/"/g, '\\"').replace(/\r/g, '\\r').replace(/\n/g, '\\n')}"`;
  return JSON.parse(wrapped);
}

export default function JsonStringEscapeTool() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<Mode>('escape');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = useCallback(() => {
    if (!input) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const result = mode === 'escape' ? escapeJsonString(input) : unescapeJsonString(input);
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
    if (mode === 'escape') {
      setInput('Line 1\nLine 2\t"quoted"');
    } else {
      setInput('Line 1\\nLine 2\\t\\"quoted\\"');
    }
    setOutput('');
    setError(null);
  }, [mode]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <button
            onClick={() => setMode('escape')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'escape'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Escape
          </button>
          <button
            onClick={() => setMode('unescape')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'unescape'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Unescape
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
            language="text"
            placeholder={mode === 'escape' ? 'Enter raw text...' : 'Enter escaped JSON string fragment...'}
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
    </div>
  );
}
