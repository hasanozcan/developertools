'use client';

import { useState, useCallback, useMemo } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import CopyButton from '@/components/common/CopyButton';
import { useLanguage } from '@/context/LanguageContext';

export default function RemoveDuplicatesTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [trimWhitespace, setTrimWhitespace] = useState(true);

  const result = useMemo(() => {
    if (!input.trim()) return '';
    
    const lines = input.split('\n');
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
  }, [input, caseSensitive, trimWhitespace]);

  const stats = useMemo(() => {
    const originalLines = input.split('\n').filter(l => l.trim());
    const resultLines = result.split('\n').filter(l => l.trim());
    return {
      original: originalLines.length,
      unique: resultLines.length,
      duplicates: originalLines.length - resultLines.length,
    };
  }, [input, result]);

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
          onClick={loadSample}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          Load Sample
        </button>
      </div>

      {/* Stats */}
      {input && (
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
            Original: {stats.original} lines
          </span>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-full">
            Unique: {stats.unique} lines
          </span>
          {stats.duplicates > 0 && (
            <span className="px-3 py-1 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 rounded-full">
              Removed: {stats.duplicates} duplicates
            </span>
          )}
        </div>
      )}

      {/* Input/Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Text
          </label>
          <CodeEditor
            value={input}
            onChange={setInput}
            placeholder="Enter text with duplicate lines..."
            language="text"
            minHeight="250px"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Result (Unique Lines)
          </label>
          <div className="relative">
            <CodeEditor
              value={result}
              onChange={() => {}}
              readOnly
              language="text"
              minHeight="250px"
            />
            {result && (
              <div className="absolute top-2 right-2">
                <CopyButton text={result} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}