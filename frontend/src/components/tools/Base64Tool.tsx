'use client';

import { useState, useCallback } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import { ArrowDownUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Base64Tool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      if (mode === 'encode') {
        // Encode to Base64
        const encoded = btoa(unescape(encodeURIComponent(input)));
        setOutput(encoded);
      } else {
        // Decode from Base64
        const decoded = decodeURIComponent(escape(atob(input)));
        setOutput(decoded);
      }
      setError(null);
    } catch (e) {
      setError(mode === 'decode' ? t('common.error') + ': Invalid Base64' : t('common.error'));
      setOutput('');
    }
  }, [input, mode, t]);

  const swapMode = useCallback(() => {
    setMode((prev) => (prev === 'encode' ? 'decode' : 'encode'));
    setInput(output);
    setOutput(input);
    setError(null);
  }, [input, output]);

  const loadSample = useCallback(() => {
    if (mode === 'encode') {
      setInput('Hello, World! This is a sample text to encode to Base64.');
    } else {
      setInput('SGVsbG8sIFdvcmxkISBUaGlzIGlzIGEgc2FtcGxlIHRleHQgdG8gZW5jb2RlIHRvIEJhc2U2NC4=');
    }
    setOutput('');
    setError(null);
  }, [mode]);

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex rounded-lg overflow-hidden border border-gray-300">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'encode'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {t('common.encode')}
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'decode'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {t('common.decode')}
          </button>
        </div>
        <button
          onClick={handleConvert}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          {mode === 'encode' ? t('common.encode') + ' Base64' : t('common.decode') + ' Base64'}
        </button>
        <button
          onClick={swapMode}
          className="p-2 text-gray-500 hover:text-primary-600 rounded-lg hover:bg-gray-100 transition-colors"
          title={t('tool.base64.swapTooltip')}
        >
          <ArrowDownUp className="w-5 h-5" />
        </button>
        <button
          onClick={loadSample}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          {t('common.loadSample')}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="text-sm text-red-600">{error}</div>
      )}

      {/* Input/Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {mode === 'encode' ? t('common.input') : 'Base64'}
          </label>
          <CodeEditor
            value={input}
            onChange={setInput}
            placeholder={t('tool.base64.inputPlaceholder')}
            language="text"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {mode === 'encode' ? 'Base64' : t('common.output')}
          </label>
          <CodeEditor
            value={output}
            onChange={() => {}}
            readOnly
            language="text"
            placeholder={t('common.result') + '...'}
          />
        </div>
      </div>
    </div>
  );
}
