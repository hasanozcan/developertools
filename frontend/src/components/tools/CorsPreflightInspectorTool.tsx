'use client';
import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { evaluateCorsOptions } from '@/lib/corsPreflightInspector';

export default function CorsPreflightInspectorTool() {
  const [origin, setOrigin] = useState('https://devstools.app');
  const allowed = evaluateCorsOptions(origin, ['https://devstools.app', '*']);
  const output = JSON.stringify({ origin, allowedOrigin: allowed, accessControlAllowCredentials: true }, null, 2);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-semibold">Origin URL</label>
        <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full rounded-xl border p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold">CORS Preflight Status</label>
          <CopyButton text={output} />
        </div>
        <textarea value={output} readOnly rows={6} className="w-full rounded-2xl border bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
      </div>
    </div>
  );
}
