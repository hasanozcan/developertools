'use client';

import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { buildOpenAiToolDefinition } from '@/lib/llmFunctionCallingBuilder';

export default function LlmFunctionCallingBuilderTool() {
  const [fnName, setFnName] = useState('search_database');
  const [fnDesc, setFnDesc] = useState('Search vector database with semantic query and filters');

  const schema = buildOpenAiToolDefinition({
    name: fnName,
    description: fnDesc,
    parameters: [
      { name: 'query', type: 'string', description: 'Semantic search query string', required: true },
      { name: 'limit', type: 'number', description: 'Max number of results to return', required: false },
      { name: 'category', type: 'string', description: 'Filter by category tag', required: false, enumOptions: ['tech', 'finance', 'news'] }
    ]
  });

  const output = JSON.stringify(schema, null, 2);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Function Name</label>
            <input type="text" value={fnName} onChange={(e) => setFnName(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-800" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Description</label>
            <input type="text" value={fnDesc} onChange={(e) => setFnDesc(e.target.value)} className="w-full rounded-xl border p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">OpenAI & Anthropic Tool JSON Schema</label>
            <CopyButton text={output} />
          </div>
          <pre className="h-64 overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-3 font-mono text-xs text-amber-400 dark:border-slate-700">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}
