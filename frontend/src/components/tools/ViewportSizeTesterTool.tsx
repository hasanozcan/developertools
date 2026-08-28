'use client';
import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { getBreakpoint } from '@/lib/viewportSizeTester';

export default function ViewportSizeTesterTool() {
  const [width, setWidth] = useState('1024');
  const bp = getBreakpoint(Number(width) || 1024);
  const output = `Screen Width: ${width}px -> Active Breakpoint: ${bp}`;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-semibold">Screen Width (pixels): {width}px</label>
        <input type="range" min="320" max="2560" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full accent-indigo-600" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold">Breakpoint Classification</label>
          <CopyButton text={output} />
        </div>
        <textarea value={output} readOnly rows={4} className="w-full rounded-2xl border bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
      </div>
    </div>
  );
}
