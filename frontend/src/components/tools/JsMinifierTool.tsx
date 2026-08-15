'use client';

import React, { useState } from 'react';
import { Minimize2, Copy, Check, FileText, Trash2, Info, Code } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  minifyJavaScript,
  type JavaScriptMinifyOptions as MinifyOptions,
} from '@/lib/codeMinifiers';

interface MinifyStats {
  original: number;
  minified: number;
  saved: number;
  percentage: number;
}

export default function JsMinifierTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<MinifyStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMinifying, setIsMinifying] = useState(false);
  const [options, setOptions] = useState<MinifyOptions>({
    removeComments: true,
    removeConsole: false,
    removeDebugger: true,
    shortenBooleans: true,
  });

  const beautifyJs = (js: string): string => {
    if (!js.trim()) return '';

    let result = js;
    let indent = 0;
    const indentStr = '  ';
    let output = '';
    let inString = false;
    let stringChar = '';

    for (let i = 0; i < result.length; i++) {
      const char = result[i];
      const nextChar = result[i + 1];

      // Track string state
      if ((char === '"' || char === "'" || char === '`') && result[i - 1] !== '\\') {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar) {
          inString = false;
        }
      }

      if (!inString) {
        if (char === '{') {
          indent++;
          output += ' {\n' + indentStr.repeat(indent);
        } else if (char === '}') {
          indent--;
          output += '\n' + indentStr.repeat(indent) + '}';
          if (nextChar && nextChar !== ',' && nextChar !== ';' && nextChar !== ')') {
            output += '\n' + indentStr.repeat(indent);
          }
        } else if (char === ';') {
          output += ';\n' + indentStr.repeat(indent);
        } else if (char === ',') {
          output += ', ';
        } else {
          output += char;
        }
      } else {
        output += char;
      }
    }

    return output.replace(/\n\s*\n/g, '\n').trim();
  };

  const handleMinify = async () => {
    setIsMinifying(true);
    setError(null);

    try {
      const minified = await minifyJavaScript(input, options);
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
      setError(
        caughtError instanceof Error ? caughtError.message : 'JavaScript minification failed.',
      );
    } finally {
      setIsMinifying(false);
    }
  };

  const handleBeautify = () => {
    setOutput(beautifyJs(input));
    setStats(null);
    setError(null);
  };

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setInput(`// User authentication module
const UserAuth = {
    // Initialize the authentication
    init: function(config) {
        this.apiUrl = config.apiUrl || '/api/auth';
        this.tokenKey = config.tokenKey || 'auth_token';
        console.log('Auth initialized');
    },

    // Login user with credentials
    login: async function(username, password) {
        try {
            const response = await fetch(this.apiUrl + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            localStorage.setItem(this.tokenKey, data.token);
            console.log('Login successful');
            return true;
        } catch (error) {
            console.error('Login error:', error);
            debugger;
            return false;
        }
    },

    // Check if user is authenticated
    isAuthenticated: function() {
        const token = localStorage.getItem(this.tokenKey);
        return token !== null && token !== undefined;
    },

    // Logout user
    logout: function() {
        localStorage.removeItem(this.tokenKey);
        console.log('User logged out');
    }
};

export default UserAuth;`);
  };

  return (
    <div className="space-y-6">
      {/* Options */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.removeComments}
              onChange={(e) =>
                setOptions((current) => ({ ...current, removeComments: e.target.checked }))
              }
              className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {t('tool.jsMinifier.removeComments')}
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.removeConsole}
              onChange={(e) =>
                setOptions((current) => ({ ...current, removeConsole: e.target.checked }))
              }
              className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {t('tool.jsMinifier.removeConsole')}
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.removeDebugger}
              onChange={(e) =>
                setOptions((current) => ({ ...current, removeDebugger: e.target.checked }))
              }
              className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {t('tool.jsMinifier.removeDebugger')}
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.shortenBooleans}
              onChange={(e) =>
                setOptions((current) => ({ ...current, shortenBooleans: e.target.checked }))
              }
              className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {t('tool.jsMinifier.shortenBooleans')}
            </span>
          </label>
        </div>

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
          {t('tool.jsMinifier.jsInput')}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={12}
          placeholder="Paste your JavaScript code here..."
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
          <Code className="w-4 h-4" />
          {t('tool.jsMinifier.beautify')}
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
              {t('tool.jsMinifier.original')}
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.minified.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {t('tool.jsMinifier.minified')}
            </div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.saved.toLocaleString()}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">
              {t('tool.jsMinifier.bytesSaved')}
            </div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.percentage}%
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">
              {t('tool.jsMinifier.reduction')}
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
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-700 dark:text-yellow-300">
            <p className="font-medium mb-2">{t('tool.jsMinifier.note')}</p>
            <p>{t('tool.jsMinifier.noteText')}</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-yellow-600 dark:text-yellow-400">
              <li>{t('tool.jsMinifier.noteItem1')}</li>
              <li>{t('tool.jsMinifier.noteItem2')}</li>
              <li>{t('tool.jsMinifier.noteItem3')}</li>
              <li>{t('tool.jsMinifier.noteItem4')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
