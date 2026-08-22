'use client';
import React, { useState, useMemo } from 'react';
import { computeSideBySideDiff } from '@/lib/codeSideBySideDiff';

export default function CodeSideBySideDiffTool() {
  const [left, setLeft] = useState('const a = 1;\nconst b = 2;');
  const [right, setRight] = useState('const a = 1;\nconst b = 3;');
  const diff = useMemo(() => computeSideBySideDiff(left, right), [left, right]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <textarea rows={6} value={left} onChange={(e) => setLeft(e.target.value)} className="rounded-xl border p-3 font-mono text-xs" />
        <textarea rows={6} value={right} onChange={(e) => setRight(e.target.value)} className="rounded-xl border p-3 font-mono text-xs" />
      </div>
      <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs space-y-1">
        {diff.map((d) => (
          <div key={d.lineNumber} className={`flex justify-between px-2 rounded ${d.isModified ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400'}`}>
            <span>{d.lineNumber}. {d.left}</span>
            <span>{d.right}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
