'use client';

import { useState, useCallback, useMemo } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { useLanguage } from '@/context/LanguageContext';

interface DetectedPattern {
  type: string;
  pattern: string;
  matches: string[];
  description: string;
}

interface QuickPattern {
  name: string;
  pattern: string;
  description: string;
}

const quickPatterns: QuickPattern[] = [
  { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', description: 'Email addresses' },
  { name: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', description: 'HTTP/HTTPS URLs' },
  { name: 'Phone (US)', pattern: '(\\+?1[-.\\s]?)?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}', description: 'US phone numbers' },
  { name: 'IPv4', pattern: '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)', description: 'IPv4 addresses' },
  { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])', description: 'ISO date format' },
  { name: 'Date (MM/DD/YYYY)', pattern: '(0[1-9]|1[0-2])\\/(0[1-9]|[12]\\d|3[01])\\/\\d{4}', description: 'US date format' },
  { name: 'Date (DD.MM.YYYY)', pattern: '(0[1-9]|[12]\\d|3[01])\\.(0[1-9]|1[0-2])\\.\\d{4}', description: 'European date format' },
  { name: 'Integer', pattern: '-?\\d+', description: 'Whole numbers' },
  { name: 'Decimal', pattern: '-?\\d+\\.\\d+', description: 'Decimal numbers' },
  { name: 'Hex Color', pattern: '#[A-Fa-f0-9]{6}|#[A-Fa-f0-9]{3}', description: 'Hex color codes' },
  { name: 'Time (HH:MM)', pattern: '([01]\\d|2[0-3]):([0-5]\\d)', description: '24-hour time' },
  { name: 'Word (3+ chars)', pattern: '\\b\\w{3,}\\b', description: 'Words with 3+ characters' },
];

export default function RegexGeneratorTool() {
  const { t } = useLanguage();
  const [sampleText, setSampleText] = useState('');
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [customPattern, setCustomPattern] = useState('');
  const [testText, setTestText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const detectedPatterns = useMemo((): DetectedPattern[] => {
    if (!sampleText) return [];

    const patterns: DetectedPattern[] = [];

    // Email detection
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails = sampleText.match(emailRegex);
    if (emails && emails.length > 0) {
      patterns.push({
        type: 'Email',
        pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
        matches: [...new Set(emails)],
        description: 'Email addresses',
      });
    }

    // URL detection
    const urlRegex = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const urls = sampleText.match(urlRegex);
    if (urls && urls.length > 0) {
      patterns.push({
        type: 'URL',
        pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
        matches: [...new Set(urls)],
        description: 'Web URLs',
      });
    }

    // Phone number detection (various formats)
    const phoneRegex = /(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/g;
    const phones = sampleText.match(phoneRegex);
    if (phones && phones.length > 0) {
      patterns.push({
        type: 'Phone',
        pattern: '(\\+?1[-.\\s]?)?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}',
        matches: [...new Set(phones)],
        description: 'Phone numbers',
      });
    }

    // IPv4 detection
    const ipv4Regex = /(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g;
    const ipv4s = sampleText.match(ipv4Regex);
    if (ipv4s && ipv4s.length > 0) {
      patterns.push({
        type: 'IPv4',
        pattern: '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)',
        matches: [...new Set(ipv4s)],
        description: 'IPv4 addresses',
      });
    }

    // Date detection - YYYY-MM-DD
    const dateIsoRegex = /\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])/g;
    const dateIsos = sampleText.match(dateIsoRegex);
    if (dateIsos && dateIsos.length > 0) {
      patterns.push({
        type: 'Date (ISO)',
        pattern: '\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])',
        matches: [...new Set(dateIsos)],
        description: 'Dates (YYYY-MM-DD)',
      });
    }

    // Date detection - MM/DD/YYYY or DD/MM/YYYY
    const dateSlashRegex = /(?:0[1-9]|1[0-2])\/(?:0[1-9]|[12]\d|3[01])\/\d{4}/g;
    const dateSlashes = sampleText.match(dateSlashRegex);
    if (dateSlashes && dateSlashes.length > 0) {
      patterns.push({
        type: 'Date (MM/DD/YYYY)',
        pattern: '(0[1-9]|1[0-2])\\/(0[1-9]|[12]\\d|3[01])\\/\\d{4}',
        matches: [...new Set(dateSlashes)],
        description: 'Dates (MM/DD/YYYY)',
      });
    }

    // Date detection - DD.MM.YYYY or DD-MM-YYYY
    const dateDotRegex = /(?:0[1-9]|[12]\d|3[01])[.-](?:0[1-9]|1[0-2])[.-]\d{4}/g;
    const dateDots = sampleText.match(dateDotRegex);
    if (dateDots && dateDots.length > 0) {
      patterns.push({
        type: 'Date (DD.MM.YYYY)',
        pattern: '(0[1-9]|[12]\\d|3[01])[.-](0[1-9]|1[0-2])[.-]\\d{4}',
        matches: [...new Set(dateDots)],
        description: 'Dates (DD.MM.YYYY or DD-MM-YYYY)',
      });
    }

    // Integer detection
    const intRegex = /(?<![a-zA-Z0-9])-?\d+(?![a-zA-Z0-9.])/g;
    const ints = sampleText.match(intRegex);
    if (ints && ints.length > 0) {
      patterns.push({
        type: 'Integer',
        pattern: '-?\\d+',
        matches: [...new Set(ints)].slice(0, 10),
        description: 'Whole numbers',
      });
    }

    // Decimal detection
    const decimalRegex = /-?\d+\.\d+/g;
    const decimals = sampleText.match(decimalRegex);
    if (decimals && decimals.length > 0) {
      patterns.push({
        type: 'Decimal',
        pattern: '-?\\d+\\.\\d+',
        matches: [...new Set(decimals)].slice(0, 10),
        description: 'Decimal numbers',
      });
    }

    // Hex color detection
    const hexColorRegex = /#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\b/g;
    const hexColors = sampleText.match(hexColorRegex);
    if (hexColors && hexColors.length > 0) {
      patterns.push({
        type: 'Hex Color',
        pattern: '#[A-Fa-f0-9]{6}|#[A-Fa-f0-9]{3}',
        matches: [...new Set(hexColors)],
        description: 'Hex color codes',
      });
    }

    // Time detection (HH:MM or HH:MM:SS)
    const timeRegex = /(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?/g;
    const times = sampleText.match(timeRegex);
    if (times && times.length > 0) {
      patterns.push({
        type: 'Time',
        pattern: '([01]\\d|2[0-3]):([0-5]\\d)(?::([0-5]\\d))?',
        matches: [...new Set(times)],
        description: 'Time (HH:MM or HH:MM:SS)',
      });
    }

    return patterns;
  }, [sampleText]);

  const currentPattern = useMemo(() => {
    if (customPattern) return customPattern;
    if (selectedPattern) {
      const quick = quickPatterns.find(p => p.name === selectedPattern);
      return quick?.pattern || '';
    }
    if (detectedPatterns.length > 0) {
      return detectedPatterns[0].pattern;
    }
    return '';
  }, [selectedPattern, customPattern, detectedPatterns]);

  const testMatches = useMemo((): { text: string; isMatch: boolean }[] => {
    if (!testText || !currentPattern) return [];

    try {
      const regex = new RegExp(currentPattern, 'gi');
      const parts: { text: string; isMatch: boolean }[] = [];
      let lastIndex = 0;

      testText.replace(regex, (match, ...args) => {
        const index = args[args.length - 2] as number;

        if (index > lastIndex) {
          parts.push({ text: testText.slice(lastIndex, index), isMatch: false });
        }
        parts.push({ text: match, isMatch: true });
        lastIndex = index + match.length;

        return match;
      });

      if (lastIndex < testText.length) {
        parts.push({ text: testText.slice(lastIndex), isMatch: false });
      }

      return parts;
    } catch {
      return [];
    }
  }, [testText, currentPattern]);

  const selectQuickPattern = useCallback((pattern: QuickPattern) => {
    setSelectedPattern(pattern.name);
    setCustomPattern('');
    setError(null);
  }, []);

  const selectDetectedPattern = useCallback((pattern: DetectedPattern) => {
    setCustomPattern(pattern.pattern);
    setSelectedPattern(null);
    setError(null);
  }, []);

  const loadSample = useCallback(() => {
    setSampleText(`Contact us at support@example.com or sales@company.org for assistance.

Visit our website at https://www.example.com or http://test-site.org/page?q=1

Call us at (555) 123-4567 or 555.987.6543

Our servers are located at 192.168.1.1 and 10.0.0.255

Important dates: 2024-03-15, 03/25/2024, and 15.06.2024

Order total: $199.99 with discount of -15.5%

User settings: #FF5733 or #F00, current time: 14:30:00

For more info call +1-555-123-4567`);
    setError(null);
  }, []);

  const clearAll = useCallback(() => {
    setSampleText('');
    setTestText('');
    setSelectedPattern(null);
    setCustomPattern('');
    setError(null);
  }, []);

  return (
    <div className="space-y-6">
      {/* Quick Pattern Buttons */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Quick Patterns
        </label>
        <div className="flex flex-wrap gap-2">
          {quickPatterns.map((qp) => (
            <button
              key={qp.name}
              onClick={() => selectQuickPattern(qp)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedPattern === qp.name
                  ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 border border-primary-300 dark:border-primary-700'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-400'
              }`}
            >
              {qp.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sample Text Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Sample Text
          </label>
          <div className="flex gap-2">
            <button
              onClick={loadSample}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Load Sample
            </button>
            <button
              onClick={clearAll}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
        <textarea
          value={sampleText}
          onChange={(e) => setSampleText(e.target.value)}
          placeholder="Paste sample text here to auto-detect patterns like emails, URLs, phone numbers, etc..."
          className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm resize-none"
        />
      </div>

      {/* Detected Patterns */}
      {detectedPatterns.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Detected Patterns ({detectedPatterns.length})
          </label>
          <div className="space-y-2">
            {detectedPatterns.map((dp, index) => (
              <div
                key={dp.type}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  customPattern === dp.pattern
                    ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-500 dark:border-primary-500'
                    : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-400'
                }`}
                onClick={() => selectDetectedPattern(dp)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">{dp.type}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{dp.matches.length} matches</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{dp.description}</div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {dp.matches.slice(0, 5).map((m, i) => (
                    <span
                      key={i}
                      className="inline-block bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded text-xs font-mono"
                    >
                      {m}
                    </span>
                  ))}
                  {dp.matches.length > 5 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">+{dp.matches.length - 5} more</span>
                  )}
                </div>
                <code className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded font-mono">
                  {dp.pattern}
                </code>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generated Regex */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Generated Regex
          </label>
          <CopyButton text={currentPattern} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 dark:text-gray-500 font-mono">/</span>
          <input
            type="text"
            value={currentPattern}
            onChange={(e) => {
              setCustomPattern(e.target.value);
              setSelectedPattern(null);
            }}
            placeholder="Generated regex pattern will appear here..."
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <span className="text-gray-400 dark:text-gray-500 font-mono">/g</span>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
          Invalid regex: {error}
        </div>
      )}

      {/* Test Area */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Test Your Regex
        </label>
        <textarea
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          placeholder="Enter text to test against the regex pattern..."
          className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm resize-none"
        />
      </div>

      {/* Highlighted Result */}
      {testText && currentPattern && !error && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Matches Highlighted
          </label>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 font-mono text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-200">
            {testMatches.map((part, i) => (
              <span
                key={i}
                className={part.isMatch ? 'bg-yellow-300 dark:bg-yellow-600 text-yellow-900 dark:text-yellow-100 px-0.5 rounded' : ''}
              >
                {part.text}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!sampleText && !selectedPattern && !customPattern && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>Enter sample text above or select a quick pattern to generate a regex.</p>
          <p className="text-sm mt-2">The tool will detect common patterns like emails, URLs, phone numbers, dates, and more.</p>
        </div>
      )}
    </div>
  );
}
