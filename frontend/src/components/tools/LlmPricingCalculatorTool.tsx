'use client';

import React, { useState, useMemo } from 'react';
import { DollarSign, Cpu, Layers } from 'lucide-react';
import { calculateModelCosts } from '@/lib/llmPricingCalculator';

export default function LlmPricingCalculatorTool() {
  const [promptTokens, setPromptTokens] = useState<number>(2000);
  const [completionTokens, setCompletionTokens] = useState<number>(800);
  const [requestsPerDay, setRequestsPerDay] = useState<number>(500);
  const [cachedPromptPercentage, setCachedPromptPercentage] = useState<number>(0);
  const [isBatchMode, setIsBatchMode] = useState<boolean>(false);

  const costResults = useMemo(() => {
    return calculateModelCosts({
      promptTokens,
      completionTokens,
      requestsPerDay,
      cachedPromptPercentage,
      isBatchMode,
    });
  }, [promptTokens, completionTokens, requestsPerDay, cachedPromptPercentage, isBatchMode]);

  return (
    <div className="space-y-6">
      {/* Interactive Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Prompt Tokens / Req
          </label>
          <input
            type="number"
            min={0}
            step={100}
            value={promptTokens}
            onChange={(e) => setPromptTokens(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Completion Tokens / Req
          </label>
          <input
            type="number"
            min={0}
            step={100}
            value={completionTokens}
            onChange={(e) => setCompletionTokens(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Daily Requests
          </label>
          <input
            type="number"
            min={1}
            step={50}
            value={requestsPerDay}
            onChange={(e) => setRequestsPerDay(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Cached Prompt ({cachedPromptPercentage}%)
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={cachedPromptPercentage}
            onChange={(e) => setCachedPromptPercentage(parseInt(e.target.value) || 0)}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600 mt-2"
          />
        </div>

        <div className="flex items-center">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={isBatchMode}
              onChange={(e) => setIsBatchMode(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            Batch API (50% Off)
          </label>
        </div>
      </div>

      {/* Pricing Comparison Grid */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/80 border-b border-slate-200/80 dark:bg-slate-950/40 dark:border-white/5 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Model & Provider</th>
              <th className="py-3.5 px-4">Input / 1M</th>
              <th className="py-3.5 px-4">Output / 1M</th>
              <th className="py-3.5 px-4">Cost / Request</th>
              <th className="py-3.5 px-4">Cost / 1K Req</th>
              <th className="py-3.5 px-4 font-black text-indigo-600 dark:text-indigo-400">
                Monthly Est. (30d)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {costResults.map(({ model, costPerRequest, costPer1kRequests, monthlyCost }) => (
              <tr
                key={model.id}
                className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition"
              >
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {model.provider}
                    </span>
                    <span>{model.name}</span>
                  </div>
                  <p className="text-[11px] font-normal text-slate-400 mt-0.5">
                    {model.description}
                  </p>
                </td>
                <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-mono">
                  ${model.inputPerMillion.toFixed(2)}
                </td>
                <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-mono">
                  ${model.outputPerMillion.toFixed(2)}
                </td>
                <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-mono">
                  ${costPerRequest < 0.0001 ? costPerRequest.toExponential(2) : costPerRequest.toFixed(4)}
                </td>
                <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-mono">
                  ${costPer1kRequests.toFixed(3)}
                </td>
                <td className="py-3.5 px-4 font-bold font-mono text-slate-900 dark:text-white">
                  ${monthlyCost.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
