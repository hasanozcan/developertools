'use client';

import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { inspectFrame } from '@/lib/http2Http3FrameInspector';

const SAMPLE = "HEADERS";

export default function Http2Http3FrameInspectorTool() {
  const [input, setInput] = useState(SAMPLE);
  let output = '';

  try {
    const res = inspectFrame(input);
    output = typeof res === 'object' ? JSON.stringify(res, null, 2) : String(res);
  } catch (e: any) {
    output = e.message || 'Inspection error';
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">HTTP Frame Type (DATA, HEADERS, SETTINGS, PING)</label>
            <button onClick={() => setInput(SAMPLE)} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Load Sample</button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            className="w-full rounded-2xl border border-slate-200 bg-white p-3 font-mono text-xs shadow-inner dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Frame Description & Wire Function</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            rows={12}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs shadow-inner dark:border-slate-700 dark:bg-slate-900/70"
          />
        </div>
      </div>
    </div>
  );
}
