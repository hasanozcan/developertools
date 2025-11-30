'use client';

import { useState, useCallback } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import { CheckCircle, XCircle } from 'lucide-react';

export default function JsonFormatterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [indentSize, setIndentSize] = useState(2);

  const formatJson = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  }, [input, indentSize]);

  const minifyJson = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  }, [input]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={formatJson}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          Format JSON
        </button>
        <button
          onClick={minifyJson}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          Minify
        </button>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">Indent:</label>
          <select
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={1}>Tab</option>
          </select>
        </div>
      </div>

      {/* Status */}
      {input && (
        <div className={`flex items-center gap-2 text-sm ${error ? 'text-red-600' : 'text-green-600'}`}>
          {error ? (
            <>
              <XCircle className="w-4 h-4" />
              <span>Invalid JSON: {error}</span>
            </>
          ) : output ? (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>Valid JSON</span>
            </>
          ) : null}
        </div>
      )}

      {/* Input/Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Input JSON</label>
          <CodeEditor
            value={input}
            onChange={setInput}
            placeholder='{"key": "value"}'
            language="json"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Formatted Output</label>
          <CodeEditor
            value={output}
            onChange={() => {}}
            readOnly
            language="json"
            placeholder="Formatted JSON will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
