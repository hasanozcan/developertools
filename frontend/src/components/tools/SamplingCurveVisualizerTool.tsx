'use client';
import React, { useState, useMemo } from 'react';
import { computeSoftmaxWithTemperature } from '@/lib/samplingCurveVisualizer';

const sampleTokens = [
  { token: 'TypeScript', logit: 4.5 },
  { token: 'JavaScript', logit: 3.8 },
  { token: 'Python', logit: 3.1 },
  { token: 'Rust', logit: 2.4 },
  { token: 'Go', logit: 1.8 },
  { token: 'C++', logit: 1.2 },
];

export default function SamplingCurveVisualizerTool() {
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.9);
  const [topK, setTopK] = useState(4);

  const distributions = useMemo(() => {
    return computeSoftmaxWithTemperature(sampleTokens, temperature, topP, topK);
  }, [temperature, topP, topK]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Temperature: {temperature}</label>
            <input type="range" min={0.1} max={2.0} step={0.05} value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} className="w-full accent-indigo-600" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Top-P: {topP}</label>
            <input type="range" min={0.1} max={1.0} step={0.05} value={topP} onChange={(e) => setTopP(Number(e.target.value))} className="w-full accent-indigo-600" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Top-K: {topK}</label>
            <input type="range" min={1} max={6} step={1} value={topK} onChange={(e) => setTopK(Number(e.target.value))} className="w-full accent-indigo-600" />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Token Probability Distribution</h4>
          <div className="space-y-2">
            {distributions.map((d) => (
              <div key={d.token} className="p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-slate-900 dark:text-white">{d.token}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${(d.sampledProb * 100).toFixed(1)}%` }} />
                  </div>
                  <span className="w-14 text-right">{(d.sampledProb * 100).toFixed(1)}%</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${d.includedInTopP && d.includedInTopK ? 'bg-emerald-500/20 text-emerald-500' : 'bg-slate-500/20 text-slate-500'}`}>
                    {d.includedInTopP && d.includedInTopK ? 'ACTIVE' : 'FILTERED'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
