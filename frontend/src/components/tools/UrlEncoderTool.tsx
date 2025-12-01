'use client';

import { useState, useCallback } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import { ArrowDownUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function UrlEncoderTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [encodeType, setEncodeType] = useState<'component' | 'full'>('component');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
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
      setError(null);
    } catch (e) {
      setError('Invalid input for ' + (mode === 'decode' ? 'decoding' : 'encoding'));
      setOutput('');
    }
  }, [input, mode, encodeType]);

  const swapMode = useCallback(() => {
    setMode((prev) => (prev === 'encode' ? 'decode' : 'encode'));
    setInput(output);
    setOutput(input);
    setError(null);
  }, [input, output]);

  const loadSample = useCallback(() => {
    if (mode === 'encode') {
      setInput('https://example.com/search?q=hello world&lang=en&special=<>#%');
    } else {
      setInput('https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world%26lang%3Den%26special%3D%3C%3E%23%25');
    }
    setOutput('');
    setError(null);
  }, [mode]);

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
        <div className="text-sm text-red-600">{error}</div>
      )}

      {/* Input/Output */}
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
    </div>
  );
}
