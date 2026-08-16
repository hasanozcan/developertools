'use client';

import { useState, useCallback, useMemo } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import { useLanguage } from '@/context/LanguageContext';

function minifyHtml(html: string, options: { removeComments: boolean; collapseWhitespace: boolean }): string {
  let result = html;

  // Remove HTML comments
  if (options.removeComments) {
    result = result.replace(/<!--[\s\S]*?-->/g, '');
  }

  // Collapse whitespace between tags
  if (options.collapseWhitespace) {
    // Replace multiple whitespace with single space
    result = result.replace(/\s+/g, ' ');
    // Remove whitespace between tags
    result = result.replace(/>\s+</g, '><');
    // Remove whitespace at start and end
    result = result.replace(/^\s+|\s+$/g, '');
  }

  return result;
}

export default function HtmlMinifierTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [removeComments, setRemoveComments] = useState(true);
  const [collapseWhitespace, setCollapseWhitespace] = useState(true);

  const minified = useMemo(() => {
    if (!input.trim()) return '';
    return minifyHtml(input, { removeComments, collapseWhitespace });
  }, [input, removeComments, collapseWhitespace]);

  const stats = useMemo(() => {
    const originalSize = input.length;
    const minifiedSize = minified.length;
    const saved = originalSize - minifiedSize;
    const percentage = originalSize > 0 ? Math.round((saved / originalSize) * 100) : 0;

    return {
      originalSize,
      minifiedSize,
      saved,
      percentage,
    };
  }, [input, minified]);

  const loadSample = useCallback(() => {
    setInput(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sample Page</title>
    <!-- This is a comment -->
    <style>
        body { margin: 0; padding: 20px; }
        h1 { color: blue; }
    </style>
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
        <nav>
            <a href="/home">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
        </nav>
    </header>
    
    <main>
        <p>This is some sample content.</p>
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </ul>
    </main>
    
    <!-- Footer section -->
    <footer>
        <p>&copy; 2024 My Website</p>
    </footer>
</body>
</html>`);
  }, []);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={removeComments}
            onChange={(e) => setRemoveComments(e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Remove Comments</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={collapseWhitespace}
            onChange={(e) => setCollapseWhitespace(e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Collapse Whitespace</span>
        </label>

        <button
          onClick={loadSample}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          Load Sample
        </button>
      </div>

      {/* Stats */}
      {input && (
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
            Original: {stats.originalSize} chars
          </span>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-full">
            Minified: {stats.minifiedSize} chars
          </span>
          {stats.saved > 0 && (
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full">
              Saved: {stats.saved} chars ({stats.percentage}%)
            </span>
          )}
        </div>
      )}

      {/* Input/Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            HTML Input
          </label>
          <CodeEditor
            value={input}
            onChange={setInput}
            placeholder="Enter HTML code to minify..."
            language="html"
            minHeight="300px"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Minified HTML
          </label>
          <div className="relative">
            <CodeEditor
              value={minified}
              onChange={() => {}}
              readOnly
              language="html"
              minHeight="300px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
