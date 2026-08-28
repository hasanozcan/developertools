'use client';
import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { encodeBcd } from '@/lib/bcdBinaryCodedDecimalConverter';

export default function BcdBinaryCodedDecimalConverterTool() {
  const [num, setNum] = useState('1984');
  const output = encodeBcd(Number(num) || 0);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Decimal Number</label>
        <input type="number" value={num} onChange={(e) => setNum(e.target.value)} className="w-full rounded-xl border p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">BCD 8421 Binary Nibbles</label>
          <CopyButton text={output} />
        </div>
        <textarea value={output} readOnly rows={4} className="w-full rounded-2xl border bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
      </div>
    </div>
  );
}
