'use client';
import React, { useState } from 'react';
import { parsePostgresExplainJson } from '@/lib/postgresExplainVisualizer';

export default function PostgresExplainVisualizerTool() {
  const [json, setJson] = useState(`[
  {
    "Plan": {
      "Node Type": "Index Scan",
      "Relation Name": "users",
      "Total Cost": 8.45,
      "Actual Total Time": 0.042,
      "Actual Rows": 1
    }
  }
]`);

  const result = parsePostgresExplainJson(json);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-4 dark:border-indigo-900/30 dark:bg-indigo-950/20 font-semibold text-indigo-700 dark:text-indigo-300 text-sm">
        {result.summary}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          rows={10}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 font-mono text-xs text-slate-800 focus:border-indigo-500 focus:outline-none dark:border-white/10 dark:bg-slate-950 dark:text-slate-200"
        />
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400">
          {result.nodes.map((node, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <p className="font-bold text-sm text-cyan-300">{node.nodeType} on {node.relationName || 'Query'}</p>
              <p className="text-slate-400 mt-1">Cost: {node.totalCost} | Time: {node.actualTotalTime || 'N/A'}ms</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
