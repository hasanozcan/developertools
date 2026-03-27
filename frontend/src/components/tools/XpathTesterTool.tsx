'use client';

import { useState, useCallback, useMemo } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import CopyButton from '@/components/common/CopyButton';
import { useLanguage } from '@/context/LanguageContext';

interface XpathResult {
  node: Node;
  index: number;
  value: string;
}

interface CommonExpression {
  name: string;
  expression: string;
  description: string;
}

const commonExpressions: CommonExpression[] = [
  {
    name: 'All tags',
    expression: '//tagname',
    description: 'Match all elements with tag name'
  },
  {
    name: 'By attribute',
    expression: '//tagname[@attribute]',
    description: 'Match elements with specific attribute'
  },
  {
    name: 'By text content',
    expression: "//tagname[contains(text(),'value')]",
    description: 'Match elements containing specific text'
  },
  {
    name: 'Path traversal',
    expression: '/root/child',
    description: 'Navigate from root to child'
  },
  {
    name: 'Attribute selection',
    expression: '@attribute',
    description: 'Select an attribute value'
  },
  {
    name: 'Position filter',
    expression: '//tagname[1]',
    description: 'Match first element with tag name'
  },
  {
    name: 'Last position',
    expression: '//tagname[last()]',
    description: 'Match last element with tag name'
  },
  {
    name: 'All text',
    expression: '//text()',
    description: 'Select all text nodes'
  },
  {
    name: 'Comments',
    expression: '//comment()',
    description: 'Select all comment nodes'
  },
  {
    name: 'Descendants',
    expression: '//tagname//child',
    description: 'Match descendants at any depth'
  }
];

export default function XpathTesterTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [xpath, setXpath] = useState('');
  const [results, setResults] = useState<XpathResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showQuickExpressions, setShowQuickExpressions] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(false);

  const executeXpath = useCallback(() => {
    if (!input.trim() || !xpath.trim()) {
      setError('Please enter both XML/HTML content and an XPath expression');
      setResults([]);
      setHasExecuted(true);
      return;
    }

    setError(null);
    setResults([]);

    try {
      // Parse the input as HTML/XML using a temporary container
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, 'text/html');

      // Use document.evaluate for XPath 1.0 evaluation
      const xpathResult = document.evaluate(
        xpath,
        doc,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      );

      const resultItems: XpathResult[] = [];

      for (let i = 0; i < xpathResult.snapshotLength; i++) {
        const node = xpathResult.snapshotItem(i);
        if (node) {
          let value = '';

          if (node.nodeType === Node.ELEMENT_NODE) {
            value = node.textContent?.trim() || '';
          } else if (node.nodeType === Node.TEXT_NODE) {
            value = node.textContent || '';
          } else if (node.nodeType === Node.ATTRIBUTE_NODE) {
            value = node.nodeValue || '';
          } else {
            value = node.textContent || '';
          }

          resultItems.push({
            node,
            index: i,
            value
          });
        }
      }

      setResults(resultItems);
      setHasExecuted(true);
    } catch (e) {
      setError(`Invalid XPath expression: ${(e as Error).message}`);
      setResults([]);
      setHasExecuted(true);
    }
  }, [input, xpath]);

  const loadSample = useCallback(() => {
    setInput(`<root>
  <persons>
    <person id="1">
      <name>John Doe</name>
      <email>john@example.com</email>
      <role>admin</role>
    </person>
    <person id="2">
      <name>Jane Smith</name>
      <email>jane@example.com</email>
      <role>user</role>
    </person>
    <person id="3">
      <name>Bob Wilson</name>
      <email>bob@example.com</email>
      <role>user</role>
    </person>
  </persons>
  <settings>
    <theme dark="true">dark</theme>
    <language>en</language>
  </settings>
</root>`);
    setXpath('//person[@id]');
    setError(null);
    setResults([]);
    setHasExecuted(false);
  }, []);

  const selectExpression = useCallback((expr: CommonExpression) => {
    setXpath(expr.expression);
    setShowQuickExpressions(false);
  }, []);

  const resultText = useMemo(() => {
    if (results.length === 0) return '';
    return results.map(r => r.value).join('\n');
  }, [results]);

  return (
    <div className="space-y-6">
      {/* Quick Expressions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Common XPath Expressions
          </label>
          <button
            onClick={() => setShowQuickExpressions(!showQuickExpressions)}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {showQuickExpressions ? 'Hide' : 'Show'} Expressions
          </button>
        </div>

        {showQuickExpressions && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
            {commonExpressions.map((expr) => (
              <button
                key={expr.name}
                onClick={() => selectExpression(expr)}
                className="text-left p-3 rounded-lg border transition-all bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-400"
              >
                <div className="font-medium text-gray-900 dark:text-white text-sm">
                  {expr.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono truncate">
                  {expr.expression}
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {expr.description}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* XPath Expression Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            XPath Expression
          </label>
          <button
            onClick={loadSample}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Load Sample
          </button>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={xpath}
            onChange={(e) => setXpath(e.target.value)}
            placeholder="Enter XPath expression (e.g., //tagname[@attribute])"
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                executeXpath();
              }
            }}
          />
          <button
            onClick={executeXpath}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
          >
            Execute
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Input/Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            XML / HTML Content
          </label>
          <CodeEditor
            value={input}
            onChange={setInput}
            placeholder="Enter XML or HTML content to test XPath against..."
            language="xml"
            minHeight="300px"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Results
              {hasExecuted && results.length > 0 && (
                <span className="ml-2 text-gray-500 dark:text-gray-400 font-normal">
                  ({results.length} match{results.length !== 1 ? 'es' : ''})
                </span>
              )}
            </label>
            {resultText && (
              <CopyButton text={resultText} />
            )}
          </div>
          <div className="relative">
            {hasExecuted && results.length > 0 ? (
              <div className="space-y-2 max-h-[340px] overflow-auto">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Result {index + 1}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        Index: {result.index}
                      </span>
                    </div>
                    <code className="text-sm font-mono text-primary-700 dark:text-primary-400 break-all">
                      {result.value || <span className="text-gray-400 dark:text-gray-500 italic">(empty)</span>}
                    </code>
                  </div>
                ))}
              </div>
            ) : hasExecuted && !error ? (
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-center text-gray-500 dark:text-gray-400">
                No matches found
              </div>
            ) : (
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-center text-gray-500 dark:text-gray-400 min-h-[300px] flex items-center justify-center">
                Enter XML/HTML content and an XPath expression, then click Execute
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <details className="text-sm">
        <summary className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-medium">
          XPath Quick Reference
        </summary>
        <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono text-gray-700 dark:text-gray-300">
          <div><code>{'//tag'}</code> <span>Any descendant element</span></div>
          <div><code>{'/tag'}</code> <span>Root element</span></div>
          <div><code>{'@attr'}</code> <span>Attribute selection</span></div>
          <div><code>{'text()'}</code> <span>Text node</span></div>
          <div><code>{'[1]'}</code> <span>Position filter</span></div>
          <div><code>{'[last()]'}</code> <span>Last position</span></div>
          <div><code>{'[contains()]'}</code> <span>Partial text match</span></div>
          <div><code>{'[starts-with()]'}</code> <span>Prefix match</span></div>
        </div>
      </details>
    </div>
  );
}
