'use client';

import { useState, useCallback, useEffect } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { Download, RefreshCw, Trash2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { formatUuid, generateUuidV4, generateUuidV7, type UuidVersion } from '@/lib/uuid';

const MAX_UUID_COUNT = 1000;

function generateUuid(version: UuidVersion): string {
  return version === 'v7' ? generateUuidV7() : generateUuidV4();
}

export default function UuidGeneratorTool() {
  const { t } = useLanguage();
  const [uuids, setUuids] = useState<string[]>([]);
  const [version, setVersion] = useState<UuidVersion>('v4');
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [includeHyphens, setIncludeHyphens] = useState(true);
  const [includeBraces, setIncludeBraces] = useState(false);
  const [error, setError] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  // Generate initial UUID on client-side only to avoid hydration mismatch
  useEffect(() => {
    if (!isInitialized) {
      try {
        setUuids([generateUuid('v4')]);
      } catch (generationError) {
        setError(generationError instanceof Error ? generationError.message : 'UUID generation failed');
      }
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const formatUuidValue = useCallback((uuid: string): string => formatUuid(uuid, {
    uppercase,
    includeHyphens,
    includeBraces,
  }), [uppercase, includeHyphens, includeBraces]);

  const generateUuids = useCallback(() => {
    try {
      setUuids(Array.from({ length: count }, () => generateUuid(version)));
      setError('');
    } catch (generationError) {
      setUuids([]);
      setError(generationError instanceof Error ? generationError.message : 'UUID generation failed');
    }
  }, [count, version]);

  const clearUuids = useCallback(() => {
    setUuids([]);
  }, []);

  const allUuids = uuids.map(formatUuidValue).join('\n');

  const downloadUuids = useCallback(() => {
    if (!allUuids) return;
    const objectUrl = URL.createObjectURL(new Blob([`${allUuids}\n`], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = `uuid-${version}-batch.txt`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
  }, [allUuids, version]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="uuid-version" className="text-sm text-gray-600 dark:text-gray-400">
            {t('tool.uuidGenerator.version')}:
          </label>
          <select
            id="uuid-version"
            value={version}
            onChange={(event) => {
              setVersion(event.target.value as UuidVersion);
              setUuids([]);
              setError('');
            }}
            className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="v4">UUID v4</option>
            <option value="v7">UUID v7</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="uuid-quantity" className="text-sm text-gray-600 dark:text-gray-400">
            {t('tool.uuidGenerator.quantity')}:
          </label>
          <input
            id="uuid-quantity"
            type="number"
            min={1}
            max={MAX_UUID_COUNT}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(MAX_UUID_COUNT, parseInt(e.target.value) || 1)))}
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
            checked={includeBraces}
            onChange={(e) => setIncludeBraces(e.target.checked)}
            className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-primary-600"
          />
          {t('tool.uuidGenerator.braces')}
        </label>
        
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <input
            type="checkbox"
            checked={includeHyphens}
            onChange={(e) => setIncludeHyphens(e.target.checked)}
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

        <button
          type="button"
          onClick={downloadUuids}
          disabled={!allUuids}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          {t('common.download')}
        </button>
      </div>

      {error && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </p>
      )}

      {/* Generated UUIDs */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 p-4">
        {uuids.length > 0 ? (
          <textarea
            readOnly
            value={allUuids}
            aria-label="Generated UUIDs"
            rows={Math.min(16, Math.max(4, uuids.length))}
            className="w-full resize-y rounded border border-gray-200 bg-white p-3 font-mono text-sm text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
          />
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">{t('common.generate')}...</p>
        )}
      </div>

      {/* Info */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>{t(version === 'v7' ? 'tool.uuidGenerator.infoV7' : 'tool.uuidGenerator.info')}</p>
      </div>
    </div>
  );
}
