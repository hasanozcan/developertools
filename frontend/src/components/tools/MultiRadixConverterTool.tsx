'use client';
import React, { useState, useMemo } from 'react';
import { convertMultiRadix } from '@/lib/multiRadixConverter';

export default function MultiRadixConverterTool() {
  const [val, setVal] = useState('255');
  const res = useMemo(() => convertMultiRadix(val, 10), [val]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" value={val} onChange={(e) => setVal(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400">HEX: {res.hex}</div>
          <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400">DEC: {res.decimal}</div>
          <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400">OCT: {res.octal}</div>
          <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400">BIN: {res.binary}</div>
        </div>
      </div>
    </div>
  );
}
