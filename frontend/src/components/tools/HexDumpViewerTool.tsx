'use client';
import React, { useState, useMemo } from 'react';
import { generateHexDump } from '@/lib/hexDumpViewer';

export default function HexDumpViewerTool() {
  const [text, setText] = useState('Hello World! Hex Dump Inspector');
  const dump = useMemo(() => generateHexDump(text), [text]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <textarea rows={4} value={text} onChange={(e) => setText(e.target.value)} className="w-full rounded-xl border p-3 font-mono text-xs" />
        <textarea readOnly rows={8} value={dump} className="w-full rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
