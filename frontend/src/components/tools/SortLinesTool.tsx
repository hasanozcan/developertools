'use client';

import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

type SortOrder = 'asc' | 'desc';

export default function SortLinesTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [order, setOrder] = useState<SortOrder>('asc');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const deferredInput = useDeferredValue(input);
  const isUpdating = input !== deferredInput;

  const result = useMemo(() => {
    if (!deferredInput.trim()) return '';
    
    const lines = deferredInput.split('\n');
    
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
  }, [caseSensitive, deferredInput, order]);

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
          type="button"
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
          type="button"
          onClick={loadSample}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          Load Sample
        </button>
      </div>

      {/* Input/Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="sort-lines-input"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Input Lines
          </label>
          <CodeEditor
            id="sort-lines-input"
            value={input}
            onChange={setInput}
            placeholder="Enter lines to sort (one per line)..."
            language="text"
            minHeight="250px"
            maxLength={250_000}
          />
        </div>
        <div>
          <div className="mb-2 flex min-h-5 items-center justify-between gap-3">
            <label
              htmlFor="sort-lines-output"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Sorted Lines ({order === 'asc' ? 'A-Z' : 'Z-A'})
            </label>
            {isUpdating ? (
              <span role="status" className="text-xs text-gray-500 dark:text-gray-400">
                {t('common.updating')}
              </span>
            ) : null}
          </div>
          <div aria-busy={isUpdating} className={isUpdating ? 'opacity-70' : 'opacity-100'}>
            <CodeEditor
              id="sort-lines-output"
              value={result}
              onChange={() => {}}
              readOnly
              language="text"
              minHeight="250px"
            />
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
