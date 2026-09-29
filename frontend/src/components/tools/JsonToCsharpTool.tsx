'use client';
import React, { useState, useMemo, useEffect } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { jsonToCsharp, type CsharpOutputStyle } from '@/lib/jsonToCsharp';
import { publishToolOutput, readTransferredInput } from '@/lib/toolWorkflow';

export default function JsonToCsharpTool() {
  const [json, setJson] = useState('{\n  "userId": 1,\n  "title": "Task 1",\n  "isComplete": false\n}');
  const [style, setStyle] = useState<CsharpOutputStyle>('class');

  useEffect(() => {
    const transferred = readTransferredInput(window.location.hash);
    if (transferred) setJson(transferred.value);
  }, []);

  const output = useMemo(() => {
    try { return jsonToCsharp(json, 'TodoItem', style); } catch (e: any) { return '// ' + e.message; }
  }, [json, style]);

  useEffect(() => {
    if (output && !output.startsWith('// ')) {
      publishToolOutput({ toolSlug: 'json-to-csharp', value: output, dataType: 'csharp' });
    }
  }, [output]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2" role="group" aria-label="C# output style">
          {(['class', 'record'] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={style === option}
              onClick={() => setStyle(option)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                style === option
                  ? 'border-indigo-600 bg-indigo-600 text-white'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {option === 'class' ? 'Class (get; set;)' : 'Record (positional)'}
            </button>
          ))}
        </div>
        <CopyButton text={output} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea rows={12} aria-label="JSON input" value={json} onChange={(e) => setJson(e.target.value)} className="rounded-xl border p-3 font-mono text-xs" />
        <textarea readOnly rows={12} aria-label="C# output" value={output} className="rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
