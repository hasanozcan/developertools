'use client';

import React, { useState } from 'react';
import { Wand2, Copy, Check, FileText, Trash2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

type BraceStyle = 'collapse' | 'expand' | 'end-expand' | 'none';

interface BeautifierOptions {
  indentSize: 2 | 4;
  useTabs: boolean;
  braceStyle: BraceStyle;
}

const BRACE_STYLE_OPTIONS: { value: BraceStyle; label: string }[] = [
  { value: 'collapse', label: 'Collapse' },
  { value: 'expand', label: 'Expand' },
  { value: 'end-expand', label: 'End Expand' },
  { value: 'none', label: 'None' },
];

export default function JsBeautifierTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<BeautifierOptions>({
    indentSize: 2,
    useTabs: false,
    braceStyle: 'collapse',
  });

  const getIndent = (level: number, useTabs: boolean, indentSize: number): string => {
    if (useTabs) {
      return '\t'.repeat(level);
    }
    return ' '.repeat(level * indentSize);
  };

  const beautifyJs = (js: string): string => {
    if (!js.trim()) return '';

    let result = '';
    let indentLevel = 0;
    let inString = false;
    let stringChar = '';
    let inComment = false;
    let inMultiComment = false;
    let newLine = true;
    let lastToken = '';
    let braceStack: string[] = [];

    const useTabs = options.useTabs;
    const indentSize = options.indentSize;
    const braceStyle = options.braceStyle;

    let i = 0;
    while (i < js.length) {
      const char = js[i];
      const nextChar = js[i + 1];

      // Handle multi-line comments
      if (inMultiComment) {
        if (char === '*' && nextChar === '/') {
          result += '*/';
          i += 2;
          inMultiComment = false;
          continue;
        }
        result += char;
        i++;
        continue;
      }

      // Handle single-line comments
      if (inComment) {
        if (char === '\n') {
          result += '\n';
          inComment = false;
          newLine = true;
        } else {
          result += char;
        }
        i++;
        continue;
      }

      // Handle strings
      if (inString) {
        result += char;
        if (char === stringChar && js[i - 1] !== '\\') {
          inString = false;
        }
        i++;
        continue;
      }

      // Detect strings
      if (char === '"' || char === "'" || char === '`') {
        inString = true;
        stringChar = char;
        result += char;
        i++;
        continue;
      }

      // Detect comments
      if (char === '/' && nextChar === '/') {
        inComment = true;
        result += '//';
        i += 2;
        continue;
      }

      if (char === '/' && nextChar === '*') {
        inMultiComment = true;
        result += '/*';
        i += 2;
        continue;
      }

      // Handle opening brace
      if (char === '{') {
        braceStack.push('{');

        if (braceStyle === 'expand' || braceStyle === 'end-expand') {
          if (!newLine) {
            result += '\n';
          }
          result += getIndent(indentLevel, useTabs, indentSize) + '{';
          indentLevel++;

          if (braceStyle === 'expand') {
            result += '\n';
            newLine = true;
          } else {
            newLine = false;
          }
        } else if (braceStyle === 'collapse') {
          if (lastToken === 'case' || lastToken === 'default') {
            result += ' {';
            indentLevel++;
          } else {
            result += ' {';
          }
          newLine = false;
        } else {
          result += '{';
          indentLevel++;
          newLine = false;
        }
        i++;
        lastToken = '{';
        continue;
      }

      // Handle closing brace
      if (char === '}') {
        if (braceStack.length > 0) {
          braceStack.pop();
        }

        indentLevel = Math.max(0, indentLevel - 1);

        if (braceStyle === 'expand' || braceStyle === 'end-expand') {
          result += getIndent(indentLevel, useTabs, indentSize) + '}';
          newLine = true;

          if (braceStyle === 'end-expand') {
            result += '\n';
            newLine = true;
          }
        } else if (braceStyle === 'collapse') {
          if (lastToken === '{' || lastToken === ';') {
            result += '}';
          } else {
            result += ' }';
          }
          newLine = false;
        } else {
          result += '}';
          newLine = false;
        }
        i++;
        lastToken = '}';
        continue;
      }

      // Handle semicolons
      if (char === ';') {
        result += ';';
        if (braceStyle === 'expand' || braceStyle === 'end-expand') {
          result += '\n';
          newLine = true;
        } else {
          result += ' ';
          newLine = false;
        }
        i++;
        lastToken = ';';
        continue;
      }

      // Handle colons (for object properties, case statements)
      if (char === ':') {
        result += ':';
        i++;
        lastToken = ':';
        continue;
      }

      // Handle commas
      if (char === ',') {
        result += ',';
        if (!newLine) {
          result += ' ';
        }
        i++;
        lastToken = ',';
        continue;
      }

      // Handle newlines
      if (char === '\n' || char === '\r') {
        if (char === '\n') {
          if (braceStyle === 'expand' || braceStyle === 'end-expand') {
            // Skip consecutive newlines in expand mode
          } else {
            result += '\n';
            newLine = true;
          }
        }
        i++;
        continue;
      }

      // Handle whitespace
      if (/\s/.test(char)) {
        if (newLine) {
          // Skip leading whitespace on new lines in collapse mode
          if (braceStyle === 'collapse') {
            i++;
            continue;
          }
        }
        result += char;
        i++;
        continue;
      }

      // Regular characters
      if (newLine) {
        result += getIndent(indentLevel, useTabs, indentSize);
        newLine = false;
      }
      result += char;
      lastToken = char;
      i++;
    }

    // Clean up extra blank lines
    if (braceStyle === 'collapse' || braceStyle === 'none') {
      result = result.replace(/\n\s*\n/g, '\n');
    }

    return result.trim();
  };

  const handleBeautify = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const beautified = beautifyJs(input);
      setOutput(beautified);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      setOutput('');
    }
  };

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setInput(`function foo(items){for(let i=0;i<items.length;i++){if(items[i].active){console.log(items[i].name)}}}const data={name:"test",value:42,items:[1,2,3]};class Handler{constructor(){this.data=[]}add(item){this.data.push(item)}remove(index){this.data.splice(index,1)}}`);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Options */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700 dark:text-gray-300">Indent:</label>
          <select
            value={options.indentSize}
            onChange={(e) => setOptions({ ...options, indentSize: Number(e.target.value) as 2 | 4 })}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700 dark:text-gray-300">Brace Style:</label>
          <select
            value={options.braceStyle}
            onChange={(e) => setOptions({ ...options, braceStyle: e.target.value as BraceStyle })}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
          >
            {BRACE_STYLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={options.useTabs}
            onChange={(e) => setOptions({ ...options, useTabs: e.target.checked })}
            className="w-4 h-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 bg-white dark:bg-gray-700"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Indent with tabs</span>
        </label>

        <div className="flex-1" />

        <button
          onClick={loadSample}
          className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Load Sample
        </button>
        <button
          onClick={() => {
            setInput('');
            setOutput('');
            setError(null);
          }}
          className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>
      </div>

      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          JavaScript Input
        </label>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (error) setError(null);
          }}
          rows={8}
          placeholder="Paste your JavaScript code here..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleBeautify}
          disabled={!input.trim()}
          className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Wand2 className="w-4 h-4" />
          Beautify
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-200">
          Error: {error}
        </div>
      )}

      {/* Output */}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Formatted JavaScript
            </label>
            <button
              onClick={copyOutput}
              className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="relative">
            <pre className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white overflow-auto max-h-96">
              <code>{output}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
