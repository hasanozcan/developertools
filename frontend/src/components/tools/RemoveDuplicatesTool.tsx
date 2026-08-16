'use client';

import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import { useLanguage } from '@/context/LanguageContext';

export default function RemoveDuplicatesTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const deferredInput = useDeferredValue(input);
  const isUpdating = input !== deferredInput;

  const result = useMemo(() => {
    if (!deferredInput) return '';
    
    const lines = deferredInput.split('\n');
    const seen = new Set<string>();
    const unique: string[] = [];

    for (const line of lines) {
      const processedLine = trimWhitespace ? line.trim() : line;
      const key = caseSensitive ? processedLine : processedLine.toLowerCase();
      
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(line);
      }
    }

    return unique.join('\n');
  }, [caseSensitive, deferredInput, trimWhitespace]);

  const stats = useMemo(() => {
    const originalLines = deferredInput ? deferredInput.split('\n') : [];
    const resultLines = result ? result.split('\n') : [];
    return {
      original: originalLines.length,
      unique: resultLines.length,
      duplicates: originalLines.length - resultLines.length,
    };
  }, [deferredInput, result]);

  const loadSample = useCallback(() => {
    setInput(`apple
Banana
apple
cherry
BANANA
date
Apple
eggplant
  date  
fig`);
  }, []);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Case Sensitive</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={trimWhitespace}
            onChange={(e) => setTrimWhitespace(e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Trim Whitespace</span>
        </label>

        <button
          type="button"
          onClick={loadSample}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          Load Sample
        </button>
      </div>

      {/* Stats */}
      {deferredInput ? (
        <div
          aria-busy={isUpdating}
          className={`flex flex-wrap gap-4 text-sm ${isUpdating ? 'opacity-70' : 'opacity-100'}`}
        >
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
            Original: {stats.original} lines
          </span>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-full">
            Unique: {stats.unique} lines
          </span>
          {stats.duplicates > 0 ? (
            <span className="px-3 py-1 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 rounded-full">
              Removed: {stats.duplicates} duplicates
            </span>
          ) : null}
        </div>
      ) : null}

      {/* Input/Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="remove-duplicates-input"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Input Text
          </label>
          <CodeEditor
            id="remove-duplicates-input"
            value={input}
            onChange={setInput}
            placeholder="Enter text with duplicate lines..."
            language="text"
            minHeight="250px"
            maxLength={250_000}
          />
        </div>
        <div>
          <div className="mb-2 flex min-h-5 items-center justify-between gap-3">
            <label
              htmlFor="remove-duplicates-output"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Result (Unique Lines)
            </label>
            {isUpdating ? (
              <span role="status" className="text-xs text-gray-500 dark:text-gray-400">
                {t('common.updating')}
              </span>
            ) : null}
          </div>
          <div aria-busy={isUpdating} className={isUpdating ? 'opacity-70' : 'opacity-100'}>
            <CodeEditor
              id="remove-duplicates-output"
              value={result}
              onChange={() => {}}
              readOnly
              language="text"
              minHeight="250px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
