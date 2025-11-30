'use client';

import { useState, useCallback, useMemo } from 'react';
import { Copy, Check, ArrowLeftRight } from 'lucide-react';

interface DiffLine {
  type: 'same' | 'added' | 'removed' | 'modified';
  lineNumber1?: number;
  lineNumber2?: number;
  content1?: string;
  content2?: string;
}

function computeDiff(text1: string, text2: string): DiffLine[] {
  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');
  const result: DiffLine[] = [];
  
  // Simple LCS-based diff algorithm
  const m = lines1.length;
  const n = lines2.length;
  
  // Build LCS table
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (lines1[i - 1] === lines2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  // Backtrack to find diff
  let i = m;
  let j = n;
  const tempResult: DiffLine[] = [];
  
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && lines1[i - 1] === lines2[j - 1]) {
      tempResult.unshift({
        type: 'same',
        lineNumber1: i,
        lineNumber2: j,
        content1: lines1[i - 1],
        content2: lines2[j - 1],
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      tempResult.unshift({
        type: 'added',
        lineNumber2: j,
        content2: lines2[j - 1],
      });
      j--;
    } else if (i > 0) {
      tempResult.unshift({
        type: 'removed',
        lineNumber1: i,
        content1: lines1[i - 1],
      });
      i--;
    }
  }
  
  return tempResult;
}

interface DiffStats {
  additions: number;
  deletions: number;
  unchanged: number;
}

function calculateStats(diff: DiffLine[]): DiffStats {
  return diff.reduce(
    (acc, line) => {
      if (line.type === 'added') acc.additions++;
      else if (line.type === 'removed') acc.deletions++;
      else if (line.type === 'same') acc.unchanged++;
      return acc;
    },
    { additions: 0, deletions: 0, unchanged: 0 }
  );
}

export default function TextDiffTool() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [copied, setCopied] = useState(false);

  const processedText1 = useMemo(() => {
    if (ignoreWhitespace) {
      return text1.split('\n').map((line) => line.trim()).join('\n');
    }
    return text1;
  }, [text1, ignoreWhitespace]);

  const processedText2 = useMemo(() => {
    if (ignoreWhitespace) {
      return text2.split('\n').map((line) => line.trim()).join('\n');
    }
    return text2;
  }, [text2, ignoreWhitespace]);

  const diff = useMemo(() => {
    if (!processedText1 && !processedText2) return [];
    return computeDiff(processedText1, processedText2);
  }, [processedText1, processedText2]);

  const stats = useMemo(() => calculateStats(diff), [diff]);

  const swapTexts = useCallback(() => {
    const temp = text1;
    setText1(text2);
    setText2(temp);
  }, [text1, text2]);

  const copyDiff = useCallback(() => {
    const diffText = diff
      .map((line) => {
        if (line.type === 'same') return `  ${line.content1}`;
        if (line.type === 'added') return `+ ${line.content2}`;
        if (line.type === 'removed') return `- ${line.content1}`;
        return '';
      })
      .join('\n');
    
    navigator.clipboard.writeText(diffText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [diff]);

  const loadSample = useCallback(() => {
    setText1(`function greet(name) {
  console.log("Hello, " + name);
  return true;
}

const message = "Welcome";
greet(message);`);
    setText2(`function greet(name, greeting = "Hello") {
  console.log(greeting + ", " + name + "!");
  return true;
}

const message = "Welcome";
const customGreeting = "Hi";
greet(message, customGreeting);`);
  }, []);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
          <button
            onClick={() => setViewMode('split')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              viewMode === 'split'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            Split View
          </button>
          <button
            onClick={() => setViewMode('unified')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              viewMode === 'unified'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            Unified View
          </button>
        </div>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={ignoreWhitespace}
            onChange={(e) => setIgnoreWhitespace(e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Ignore whitespace</span>
        </label>
        
        <button
          onClick={swapTexts}
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Swap texts"
        >
          <ArrowLeftRight className="w-5 h-5" />
        </button>
        
        <button
          onClick={loadSample}
          className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          Load Sample
        </button>
        
        {diff.length > 0 && (
          <button
            onClick={copyDiff}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium flex items-center gap-2 text-sm"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Diff'}
          </button>
        )}
      </div>

      {/* Input Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Original Text</label>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            rows={10}
            placeholder="Enter original text..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Modified Text</label>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            rows={10}
            placeholder="Enter modified text..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Stats */}
      {diff.length > 0 && (
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-full">
            +{stats.additions} additions
          </span>
          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 rounded-full">
            -{stats.deletions} deletions
          </span>
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
            {stats.unchanged} unchanged
          </span>
        </div>
      )}

      {/* Diff Output */}
      {diff.length > 0 && (
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 border-b border-gray-300 dark:border-gray-600">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Diff Result</span>
          </div>
          
          {viewMode === 'split' ? (
            <div className="grid grid-cols-2 divide-x divide-gray-300 dark:divide-gray-600">
              <div className="overflow-auto max-h-96">
                {diff.map((line, index) => (
                  <div
                    key={`left-${index}`}
                    className={`flex font-mono text-sm ${
                      line.type === 'removed'
                        ? 'bg-red-50 dark:bg-red-900/30'
                        : line.type === 'added'
                        ? 'bg-gray-50 dark:bg-gray-800'
                        : ''
                    }`}
                  >
                    <span className="w-12 px-2 py-1 text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 text-right select-none">
                      {line.lineNumber1 || ''}
                    </span>
                    <span
                      className={`flex-1 px-3 py-1 whitespace-pre ${
                        line.type === 'removed' ? 'text-red-700 dark:text-red-400' : line.type === 'added' ? 'text-gray-400 dark:text-gray-600' : 'text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      {line.type === 'removed' ? `- ${line.content1}` : line.type === 'added' ? '' : line.content1}
                    </span>
                  </div>
                ))}
              </div>
              <div className="overflow-auto max-h-96">
                {diff.map((line, index) => (
                  <div
                    key={`right-${index}`}
                    className={`flex font-mono text-sm ${
                      line.type === 'added'
                        ? 'bg-green-50 dark:bg-green-900/30'
                        : line.type === 'removed'
                        ? 'bg-gray-50 dark:bg-gray-800'
                        : ''
                    }`}
                  >
                    <span className="w-12 px-2 py-1 text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 text-right select-none">
                      {line.lineNumber2 || ''}
                    </span>
                    <span
                      className={`flex-1 px-3 py-1 whitespace-pre ${
                        line.type === 'added' ? 'text-green-700 dark:text-green-400' : line.type === 'removed' ? 'text-gray-400 dark:text-gray-600' : 'text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      {line.type === 'added' ? `+ ${line.content2}` : line.type === 'removed' ? '' : line.content2}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-auto max-h-96">
              {diff.map((line, index) => (
                <div
                  key={index}
                  className={`flex font-mono text-sm ${
                    line.type === 'added'
                      ? 'bg-green-50 dark:bg-green-900/30'
                      : line.type === 'removed'
                      ? 'bg-red-50 dark:bg-red-900/30'
                      : ''
                  }`}
                >
                  <span className="w-12 px-2 py-1 text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 text-right select-none">
                    {line.lineNumber1 || ''}
                  </span>
                  <span className="w-12 px-2 py-1 text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 text-right select-none">
                    {line.lineNumber2 || ''}
                  </span>
                  <span
                    className={`flex-1 px-3 py-1 whitespace-pre ${
                      line.type === 'added'
                        ? 'text-green-700 dark:text-green-400'
                        : line.type === 'removed'
                        ? 'text-red-700 dark:text-red-400'
                        : 'text-gray-900 dark:text-gray-100'
                    }`}
                  >
                    {line.type === 'same'
                      ? `  ${line.content1}`
                      : line.type === 'added'
                      ? `+ ${line.content2}`
                      : `- ${line.content1}`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
