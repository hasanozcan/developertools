'use client';

import { useState, useCallback } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import CopyButton from '@/components/common/CopyButton';
import { useLanguage } from '@/context/LanguageContext';

// SHA256 implementation (client-side)
async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function Sha256HashTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');
  const [uppercase, setUppercase] = useState(false);

  const generateHash = useCallback(async () => {
    if (!input) {
      setHash('');
      return;
    }
    const result = await sha256(input);
    setHash(uppercase ? result.toUpperCase() : result);
  }, [input, uppercase]);

  const handleInputChange = useCallback(async (value: string) => {
    setInput(value);
    if (value) {
      const result = await sha256(value);
      setHash(uppercase ? result.toUpperCase() : result);
    } else {
      setHash('');
    }
  }, [uppercase]);

  const loadSample = useCallback(async () => {
    const sampleText = 'Hello, World! This is a sample text for SHA256 hashing.';
    setInput(sampleText);
    const result = await sha256(sampleText);
    setHash(uppercase ? result.toUpperCase() : result);
  }, [uppercase]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={generateHash}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          {t('tool.sha256Hash.generateHash')}
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
            checked={uppercase}
            onChange={(e) => {
              setUppercase(e.target.checked);
              if (hash) {
                setHash(e.target.checked ? hash.toUpperCase() : hash.toLowerCase());
              }
            }}
            className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-primary-600"
          />
          {t('common.uppercase')}
        </label>
      </div>

      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('common.input')}</label>
        <CodeEditor
          value={input}
          onChange={handleInputChange}
          placeholder="Enter text to generate SHA256 hash..."
          language="text"
          minHeight="150px"
        />
      </div>

      {/* Output */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('tool.sha256Hash.sha256Hash')}</label>
        <div className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <code className="flex-1 font-mono text-sm break-all text-gray-800 dark:text-gray-200">
            {hash || 'Hash will appear here...'}
          </code>
          {hash && <CopyButton text={hash} />}
        </div>
      </div>

      {/* Info */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>{t('tool.sha256Hash.infoText')}</p>
      </div>
    </div>
  );
}
