'use client';
import React, { useState, useMemo } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';
import { estimateTokens, estimateCost, MODEL_PRICING_TABLE } from '@/lib/llmTokenCounter';

export default function LlmTokenCounterTool() {
  const [text, setText] = useState('You are an expert software engineer. Analyze the following code architecture.');
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => estimateTokens(text), [text]);
  const cost = useMemo(() => estimateCost(stats.tokens, selectedModel), [stats.tokens, selectedModel]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`Tokens: ${stats.tokens} | Cost: ${cost.formattedCost}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Prompt Text Input</h3>
          </div>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 focus:outline-none"
          >
            {Object.entries(MODEL_PRICING_TABLE).map(([key, m]) => (
              <option key={key} value={key}>{m.name} ({m.provider})</option>
            ))}
          </select>
        </div>
        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type text..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-900 shadow-inner focus:outline-none dark:border-white/10 dark:bg-slate-950 dark:text-slate-100"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <div className="rounded-xl bg-indigo-500/10 p-3 text-center">
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">Tokens</span>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{stats.tokens}</p>
          </div>
          <div className="rounded-xl bg-emerald-500/10 p-3 text-center">
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Est. Cost</span>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{cost.formattedCost}</p>
          </div>
          <div className="rounded-xl bg-slate-100 dark:bg-slate-800 p-3 text-center">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Characters</span>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{stats.characters}</p>
          </div>
          <div className="rounded-xl bg-slate-100 dark:bg-slate-800 p-3 text-center">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Words</span>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{stats.words}</p>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy Summary'}
        </button>
      </div>
    </div>
  );
}
