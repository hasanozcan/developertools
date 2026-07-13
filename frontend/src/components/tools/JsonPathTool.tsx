'use client';

import { useMemo, useState } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import CopyButton from '@/components/common/CopyButton';
import { evaluateJsonPath } from '@/lib/jsonPath';

const SAMPLE =
  '{\n  "store": {\n    "book": [\n      { "title": "The Pragmatic Programmer", "price": 8.95 },\n      { "title": "Clean Code", "price": 12.5 }\n    ],\n    "bicycle": { "color": "red", "price": 19.95 }\n  }\n}';

export default function JsonPathTool() {
  const [document, setDocument] = useState(SAMPLE);
  const [path, setPath] = useState('$..price');

  const result = useMemo(() => {
    try {
      const parsed = JSON.parse(document) as unknown;
      return { output: JSON.stringify(evaluateJsonPath(parsed, path), null, 2), error: '' };
    } catch (error) {
      return {
        output: '',
        error: error instanceof Error ? error.message : 'Unable to evaluate the JSONPath.',
      };
    }
  }, [document, path]);

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="json-path"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          JSONPath
        </label>
        <input
          id="json-path"
          value={path}
          onChange={(event) => setPath(event.target.value)}
          placeholder="$.store.book[*].title"
          spellCheck={false}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Supports $, child names, array indices, wildcards, slices, and recursive descent such as
          ..price or ..*. Filter and script expressions are intentionally disabled.
        </p>
      </div>

      {result.error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300"
        >
          {result.error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            JSON document
          </label>
          <CodeEditor value={document} onChange={setDocument} language="json" minHeight="320px" />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Matches (normalized path + value)
            </label>
            <CopyButton text={result.output} />
          </div>
          <CodeEditor
            value={result.output}
            onChange={() => {}}
            readOnly
            language="json"
            minHeight="320px"
            placeholder="Matching paths and values appear here."
          />
        </div>
      </div>
    </div>
  );
}
