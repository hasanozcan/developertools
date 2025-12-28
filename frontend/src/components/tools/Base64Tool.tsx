'use client';

import { useState, useCallback } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import { ArrowDownUp, Check, Layers } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface BatchResult {
  input: string;
  output: string;
  index: number;
}

export default function Base64Tool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState<string | null>(null);
  const [batchMode, setBatchMode] = useState(false);
  const [batchResults, setBatchResults] = useState<BatchResult[]>([]);
  const [copied, setCopied] = useState(false);

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      setBatchResults([]);
      return;
    }

    try {
      if (batchMode) {
        // Batch processing
        const lines = input.split('\n').filter(line => line.trim());
        const results: BatchResult[] = lines.map((line, index) => {
          let result = '';
          if (mode === 'encode') {
            result = btoa(unescape(encodeURIComponent(line)));
          } else {
            result = decodeURIComponent(escape(atob(line)));
          }
          return { input: line, output: result, index };
        });
        setBatchResults(results);
        setOutput('');
      } else {
        // Single processing
        if (mode === 'encode') {
          const encoded = btoa(unescape(encodeURIComponent(input)));
          setOutput(encoded);
        } else {
          const decoded = decodeURIComponent(escape(atob(input)));
          setOutput(decoded);
        }
        setBatchResults([]);
      }
      setError(null);
    } catch (e) {
      setError(mode === 'decode' ? t('common.error') + ': Invalid Base64' : t('common.error'));
      setOutput('');
      setBatchResults([]);
    }
  }, [input, mode, t, batchMode]);

  const swapMode = useCallback(() => {
    setMode((prev) => (prev === 'encode' ? 'decode' : 'encode'));
    setInput(output);
    setOutput('');
    setError(null);
    setBatchResults([]);
  }, [input, output]);

  const loadSample = useCallback(() => {
    if (mode === 'encode') {
      setInput(batchMode ? 'Hello, World!\nThis is a sample\nThird line to encode' : 'Hello, World! This is a sample text to encode to Base64.');
    } else {
      setInput(batchMode ? 'SGVsbG8sIFdvcmxkIQ==\nVGhpcyBpcyBhIHNhbXBsZQ==\nVGhpcmQgbGluZSB0byBlbmNvZGU=' : 'SGVsbG8sIFdvcmxkISBUaGlzIGlzIGEgc2FtcGxlIHRleHQgdG8gZW5jb2RlIHRvIEJhc2U2NC4=');
    }
    setOutput('');
    setError(null);
    setBatchResults([]);
  }, [mode, batchMode]);

  const copyToClipboard = useCallback(() => {
    if (batchMode) {
      const allResults = batchResults.map(r => r.output).join('\n');
      navigator.clipboard.writeText(allResults);
    } else {
      navigator.clipboard.writeText(output);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [batchMode, batchResults, output]);

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'encode'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            {t('common.encode')}
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'decode'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            {t('common.decode')}
          </button>
        </div>

        {/* Batch Mode Toggle */}
        <label className="flex items-center gap-2 cursor-pointer px-3 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <input
            type="checkbox"
            checked={batchMode}
            onChange={(e) => setBatchMode(e.target.checked)}
            className="w-4 h-4 text-primary-600 rounded border-gray-300 dark:border-gray-600"
          />
          <Layers className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-700 dark:text-gray-300">Batch Mode</span>
        </label>

        <button
          onClick={handleConvert}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          {mode === 'encode' ? t('common.encode') : t('common.decode')}
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
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-4 py-2 rounded-lg">
          Error: {error}
        </div>
      )}

      {/* Input/Output */}
      {batchMode ? (
        // Batch Mode Layout
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {mode === 'encode' ? 'Text Lines (one per line)' : 'Base64 Lines (one per line)'}
            </label>
            <CodeEditor
              value={input}
              onChange={setInput}
              placeholder={mode === 'encode' 
                ? 'Line 1\nLine 2\nLine 3' 
                : 'SGVsbG8=\nV29ybGQ=\nTElORVM='}
              language="text"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Results ({batchResults.length})
              </label>
              {batchResults.length > 0 && (
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : 'Copy All'}
                </button>
              )}
            </div>
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
              <div className="max-h-80 overflow-y-auto">
                {batchResults.map((result) => (
                  <div
                    key={result.index}
                    className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-600 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate" title={result.input}>
                        {result.input}
                      </div>
                      <div className="font-mono text-sm text-gray-900 dark:text-white truncate">
                        {result.output}
                      </div>
                    </div>
                  </div>
                ))}
                {batchResults.length === 0 && (
                  <div className="px-4 py-8 text-center text-gray-400 dark:text-gray-500 text-sm">
                    Enter text and click convert to see results
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Single Mode Layout
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
      )}
    </div>
  );
}
