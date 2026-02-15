'use client';

import { useCallback, useMemo, useState } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import { useLanguage } from '@/context/LanguageContext';

type ParsedUserAgent = {
  browser: string;
  browserVersion: string;
  os: string;
  deviceType: string;
  engine: string;
  isBot: boolean;
};

function parseBrowser(ua: string): { name: string; version: string } {
  const rules = [
    { name: 'Microsoft Edge', regex: /Edg\/([\d.]+)/ },
    { name: 'Opera', regex: /OPR\/([\d.]+)/ },
    { name: 'Google Chrome', regex: /Chrome\/([\d.]+)/ },
    { name: 'Mozilla Firefox', regex: /Firefox\/([\d.]+)/ },
    { name: 'Safari', regex: /Version\/([\d.]+).*Safari/ },
    { name: 'Internet Explorer', regex: /(?:MSIE\s([\d.]+)|Trident\/.*rv:([\d.]+))/ },
  ];

  for (const rule of rules) {
    const match = ua.match(rule.regex);
    if (match) {
      return { name: rule.name, version: match[1] || match[2] || 'Unknown' };
    }
  }

  return { name: 'Unknown', version: 'Unknown' };
}

function parseOs(ua: string): string {
  const windowsRules = [
    { token: 'Windows NT 10.0', value: 'Windows 10/11' },
    { token: 'Windows NT 6.3', value: 'Windows 8.1' },
    { token: 'Windows NT 6.2', value: 'Windows 8' },
    { token: 'Windows NT 6.1', value: 'Windows 7' },
  ];
  const windowsMatch = windowsRules.find((rule) => ua.includes(rule.token));
  if (windowsMatch) {
    return windowsMatch.value;
  }

  const androidMatch = ua.match(/Android\s([\d.]+)/);
  if (androidMatch) {
    return `Android ${androidMatch[1]}`;
  }

  const iosMatch = ua.match(/(iPhone|iPad|iPod).*OS\s([\d_]+)/);
  if (iosMatch) {
    return `iOS ${iosMatch[2].replace(/_/g, '.')}`;
  }

  const macMatch = ua.match(/Mac OS X\s([\d_]+)/);
  if (macMatch) {
    return `macOS ${macMatch[1].replace(/_/g, '.')}`;
  }

  if (ua.includes('Linux')) {
    return 'Linux';
  }

  return 'Unknown';
}

function parseDeviceType(ua: string): string {
  if (/iPad|Tablet/i.test(ua)) {
    return 'Tablet';
  }
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) {
    return 'Mobile';
  }
  return 'Desktop';
}

function parseEngine(ua: string, browserName: string): string {
  if (/Chrome|Edg|OPR/i.test(ua)) {
    return 'Blink';
  }
  if (/Firefox/i.test(ua)) {
    return 'Gecko';
  }
  if (/Safari/i.test(ua) && !/Chrome|Edg|OPR/i.test(ua)) {
    return 'WebKit';
  }
  if (/Trident|MSIE/i.test(ua) || browserName === 'Internet Explorer') {
    return 'Trident';
  }
  return 'Unknown';
}

function parseUserAgent(ua: string): ParsedUserAgent | null {
  const trimmed = ua.trim();
  if (!trimmed) {
    return null;
  }

  const browser = parseBrowser(trimmed);
  const isBot = /bot|crawler|spider|slurp|bingpreview/i.test(trimmed);

  return {
    browser: browser.name,
    browserVersion: browser.version,
    os: parseOs(trimmed),
    deviceType: parseDeviceType(trimmed),
    engine: parseEngine(trimmed, browser.name),
    isBot,
  };
}

const sampleAgents = [
  {
    label: 'Chrome on Windows',
    value:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
  },
  {
    label: 'Safari on iPhone',
    value:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  },
  {
    label: 'Googlebot',
    value:
      'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  },
];

export default function UserAgentParserTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');

  const parsed = useMemo(() => parseUserAgent(input), [input]);
  const output = useMemo(() => (parsed ? JSON.stringify(parsed, null, 2) : ''), [parsed]);

  const clearAll = useCallback(() => {
    setInput('');
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        {sampleAgents.map((sample) => (
          <button
            key={sample.label}
            onClick={() => setInput(sample.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
          >
            {sample.label}
          </button>
        ))}
        <button
          onClick={clearAll}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
        >
          {t('common.clear')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            User-Agent Input
          </label>
          <CodeEditor
            value={input}
            onChange={setInput}
            language="text"
            placeholder="Paste User-Agent string..."
            minHeight="220px"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Parsed Output
          </label>
          <CodeEditor
            value={output}
            onChange={() => {}}
            readOnly
            language="json"
            placeholder="Parsed result will appear here..."
            minHeight="220px"
          />
        </div>
      </div>
    </div>
  );
}
