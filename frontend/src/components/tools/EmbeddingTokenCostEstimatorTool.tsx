'use client';
import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { estimateEmbeddingCost } from '@/lib/embeddingTokenCostEstimator';

export default function EmbeddingTokenCostEstimatorTool() {
  const [tokens, setTokens] = useState('1000000');
  const res = estimateEmbeddingCost(Number(tokens) || 1000000);
  const output = JSON.stringify(res, null, 2);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-semibold">Total Tokens</label>
        <input type="number" value={tokens} onChange={(e) => setTokens(e.target.value)} className="w-full rounded-xl border p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold">Estimated Embedding Cost (USD)</label>
          <CopyButton text={output} />
        </div>
        <textarea value={output} readOnly rows={8} className="w-full rounded-2xl border bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900" />
      </div>
    </div>
  );
}
