'use client';

import { useCallback, useMemo, useState } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import CopyButton from '@/components/common/CopyButton';
import { useLanguage } from '@/context/LanguageContext';
import { parseUserAgent } from '@/lib/userAgentParser';
import type { ParsedUserAgent } from '@/lib/userAgentParser';

const sampleAgents = [
  {
    label: 'Edge on Windows',
    value:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0',
  },
  {
    label: 'Safari on iPhone',
    value:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  },
  {
    label: 'Googlebot',
    value: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  },
];

function displayName(name: string, version: string): string {
  return version === 'Unknown' ? name : `${name} ${version}`;
}

export default function UserAgentParserTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [batchMode, setBatchMode] = useState(false);

  const parsedResults = useMemo(() => {
    const values = batchMode ? input.split(/\r?\n/).filter((line) => line.trim()) : [input];
    return values.map(parseUserAgent).filter((value): value is ParsedUserAgent => Boolean(value));
  }, [batchMode, input]);
  const parsed = batchMode ? null : parsedResults[0] || null;
  const output = useMemo(() => {
    if (parsedResults.length === 0) return '';
    return JSON.stringify(batchMode ? parsedResults : parsed, null, 2);
  }, [batchMode, parsed, parsedResults]);

  const clearAll = useCallback(() => setInput(''), []);
  const useMyUserAgent = useCallback(() => setInput(window.navigator.userAgent), []);

  const summary = parsed
    ? [
        { label: 'Browser', value: displayName(parsed.browser.name, parsed.browser.version) },
        { label: 'Operating system', value: displayName(parsed.os.name, parsed.os.version) },
        { label: 'Engine', value: displayName(parsed.engine.name, parsed.engine.version) },
        {
          label: 'Device',
          value:
            [parsed.device.vendor, parsed.device.model, parsed.device.type]
              .filter((value) => value !== 'Unknown')
              .join(' · ') || 'Unknown',
        },
        { label: 'CPU', value: parsed.cpu.architecture },
        {
          label: 'Bot or crawler',
          value: parsed.bot.isBot ? parsed.bot.name || 'Detected' : 'No known bot token detected',
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={useMyUserAgent}
          className="rounded-lg bg-primary-600 px-3 py-2 text-sm font-medium text-white hover:bg-primary-700"
        >
          Use my User-Agent
        </button>
        {sampleAgents.map((sample) => (
          <button
            type="button"
            key={sample.label}
            onClick={() => setInput(sample.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {sample.label}
          </button>
        ))}
        <button
          type="button"
          onClick={clearAll}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          {t('common.clear')}
        </button>
        <label className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700 dark:bg-gray-700/50 dark:text-gray-300">
          <input
            type="checkbox"
            checked={batchMode}
            onChange={(event) => setBatchMode(event.target.checked)}
            className="rounded border-gray-300 text-primary-600 dark:border-gray-600"
          />
          Parse one User-Agent per line
        </label>
      </div>

      {parsed && (
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {summary.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-900/50"
            >
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {item.label}
              </dt>
              <dd className="mt-1 break-words text-sm text-gray-900 dark:text-white">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            User-Agent input
          </label>
          <CodeEditor
            value={input}
            onChange={setInput}
            language="text"
            placeholder={
              batchMode ? 'Paste one User-Agent string per line...' : 'Paste a User-Agent string...'
            }
            minHeight="260px"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Parsed JSON
            </label>
            <CopyButton text={output} />
          </div>
          <CodeEditor
            value={output}
            onChange={() => {}}
            readOnly
            showCopy={false}
            language="json"
            placeholder="Parsed browser, OS, engine, device, CPU, and bot fields appear here..."
            minHeight="260px"
          />
        </div>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Parsing is heuristic because User-Agent strings are self-reported and often reduced or
        intentionally compatible with other browsers. Use feature detection or Client Hints when you
        control the application.
      </p>
    </div>
  );
}
