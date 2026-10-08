'use client';

import { useCallback, useState } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import { useLanguage } from '@/context/LanguageContext';

type Mode = 'escape' | 'unescape';

export function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
}

export function unescapeRegex(input: string): string {
  return input.replace(/\\([.*+?^${}()|[\]\\/])/g, '$1');
}

export default function RegexEscapeTool() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<Mode>('escape');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleConvert = useCallback(() => {
    if (!input) {
      setOutput('');
      return;
    }

    setOutput(mode === 'escape' ? escapeRegex(input) : unescapeRegex(input));
  }, [input, mode]);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
  }, []);

  const loadSample = useCallback(() => {
    if (mode === 'escape') {
      setInput('https://example.com/users/(.*)?q=test+1');
    } else {
      setInput('https:\\/\\/example\\.com\\/users\\/\\(\\.\\*\\)\\?q=test\\+1');
    }
    setOutput('');
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
            {t("uiText.b7bb7226")}</button>
          <button
            onClick={() => setMode('unescape')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'unescape'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            {t("uiText.06ee8c0d")}</button>
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
              mode === 'escape' ? t("uiText.0a122378") : t("uiText.9cf9a470")
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
            placeholder={t("tool.htmlEntity.resultPlaceholder")}
            minHeight="220px"
          />
        </div>
      </div>
    </div>
  );
}
