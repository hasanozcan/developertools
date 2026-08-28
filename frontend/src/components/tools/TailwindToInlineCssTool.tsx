'use client';

import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { convertTailwindToInlineCss } from '@/lib/tailwindToInlineCss';

const SAMPLE_TAILWIND = `<div class="p-6 bg-white rounded-lg text-center font-bold text-lg text-black">
  <h1 class="text-xl font-bold text-blue-600 mb-2">Welcome Newsletter</h1>
  <p class="text-sm text-black">Get the best developer updates straight to your inbox.</p>
</div>`;

export default function TailwindToInlineCssTool() {
  const [input, setInput] = useState(SAMPLE_TAILWIND);
  const output = convertTailwindToInlineCss(input);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">HTML with Tailwind Classes</label>
            <button onClick={() => setInput(SAMPLE_TAILWIND)} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Load Sample</button>
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
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Inlined HTML for Email & CMS</label>
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
