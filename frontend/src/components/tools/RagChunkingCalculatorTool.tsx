'use client';

import React, { useState } from 'react';
import { chunkText, estimateEmbeddingCost } from '@/lib/ragChunkingCalculator';

export default function RagChunkingCalculatorTool() {
  const [text, setText] = useState('Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG) architectures require documents to be split into manageable text chunks before generating vector embeddings. Proper chunking balances context retention with embedding precision.');
  const [chunkSize, setChunkSize] = useState(80);
  const [overlap, setOverlap] = useState(20);

  const chunks = chunkText(text, chunkSize, overlap);
  const totalTokens = chunks.reduce((acc, c) => acc + c.estimatedTokens, 0);
  const cost = estimateEmbeddingCost(totalTokens);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="w-full rounded-2xl border border-slate-200 bg-white p-3 font-mono text-xs shadow-inner dark:border-slate-700 dark:bg-slate-900"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Chunk Size (chars): {chunkSize}</label>
            <input type="range" min="40" max="500" value={chunkSize} onChange={(e) => setChunkSize(Number(e.target.value))} className="w-full accent-indigo-600" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Overlap (chars): {overlap}</label>
            <input type="range" min="0" max="100" value={overlap} onChange={(e) => setOverlap(Number(e.target.value))} className="w-full accent-indigo-600" />
          </div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs flex flex-col justify-center">
            <span>Total Chunks: <strong>{chunks.length}</strong></span>
            <span>Est. Tokens: <strong>~{totalTokens}</strong></span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Generated Text Chunks</label>
          <div className="space-y-2 max-h-56 overflow-y-auto">
            {chunks.map((c) => (
              <div key={c.chunkIndex} className="p-2.5 rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 text-xs font-mono">
                <span className="text-[10px] font-bold text-indigo-500 mr-2">#{c.chunkIndex + 1}</span>
                {c.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
