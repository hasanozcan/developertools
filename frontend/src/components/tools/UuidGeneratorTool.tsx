'use client';

import { useState, useCallback, useEffect } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { RefreshCw, Trash2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UuidGeneratorTool() {
  const { t } = useLanguage();
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [noDashes, setNoDashes] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Generate initial UUID on client-side only to avoid hydration mismatch
  useEffect(() => {
    if (!isInitialized) {
      setUuids([generateUUID()]);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const formatUuid = useCallback((uuid: string): string => {
    let formatted = uuid;
    if (noDashes) {
      formatted = formatted.replace(/-/g, '');
    }
    if (uppercase) {
      formatted = formatted.toUpperCase();
    }
    return formatted;
  }, [uppercase, noDashes]);

  const generateUuids = useCallback(() => {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuids(newUuids);
  }, [count]);

  const clearUuids = useCallback(() => {
    setUuids([]);
  }, []);

  const allUuids = uuids.map(formatUuid).join('\n');

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">{t('tool.uuidGenerator.quantity')}:</label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
            className="w-20 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-primary-600"
          />
          {t('tool.uuidGenerator.uppercase')}
        </label>
        
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <input
            type="checkbox"
            checked={noDashes}
            onChange={(e) => setNoDashes(e.target.checked)}
            className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-primary-600"
          />
          {t('tool.uuidGenerator.hyphens')}
        </label>

        <button
          onClick={generateUuids}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          {t('common.generate')}
        </button>

        <button
          onClick={clearUuids}
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title={t('common.clear')}
        >
          <Trash2 className="w-5 h-5" />
        </button>

        <CopyButton text={allUuids} />
      </div>

      {/* Generated UUIDs */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 p-4">
        {uuids.length > 0 ? (
          <div className="space-y-2">
            {uuids.map((uuid, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-600"
              >
                <code className="font-mono text-sm text-gray-800 dark:text-gray-200">
                  {formatUuid(uuid)}
                </code>
                <CopyButton text={formatUuid(uuid)} className="text-xs" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">{t('common.generate')}...</p>
        )}
      </div>

      {/* Info */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>{t('tool.uuidGenerator.info')}</p>
      </div>
    </div>
  );
}
