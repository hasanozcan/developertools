'use client';
import React, { useState } from 'react';
import { testGitignorePatterns } from '@/lib/gitignoreTester';

export default function GitignoreTesterTool() {
  const [patterns, setPatterns] = useState('node_modules/\n*.log\n!important.log\ndist/');
  const [paths, setPaths] = useState('app.log\nimportant.log\nsrc/index.ts\nnode_modules/package/index.js\ndist/bundle.js');

  const results = testGitignorePatterns(patterns.split('\n'), paths.split('\n').filter(Boolean));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase">.gitignore Patterns (one per line)</label>
          <textarea
            value={patterns}
            onChange={(e) => setPatterns(e.target.value)}
            rows={8}
            className="w-full rounded-2xl border border-slate-200 p-4 font-mono text-xs dark:border-white/10 dark:bg-slate-950"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase">Files to Test</label>
          <textarea
            value={paths}
            onChange={(e) => setPaths(e.target.value)}
            rows={8}
            className="w-full rounded-2xl border border-slate-200 p-4 font-mono text-xs dark:border-white/10 dark:bg-slate-950"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-500 uppercase">Match Results</label>
        <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white p-2 dark:divide-white/10 dark:border-white/10 dark:bg-slate-900">
          {results.map((r, i) => (
            <div key={i} className="flex items-center justify-between p-2 text-xs font-mono">
              <span className={r.ignored ? 'text-rose-500 line-through' : 'text-emerald-600 dark:text-emerald-400 font-semibold'}>{r.path}</span>
              <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${r.ignored ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'}`}>
                {r.ignored ? `Ignored (${r.matchedPattern})` : 'Tracked'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
