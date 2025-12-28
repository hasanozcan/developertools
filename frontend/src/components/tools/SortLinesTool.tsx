'use client';

import { useState, useCallback, useMemo } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import CopyButton from '@/components/common/CopyButton';
import { ArrowUpDown, ArrowDownAZ, ArrowUpAZ } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

type SortOrder = 'asc' | 'desc';

export default function SortLinesTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [order, setOrder] = useState<SortOrder>('asc');
  const [caseSensitive, setCaseSensitive] = useState(false);

  const result = useMemo(() => {
    if (!input.trim()) return '';
    
    const lines = input.split('\n');
    
    const sorted = [...lines].sort((a, b) => {
      let compareA = a;
      let compareB = b;
      
      if (!caseSensitive) {
        compareA = a.toLowerCase();
        compareB = b.toLowerCase();
      }
      
      const comparison = compareA.localeCompare(compareB);
      return order === 'asc' ? comparison : -comparison;
    });

    return sorted.join('\n');
  }, [input, order, caseSensitive]);

  const toggleOrder = useCallback(() => {
    setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  const loadSample = useCallback(() => {
    setInput(`zebra
apple
Banana
cherry
Apple
date
fig
eggplant
grape`);
  }, []);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={toggleOrder}
          className={`px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 ${
            order === 'asc'
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {order === 'asc' ? <ArrowUpAZ className="w-4 h-4" /> : <ArrowDownAZ className="w-4 h-4" />}
          {order === 'asc' ? 'A-Z (Ascending)' : 'Z-A (Descending)'}
        </button>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Case Sensitive</span>
        </label>

        <button
          onClick={loadSample}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          Load Sample
        </button>
      </div>

      {/* Input/Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Lines
          </label>
          <CodeEditor
            value={input}
            onChange={setInput}
            placeholder="Enter lines to sort (one per line)..."
            language="text"
            minHeight="250px"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sorted Lines ({order === 'asc' ? 'A-Z' : 'Z-A'})
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

      {/* Info */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>Sorting is performed line by line. Empty lines are preserved in the output.</p>
      </div>
    </div>
  );
}