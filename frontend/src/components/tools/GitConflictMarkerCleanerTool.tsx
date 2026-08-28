'use client';
import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { resolveConflictMarkers } from '@/lib/gitConflictMarkerCleaner';

const SAMPLE = `<<<<<<< HEAD\nconst API_URL = "https://api.v2.devstools.app";\n=======\nconst API_URL = "https://api.devstools.app";\n>>>>>>> main`;

export default function GitConflictMarkerCleanerTool() {
  const [text, setText] = useState(SAMPLE);
  const [take, setTake] = useState<'ours' | 'theirs'>('ours');
  const output = resolveConflictMarkers(text, take);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button onClick={() => setTake('ours')} className={`px-4 py-2 rounded-xl text-xs font-semibold ${take === 'ours' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>Take Ours (HEAD)</button>
        <button onClick={() => setTake('theirs')} className={`px-4 py-2 rounded-xl text-xs font-semibold ${take === 'theirs' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>Take Theirs (Incoming)</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={12} className="w-full rounded-2xl border p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
        <textarea value={output} readOnly rows={12} className="w-full rounded-2xl border bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
      </div>
    </div>
  );
}
