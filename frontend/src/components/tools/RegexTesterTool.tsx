'use client';

import { useState, useCallback, useMemo } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import { useLanguage } from '@/context/LanguageContext';

interface RegexMatch {
  match: string;
  index: number;
  groups: string[];
}

interface CommonPattern {
  name: string;
  pattern: string;
  flags: string;
  description: string;
}

const commonPatterns: CommonPattern[] = [
  {
    name: 'Email',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    flags: '',
    description: 'Matches most common email formats'
  },
  {
    name: 'URL',
    pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
    flags: 'i',
    description: 'Matches HTTP/HTTPS URLs'
  },
  {
    name: 'Date (YYYY-MM-DD)',
    pattern: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$',
    flags: '',
    description: 'ISO 8601 date format'
  },
  {
    name: 'IPv4',
    pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
    flags: '',
    description: 'Valid IPv4 addresses (0.0.0.0 - 255.255.255.255)'
  },
  {
    name: 'Phone (US)',
    pattern: '^(\\+?1[-.\\s]?)?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$',
    flags: '',
    description: 'US phone number formats: (555) 123-4567, 555-123-4567, 555.123.4567'
  },
  {
    name: 'Credit Card',
    pattern: '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12})$',
    flags: '',
    description: 'Visa, MasterCard, American Express, Discover, Diners Club'
  },
  {
    name: 'Hex Color',
    pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
    flags: '',
    description: 'Hex color codes: #FFF or #FFFFFF'
  },
  {
    name: 'Time (HH:MM)',
    pattern: '^([01]\\d|2[0-3]):([0-5]\\d)$',
    flags: '',
    description: '24-hour time format'
  },
  {
    name: 'Username',
    pattern: '^[a-zA-Z0-9_]{3,16}$',
    flags: '',
    description: 'Alphanumeric with underscores, 3-16 characters'
  },
  {
    name: 'Strong Password',
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
    flags: '',
    description: 'Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char'
  },
  {
    name: 'Postal Code (US)',
    pattern: '^\\d{5}(-\\d{4})?$',
    flags: '',
    description: 'US ZIP codes: 12345 or 12345-6789'
  },
  {
    name: 'MAC Address',
    pattern: '^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$',
    flags: '',
    description: 'MAC addresses: 00:1A:2B:3C:4D:5E'
  }
];

export default function RegexTesterTool() {
  const { t } = useLanguage();
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<CommonPattern | null>(null);
  const [showPatterns, setShowPatterns] = useState(false);

  const matches = useMemo((): RegexMatch[] => {
    if (!pattern || !testString) {
      setError(null);
      return [];
    }

    try {
      const regex = new RegExp(pattern, flags);
      const results: RegexMatch[] = [];
      
      if (flags.includes('g')) {
        let match;
        while ((match = regex.exec(testString)) !== null) {
          results.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          // Prevent infinite loops with zero-width matches
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          results.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }
      
      setError(null);
      return results;
    } catch (e) {
      setError((e as Error).message);
      return [];
    }
  }, [pattern, testString, flags]);

  const highlightedText = useMemo(() => {
    if (!pattern || !testString || error) return testString;

    try {
      const regex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
      const parts: { text: string; isMatch: boolean }[] = [];
      let lastIndex = 0;

      testString.replace(regex, (match, ...args) => {
        const index = args[args.length - 2] as number;
        
        if (index > lastIndex) {
          parts.push({ text: testString.slice(lastIndex, index), isMatch: false });
        }
        parts.push({ text: match, isMatch: true });
        lastIndex = index + match.length;
        
        return match;
      });

      if (lastIndex < testString.length) {
        parts.push({ text: testString.slice(lastIndex), isMatch: false });
      }

      return parts;
    } catch {
      return testString;
    }
  }, [pattern, testString, flags, error]);

  const toggleFlag = useCallback((flag: string) => {
    setFlags((prev) => 
      prev.includes(flag) 
        ? prev.replace(flag, '') 
        : prev + flag
    );
  }, []);

  const selectPattern = useCallback((patternInfo: CommonPattern) => {
    setPattern(patternInfo.pattern);
    setFlags(patternInfo.flags);
    setSelectedPattern(patternInfo);
    setError(null);
  }, []);

  const loadSample = useCallback(() => {
    setPattern('\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b');
    setTestString('Contact us at support@example.com or sales@company.org for more information. Invalid emails: test@, @domain.com, user@.com');
    setFlags('gi');
    setError(null);
  }, []);

  return (
    <div className="space-y-6">
      {/* Common Patterns Library */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('tool.regexTester.commonPatterns')}
          </label>
          <button
            onClick={() => setShowPatterns(!showPatterns)}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {showPatterns ? t('common.hide') : t('common.show')} {t('tool.regexTester.patterns')}
          </button>
        </div>
        
        {showPatterns && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
            {commonPatterns.map((patternInfo) => (
              <button
                key={patternInfo.name}
                onClick={() => selectPattern(patternInfo)}
                className={`text-left p-3 rounded-lg border transition-all ${
                  selectedPattern?.name === patternInfo.name
                    ? 'bg-primary-100 dark:bg-primary-900/50 border-primary-500 dark:border-primary-500'
                    : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-400'
                }`}
              >
                <div className="font-medium text-gray-900 dark:text-white text-sm">
                  {patternInfo.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono truncate">
                  {patternInfo.pattern}
                </div>
              </button>
            ))}
          </div>
        )}

        {selectedPattern && !showPatterns && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-blue-900 dark:text-blue-300">
                {t('tool.regexTester.selected')}: {selectedPattern.name}
              </span>
              <button
                onClick={() => setSelectedPattern(null)}
                className="text-xs text-blue-700 dark:text-blue-400 hover:underline"
              >
                {t('common.clear')}
              </button>
            </div>
            <div className="text-sm text-blue-800 dark:text-blue-300 mb-2">
              {selectedPattern.description}
            </div>
            <code className="text-xs bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded font-mono text-blue-900 dark:text-blue-200">
              {selectedPattern.pattern}
            </code>
          </div>
        )}
      </div>

      {/* Pattern Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('tool.regexTester.pattern')}</label>
          <button
            onClick={loadSample}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {t('common.loadSample')}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 dark:text-gray-500 font-mono">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Enter regex pattern..."
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <span className="text-gray-400 dark:text-gray-500 font-mono">/</span>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            className="w-16 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="flags"
          />
        </div>
      </div>

      {/* Flags Toggle */}
      <div className="flex flex-wrap gap-2">
        {[
          { flag: 'g', labelKey: 'tool.regexTester.global' },
          { flag: 'i', labelKey: 'tool.regexTester.caseInsensitive' },
          { flag: 'm', labelKey: 'tool.regexTester.multiline' },
          { flag: 's', labelKey: 'tool.regexTester.dotall' },
        ].map(({ flag, labelKey }) => (
          <button
            key={flag}
            onClick={() => toggleFlag(flag)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              flags.includes(flag)
                ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 border border-primary-300 dark:border-primary-700'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {flag} - {t(labelKey)}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
          Invalid regex: {error}
        </div>
      )}

      {/* Test String */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('tool.regexTester.testString')}</label>
        <CodeEditor
          value={testString}
          onChange={setTestString}
          placeholder="Enter text to test against the regex..."
          language="text"
          minHeight="150px"
        />
      </div>

      {/* Highlighted Result */}
      {testString && pattern && !error && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('tool.regexTester.matchHighlighting')} ({matches.length} {t('tool.regexTester.matches')})
          </label>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 font-mono text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-200">
            {Array.isArray(highlightedText) ? (
              highlightedText.map((part, i) => (
                <span
                  key={i}
                  className={part.isMatch ? 'bg-yellow-300 dark:bg-yellow-600 text-yellow-900 dark:text-yellow-100 px-0.5 rounded' : ''}
                >
                  {part.text}
                </span>
              ))
            ) : (
              testString
            )}
          </div>
        </div>
      )}

      {/* Matches List */}
      {matches.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('tool.regexTester.matchDetails')}</label>
          <div className="space-y-2 max-h-64 overflow-auto">
            {matches.map((match, i) => (
              <div key={i} className="p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{t('tool.regexTester.match')} {i + 1}</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{t('tool.regexTester.index')}: {match.index}</span>
                </div>
                <code className="text-sm font-mono text-primary-700 dark:text-primary-400">{match.match}</code>
                {match.groups.length > 0 && (
                  <div className="mt-2 text-xs">
                    <span className="text-gray-500 dark:text-gray-400">{t('tool.regexTester.groups')}: </span>
                    {match.groups.map((g, gi) => (
                      <span key={gi} className="inline-block bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded mr-1">
                        ${gi + 1}: {g || t('tool.regexTester.empty')}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Reference */}
      <details className="text-sm">
        <summary className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-medium">
          {t('tool.regexTester.quickReference')}
        </summary>
        <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono text-gray-700 dark:text-gray-300">
          <div><code>.</code> {t('tool.regexTester.anyChar')}</div>
          <div><code>\d</code> {t('tool.regexTester.digit')}</div>
          <div><code>\w</code> {t('tool.regexTester.wordChar')}</div>
          <div><code>\s</code> {t('tool.regexTester.whitespace')}</div>
          <div><code>^</code> {t('tool.regexTester.start')}</div>
          <div><code>$</code> {t('tool.regexTester.end')}</div>
          <div><code>*</code> {t('tool.regexTester.zeroOrMore')}</div>
          <div><code>+</code> {t('tool.regexTester.oneOrMore')}</div>
          <div><code>?</code> {t('tool.regexTester.zeroOrOne')}</div>
          <div><code>{'{n}'}</code> {t('tool.regexTester.exactlyN')}</div>
          <div><code>[abc]</code> {t('tool.regexTester.charClass')}</div>
          <div><code>()</code> {t('tool.regexTester.group')}</div>
        </div>
      </details>
    </div>
  );
}
