'use client';
import React, { useState, useMemo } from 'react';
import { buildIosInfoPlist } from '@/lib/iosPlistBuilder';

export default function IosPlistBuilderTool() {
  const [bundle, setBundle] = useState('com.devstools.app');
  const plist = useMemo(() => buildIosInfoPlist({ bundleIdentifier: bundle, displayName: 'DevsTools', version: '1.0.0', permissions: [] }), [bundle]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" value={bundle} onChange={(e) => setBundle(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <textarea readOnly rows={12} value={plist} className="w-full rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
