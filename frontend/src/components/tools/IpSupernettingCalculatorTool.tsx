'use client';
import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { calculateSupernet } from '@/lib/ipSupernettingCalculator';

export default function IpSupernettingCalculatorTool() {
  const [text, setText] = useState('192.168.0.0/24\n192.168.1.0/24');
  const output = calculateSupernet(text.split('\n').filter(Boolean));

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-semibold">CIDR Subnet Prefixes</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} className="w-full rounded-2xl border p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold">Aggregated Supernet</label>
          <CopyButton text={output} />
        </div>
        <textarea value={output} readOnly rows={4} className="w-full rounded-2xl border bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
      </div>
    </div>
  );
}
