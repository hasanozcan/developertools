'use client';

import { useState, useCallback } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { RefreshCw } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

type HashAlgorithm = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

const HASH_ALGORITHMS: HashAlgorithm[] = ['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];

async function hashWithWebCrypto(algorithm: string, text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function HashGeneratorTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('SHA-256');
  const [uppercase, setUppercase] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateHash = useCallback(async () => {
    if (!input.trim()) {
      setHash('');
      setError('');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const algorithmMap: Record<string, string> = {
        'MD5': 'MD5',
        'SHA-1': 'SHA-1',
        'SHA-256': 'SHA-256',
        'SHA-384': 'SHA-384',
        'SHA-512': 'SHA-512',
      };
      const result = await hashWithWebCrypto(algorithmMap[algorithm], input);
      setHash(uppercase ? result.toUpperCase() : result.toLowerCase());
    } catch (err) {
      setError(t('common.error') + ': ' + (err instanceof Error ? err.message : 'Unknown error'));
      setHash('');
    } finally {
      setIsLoading(false);
    }
  }, [input, algorithm, uppercase, t]);

  const handleAlgorithmChange = (newAlgorithm: HashAlgorithm) => {
    setAlgorithm(newAlgorithm);
    if (hash) {
      generateHash();
    }
  };

  const handleUppercaseToggle = () => {
    setUppercase(!uppercase);
    if (hash) {
      setHash(uppercase ? hash.toLowerCase() : hash.toUpperCase());
    }
  };

  return (
    <div className="space-y-6">
      {/* Hash Output Display */}
      <div className="relative">
        <div className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <code className="flex-1 font-mono text-lg break-all text-gray-900 dark:text-white min-h-[2.5rem]">
            {hash || t('tool.hashGenerator.outputPlaceholder')}
          </code>
          {hash && <CopyButton text={hash} />}
        </div>
        {error && (
          <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
            <span className="text-red-700 dark:text-red-300 text-sm">{error}</span>
          </div>
        )}
      </div>

      {/* Algorithm Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('tool.hashGenerator.selectAlgorithm')}
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {HASH_ALGORITHMS.map((alg) => (
            <button
              key={alg}
              onClick={() => handleAlgorithmChange(alg)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                algorithm === alg
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-150 dark:hover:bg-gray-600'
              }`}
            >
              {alg}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('common.input')}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('tool.hashGenerator.inputPlaceholder')}
          className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg
            text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400
            font-mono text-sm resize-none"
          rows={4}
        />
      </div>

      {/* Options */}
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={handleUppercaseToggle}
            className="w-4 h-4 text-primary-600 rounded border-gray-300 dark:border-gray-600"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {t('tool.hashGenerator.uppercase')}
          </span>
        </label>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateHash}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg
          hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        {t('common.generate')}
      </button>
    </div>
  );
}
