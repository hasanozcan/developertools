'use client';

import { useMemo, useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import {
  formatCacheControl,
  parseCacheControl,
  validateCacheControl,
  type CacheControlDirective,
} from '@/lib/cacheControl';

const presets: Record<string, string> = {
  'Static asset': 'public, max-age=31536000, immutable',
  'HTML revalidate': 'public, max-age=0, must-revalidate',
  'Shared cache': 'public, max-age=60, s-maxage=600, stale-while-revalidate=30',
  'Sensitive data': 'no-store',
};

export default function CacheControlTool() {
  const [input, setInput] = useState(presets['Shared cache']);
  const parsed = useMemo(() => {
    try {
      const directives = parseCacheControl(input);
      return {
        directives,
        normalized: formatCacheControl(directives),
        warnings: validateCacheControl(directives),
        error: '',
      };
    } catch (error) {
      return {
        directives: [] as CacheControlDirective[],
        normalized: '',
        warnings: [],
        error: error instanceof Error ? error.message : 'Invalid Cache-Control value.',
      };
    }
  }, [input]);

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="cache-control"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Cache-Control header value
        </label>
        <textarea
          id="cache-control"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          spellCheck={false}
          rows={4}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {Object.entries(presets).map(([label, value]) => (
          <button
            key={label}
            onClick={() => setInput(value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {label}
          </button>
        ))}
      </div>
      {parsed.error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300"
        >
          {parsed.error}
        </div>
      )}
      {parsed.warnings.map((warning) => (
        <div
          key={warning}
          className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-200"
        >
          {warning}
        </div>
      ))}

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/70">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Normalized header
          </span>
          <CopyButton text={parsed.normalized} />
        </div>
        <code className="block break-words text-sm text-gray-900 dark:text-white">
          {parsed.normalized || 'Enter a valid header value.'}
        </code>
      </div>

      {parsed.directives.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              <tr>
                <th className="px-4 py-3">Directive</th>
                <th className="px-4 py-3">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {parsed.directives.map((directive, index) => (
                <tr key={`${directive.name}-${index}`}>
                  <td className="px-4 py-3 font-mono text-gray-900 dark:text-white">
                    {directive.name}
                  </td>
                  <td className="px-4 py-3 font-mono text-gray-600 dark:text-gray-300">
                    {directive.value ?? 'flag'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-sm text-gray-500 dark:text-gray-400">
        This tool checks header syntax and common conflicts. It cannot predict browser, CDN,
        reverse-proxy, or framework cache behavior.
      </p>
    </div>
  );
}
