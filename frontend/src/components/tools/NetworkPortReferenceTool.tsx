'use client';
import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { lookupPort } from '@/lib/networkPortReference';

export default function NetworkPortReferenceTool() {
  const [port, setPort] = useState('443');
  const res = lookupPort(Number(port) || 80);
  const output = JSON.stringify(res, null, 2);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-semibold">TCP / UDP Port Number</label>
        <input type="number" value={port} onChange={(e) => setPort(e.target.value)} className="w-full rounded-xl border p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold">Service Details</label>
          <CopyButton text={output} />
        </div>
        <textarea value={output} readOnly rows={6} className="w-full rounded-2xl border bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
      </div>
    </div>
  );
}
