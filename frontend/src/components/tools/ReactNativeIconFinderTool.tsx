'use client';
import React, { useState, useMemo } from 'react';
import { searchRnIcons } from '@/lib/reactNativeIconFinder';

export default function ReactNativeIconFinderTool() {
  const [q, setQ] = useState('');
  const icons = useMemo(() => searchRnIcons(q), [q]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" placeholder="Search React Native icons..." value={q} onChange={(e) => setQ(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {icons.map((ic, i) => (
            <div key={i} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs">
              <p className="font-bold text-indigo-600">{ic.name}</p>
              <p className="text-slate-400">{ic.set}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
