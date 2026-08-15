'use client';

import React, { useState } from 'react';
import { Minimize2, Copy, Check, FileText, Trash2, Info } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { minifyStylesheet } from '@/lib/codeMinifiers';

interface MinifyStats {
  original: number;
  minified: number;
  saved: number;
  percentage: number;
}

export default function CssMinifierTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<MinifyStats | null>(null);
  const [removeComments, setRemoveComments] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMinifying, setIsMinifying] = useState(false);

  const beautifyCss = (css: string): string => {
    if (!css.trim()) return '';

    let result = css;

    // First minify to normalize
    result = result.replace(/\s+/g, ' ');

    // Add newline after each rule
    result = result.replace(/}/g, '}\n');

    // Add newline after opening brace
    result = result.replace(/{/g, ' {\n  ');

    // Add newline after semicolons
    result = result.replace(/;/g, ';\n  ');

    // Fix double spaces
    result = result.replace(/\n  }/g, '\n}');

    // Add space before opening brace
    result = result.replace(/([^\s]){/g, '$1 {');

    return result.trim();
  };

  const handleMinify = async () => {
    setIsMinifying(true);
    setError(null);

    try {
      const minified = await minifyStylesheet(input, { removeComments });
      setOutput(minified);

      const original = input.length;
      const minifiedLength = minified.length;
      const saved = original - minifiedLength;
      const percentage = original > 0 ? Math.round((saved / original) * 100) : 0;

      setStats({
        original,
        minified: minifiedLength,
        saved,
        percentage,
      });
    } catch (caughtError) {
      setOutput('');
      setStats(null);
      setError(caughtError instanceof Error ? caughtError.message : 'CSS minification failed.');
    } finally {
      setIsMinifying(false);
    }
  };

  const handleBeautify = () => {
    setOutput(beautifyCss(input));
    setStats(null);
    setError(null);
  };

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setInput(`.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    margin: 0 auto;
    max-width: 1200px;
}

/* Header styles */
.header {
    background-color: #ffffff;
    border-bottom: 1px solid #eeeeee;
    padding: 16px 24px;
}

.header .logo {
    font-size: 24px;
    font-weight: 700;
    color: #333333;
}

/* Button styles */
.button {
    display: inline-block;
    padding: 12px 24px;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: #0056b3;
}

/* Responsive */
@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
    
    .header {
        padding: 12px 16px;
    }
}`);
  };

  return (
    <div className="space-y-6">
      {/* Options */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={removeComments}
            onChange={(e) => setRemoveComments(e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {t('tool.cssMinifier.removeComments')}
          </span>
        </label>

        <div className="flex gap-2">
          <button
            onClick={loadSample}
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            {t('common.loadSample')}
          </button>
          <button
            onClick={() => {
              setInput('');
              setOutput('');
              setStats(null);
              setError(null);
            }}
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            {t('common.clear')}
          </button>
        </div>
      </div>

      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('tool.cssMinifier.cssInput')}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={12}
          placeholder="Paste your CSS here..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {input.length} {t('common.characters')}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleMinify}
          disabled={!input.trim() || isMinifying}
          aria-busy={isMinifying}
          className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minimize2 className="w-4 h-4" />
          {t('common.minify')}
        </button>
        <button
          onClick={handleBeautify}
          disabled={!input.trim()}
          className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('tool.cssMinifier.beautify')}
        </button>
      </div>

      {error ? (
        <div
          role="alert"
          className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-300"
        >
          {error}
        </div>
      ) : null}

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.original.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {t('tool.cssMinifier.original')}
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.minified.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {t('tool.cssMinifier.minified')}
            </div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.saved.toLocaleString()}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">
              {t('tool.cssMinifier.bytesSaved')}
            </div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.percentage}%
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">
              {t('tool.cssMinifier.reduction')}
            </div>
          </div>
        </div>
      )}

      {/* Output */}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('common.output')}
            </label>
            <button
              onClick={copyOutput}
              className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              {copied ? t('common.copied') : t('common.copy')}
            </button>
          </div>
          <pre className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white overflow-auto max-h-96 whitespace-pre-wrap break-all">
            {output}
          </pre>
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {output.length} {t('common.characters')}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700 dark:text-blue-300">
            <p className="font-medium mb-2">{t('tool.cssMinifier.infoTitle')}</p>
            <ul className="list-disc list-inside space-y-1 text-blue-600 dark:text-blue-400">
              <li>{t('tool.cssMinifier.info1')}</li>
              <li>{t('tool.cssMinifier.info3')}</li>
              <li>{t('tool.cssMinifier.info5')}</li>
              <li>{t('tool.cssMinifier.info4')}</li>
              <li>{t('tool.cssMinifier.info2')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
