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

export default function UrlEncoderTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [encodeType, setEncodeType] = useState<'component' | 'full'>('component');
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
            result = encodeType === 'component' 
              ? encodeURIComponent(line)
              : encodeURI(line);
          } else {
            result = encodeType === 'component'
              ? decodeURIComponent(line)
              : decodeURI(line);
          }
          return { input: line, output: result, index };
        });
        setBatchResults(results);
        setOutput('');
      } else {
        // Single processing
        if (mode === 'encode') {
          const encoded = encodeType === 'component' 
            ? encodeURIComponent(input)
            : encodeURI(input);
          setOutput(encoded);
        } else {
          const decoded = encodeType === 'component'
            ? decodeURIComponent(input)
            : decodeURI(input);
          setOutput(decoded);
        }
        setBatchResults([]);
      }
      setError(null);
    } catch (e) {
      setError('Invalid input for ' + (mode === 'decode' ? 'decoding' : 'encoding'));
      setOutput('');
      setBatchResults([]);
    }
  }, [input, mode, encodeType, batchMode]);

  const swapMode = useCallback(() => {
    setMode((prev) => (prev === 'encode' ? 'decode' : 'encode'));
    setInput(output);
    setOutput('');
    setError(null);
    setBatchResults([]);
  }, [output]);

  const loadSample = useCallback(() => {
    if (mode === 'encode') {
      setInput(batchMode 
        ? 'https://example.com/search?q=hello world\nhttps://example.com/page?name=John Doe\nhttps://example.com/test?data=foo&bar=baz'
        : 'https://example.com/search?q=hello world&lang=en&special=<>#%');
    } else {
      setInput(batchMode
        ? 'https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world\nhttps%3A%2F%2Fexample.com%2Fpage%3Fname%3DJohn%20Doe'
        : 'https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world%26lang%3Den%26special%3D%3C%3E%23%25');
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
      {/* Controls */}
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
        
        <select
          value={encodeType}
          onChange={(e) => setEncodeType(e.target.value as 'component' | 'full')}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="component">{t('tool.urlEncoder.componentOption')}</option>
          <option value="full">{t('tool.urlEncoder.fullUrlOption')}</option>
        </select>

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
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title={t('tool.urlEncoder.swapTooltip')}
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
          {error}
        </div>
      )}

      {/* Input/Output */}
      {batchMode ? (
        // Batch Mode Layout
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {mode === 'encode' ? 'URL Lines (one per line)' : 'Encoded URL Lines (one per line)'}
            </label>
            <CodeEditor
              value={input}
              onChange={setInput}
              placeholder={mode === 'encode' 
                ? 'https://example.com/page1?query=hello world\nhttps://example.com/page2?name=test'
                : 'https%3A%2F%2Fexample.com%2Fpage1%3Fquery%3Dhello%20world\nhttps%3A%2F%2Fexample.com%2Fpage2'}
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
                    Enter URLs and click convert to see results
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {mode === 'encode' ? t('tool.urlEncoder.plainText') : t('tool.urlEncoder.encodedUrl')}
            </label>
            <CodeEditor
              value={input}
              onChange={setInput}
              placeholder={mode === 'encode' ? t('tool.urlEncoder.enterTextToEncode') : t('tool.urlEncoder.enterTextToDecode')}
              language="text"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {mode === 'encode' ? t('tool.urlEncoder.encodedOutput') : t('tool.urlEncoder.decodedText')}
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
