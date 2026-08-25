'use client';
import React, { useState } from 'react';
import { calculateEmbeddingCost, EMBEDDING_MODELS } from '@/lib/embeddingCostCalculator';

export default function EmbeddingCostCalculatorTool() {
  const [tokens, setTokens] = useState<number>(5000000);
  const [modelId, setModelId] = useState<string>('text-embedding-3-small');

  const result = calculateEmbeddingCost(tokens, modelId);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase">Token Count</label>
          <input
            type="number"
            value={tokens}
            onChange={(e) => setTokens(Math.max(0, parseInt(e.target.value, 10) || 0))}
            className="w-full rounded-2xl border border-slate-200 p-3 text-sm font-semibold dark:border-white/10 dark:bg-slate-950"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase">Embedding Model</label>
          <select
            value={modelId}
            onChange={(e) => setModelId(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 p-3 text-sm font-semibold dark:border-white/10 dark:bg-slate-950"
          >
            {EMBEDDING_MODELS.map(m => (
              <option key={m.id} value={m.id}>{m.name} (${m.pricePerMillionTokens}/1M tokens)</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 dark:border-indigo-900/30 dark:bg-indigo-950/20 text-center">
          <span className="text-xs font-semibold text-slate-500">Estimated Cost</span>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">${result.estimatedCostUsd.toFixed(4)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-900 text-center">
          <span className="text-xs font-semibold text-slate-500">Vector Dimensions</span>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{result.dimensions} dims</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-900 text-center">
          <span className="text-xs font-semibold text-slate-500">Vector Memory (RAM)</span>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{result.vectorStorageKb} KB</p>
        </div>
      </div>
    </div>
  );
}
