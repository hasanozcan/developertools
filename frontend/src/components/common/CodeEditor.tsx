'use client';

import { useState, useCallback } from 'react';
import { Copy, Check, Trash2 } from 'lucide-react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  language?: string;
  minHeight?: string;
}

export default function CodeEditor({
  value,
  onChange,
  placeholder = 'Paste your code here...',
  readOnly = false,
  language = 'json',
  minHeight = '300px',
}: CodeEditorProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [value]);

  const handleClear = useCallback(() => {
    onChange('');
  }, [onChange]);

  return (
    <div className="relative border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <span className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase">{language}</span>
        <div className="flex items-center gap-2">
          {!readOnly && value && (
            <button
              onClick={handleClear}
              className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
              title="Clear"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleCopy}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors"
            title="Copy"
            disabled={!value}
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Editor */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`
          w-full p-4 font-mono text-sm bg-white dark:bg-gray-900 dark:text-gray-100 resize-none focus:outline-none placeholder-gray-400 dark:placeholder-gray-500
          ${readOnly ? 'bg-gray-50 dark:bg-gray-900 cursor-default' : ''}
        `}
        style={{ minHeight }}
        spellCheck={false}
      />
    </div>
  );
}
