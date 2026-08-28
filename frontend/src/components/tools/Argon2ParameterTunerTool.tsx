'use client';
import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { recommendArgon2Params } from '@/lib/argon2ParameterTuner';

export default function Argon2ParameterTunerTool() {
  const [ms, setMs] = useState('500');
  const res = recommendArgon2Params(Number(ms) || 500);
  const output = JSON.stringify(res, null, 2);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Target Hashing Latency (ms)</label>
        <input type="number" value={ms} onChange={(e) => setMs(e.target.value)} className="w-full rounded-xl border p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Recommended RFC-9106 Argon2id Parameters</label>
          <CopyButton text={output} />
        </div>
        <textarea value={output} readOnly rows={8} className="w-full rounded-2xl border bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
      </div>
    </div>
  );
}
