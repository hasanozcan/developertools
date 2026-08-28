'use client';
import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { chunkJsonArray } from '@/lib/jsonArraySplitterChunker';

export default function JsonArraySplitterChunkerTool() {
  const [text, setText] = useState('[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]');
  const [size, setSize] = useState('3');
  let output = '';
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      output = JSON.stringify(chunkJsonArray(parsed, Number(size) || 2), null, 2);
    } else {
      output = 'Error: Input must be a JSON array';
    }
  } catch (e: any) {
    output = e.message;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-semibold">Chunk Size: {size}</label>
        <input type="number" value={size} onChange={(e) => setSize(e.target.value)} className="w-32 rounded-xl border p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={12} className="w-full rounded-2xl border p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
        <textarea value={output} readOnly rows={12} className="w-full rounded-2xl border bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
      </div>
    </div>
  );
}
