'use client';
import React, { useState, useMemo } from 'react';
import { Activity, Copy, Check } from 'lucide-react';
import { parseVector, cosineSimilarity, euclideanDistance, dotProduct } from '@/lib/embeddingSimilarity';

export default function EmbeddingSimilarityTool() {
  const [vecAStr, setVecAStr] = useState('[0.12, 0.45, 0.78, 0.23, 0.91]');
  const [vecBStr, setVecBStr] = useState('[0.15, 0.42, 0.81, 0.20, 0.89]');

  const metrics = useMemo(() => {
    try {
      const vecA = parseVector(vecAStr);
      const vecB = parseVector(vecBStr);
      const cos = cosineSimilarity(vecA, vecB);
      const euc = euclideanDistance(vecA, vecB);
      const dot = dotProduct(vecA, vecB);
      return { cos: cos.toFixed(5), euc: euc.toFixed(5), dot: dot.toFixed(5), error: null };
    } catch (err: unknown) {
      return { cos: '-', euc: '-', dot: '-', error: err instanceof Error ? err.message : String(err) };
    }
  }, [vecAStr, vecBStr]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Vector A</label>
            <textarea
              rows={4}
              value={vecAStr}
              onChange={(e) => setVecAStr(e.target.value)}
              className="w-full mt-1 rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs dark:border-white/10 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Vector B</label>
            <textarea
              rows={4}
              value={vecBStr}
              onChange={(e) => setVecBStr(e.target.value)}
              className="w-full mt-1 rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs dark:border-white/10 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
        </div>

        {metrics.error ? (
          <div className="p-3 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl text-xs">{metrics.error}</div>
        ) : (
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="rounded-xl bg-indigo-500/10 p-3 text-center">
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">Cosine Similarity</span>
              <p className="text-xl font-bold text-slate-900 dark:text-white">{metrics.cos}</p>
            </div>
            <div className="rounded-xl bg-emerald-500/10 p-3 text-center">
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Euclidean Distance</span>
              <p className="text-xl font-bold text-slate-900 dark:text-white">{metrics.euc}</p>
            </div>
            <div className="rounded-xl bg-slate-100 dark:bg-slate-800 p-3 text-center">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Dot Product</span>
              <p className="text-xl font-bold text-slate-900 dark:text-white">{metrics.dot}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
