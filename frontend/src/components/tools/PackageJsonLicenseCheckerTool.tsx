'use client';
import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { checkLicenses } from '@/lib/packageJsonLicenseChecker';

const SAMPLE = JSON.stringify({ dependencies: { react: "^19.0.0", zod: "^3.22.4" } }, null, 2);

export default function PackageJsonLicenseCheckerTool() {
  const [text, setText] = useState(SAMPLE);
  let output = '';
  try {
    const parsed = JSON.parse(text);
    const res = checkLicenses(parsed.dependencies || parsed);
    output = JSON.stringify(res, null, 2);
  } catch (e: any) {
    output = e.message;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={12} className="w-full rounded-2xl border p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
        <textarea value={output} readOnly rows={12} className="w-full rounded-2xl border bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
      </div>
    </div>
  );
}
