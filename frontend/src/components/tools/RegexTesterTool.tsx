'use client';

import { useState, useCallback, useMemo } from 'react';
import CodeEditor from '@/components/common/CodeEditor';

interface RegexMatch {
  match: string;
  index: number;
  groups: string[];
}

export default function RegexTesterTool() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="space-y-6">
      {/* Pattern Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Regular Expression</label>
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
          { flag: 'g', label: 'Global', desc: 'Find all matches' },
          { flag: 'i', label: 'Case Insensitive', desc: 'Ignore case' },
          { flag: 'm', label: 'Multiline', desc: '^ and $ match newlines' },
          { flag: 's', label: 'Dotall', desc: '. matches newlines' },
        ].map(({ flag, label }) => (
          <button
            key={flag}
            onClick={() => toggleFlag(flag)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              flags.includes(flag)
                ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 border border-primary-300 dark:border-primary-700'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {flag} - {label}
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
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Test String</label>
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
            Match Highlighting ({matches.length} match{matches.length !== 1 ? 'es' : ''})
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Match Details</label>
          <div className="space-y-2 max-h-64 overflow-auto">
            {matches.map((match, i) => (
              <div key={i} className="p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Match {i + 1}</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">Index: {match.index}</span>
                </div>
                <code className="text-sm font-mono text-primary-700 dark:text-primary-400">{match.match}</code>
                {match.groups.length > 0 && (
                  <div className="mt-2 text-xs">
                    <span className="text-gray-500 dark:text-gray-400">Groups: </span>
                    {match.groups.map((g, gi) => (
                      <span key={gi} className="inline-block bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded mr-1">
                        ${gi + 1}: {g || '(empty)'}
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
          Regex Quick Reference
        </summary>
        <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono text-gray-700 dark:text-gray-300">
          <div><code>.</code> Any character</div>
          <div><code>\d</code> Digit</div>
          <div><code>\w</code> Word char</div>
          <div><code>\s</code> Whitespace</div>
          <div><code>^</code> Start</div>
          <div><code>$</code> End</div>
          <div><code>*</code> 0 or more</div>
          <div><code>+</code> 1 or more</div>
          <div><code>?</code> 0 or 1</div>
          <div><code>{'{n}'}</code> Exactly n</div>
          <div><code>[abc]</code> Char class</div>
          <div><code>()</code> Group</div>
        </div>
      </details>
    </div>
  );
}
