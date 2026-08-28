'use client';

import React, { useState, useMemo } from 'react';
import { Coins, Cpu, Zap } from 'lucide-react';
import { compareLlmCosts } from '@/lib/multiLlmTokenComparator';

export default function MultiLlmTokenComparatorTool() {
  const [text, setText] = useState(
    'Please summarize the architectural differences between event-driven microservices and monolithic backend systems in high-throughput applications.'
  );

  const analysis = useMemo(() => {
    return compareLlmCosts(text);
  }, [text]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-border bg-card flex flex-col justify-center">
          <span className="text-xs text-muted-foreground font-medium">Estimated Prompt Tokens</span>
          <span className="text-2xl font-bold mt-1 text-primary">
            ~{analysis.models[0]?.estimatedTokens || 0}
          </span>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card flex flex-col justify-center">
          <span className="text-xs text-muted-foreground font-medium">Character Count</span>
          <span className="text-2xl font-bold mt-1">{analysis.charCount}</span>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card flex flex-col justify-center">
          <span className="text-xs text-muted-foreground font-medium">Word Count</span>
          <span className="text-2xl font-bold mt-1">{analysis.wordCount}</span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-muted-foreground">
          Enter Prompt or Document Text:
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your LLM prompt here..."
          className="textarea textarea-bordered w-full h-36 text-xs leading-relaxed font-sans"
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Model Cost & Token Pricing Matrix
        </h3>
        <div className="overflow-x-auto">
          <table className="table table-compact w-full text-xs">
            <thead>
              <tr className="bg-muted/40">
                <th>Model</th>
                <th>Provider</th>
                <th>Context Window</th>
                <th>Input Rate / 1M</th>
                <th>Output Rate / 1M</th>
                <th>Estimated Input Cost</th>
              </tr>
            </thead>
            <tbody>
              {analysis.models.map((m) => (
                <tr key={m.id} className="hover:bg-muted/20">
                  <td className="font-semibold text-foreground">{m.name}</td>
                  <td>
                    <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono">
                      {m.provider}
                    </span>
                  </td>
                  <td className="font-mono">{m.contextWindow}</td>
                  <td className="font-mono">${m.inputCostPer1M.toFixed(2)}</td>
                  <td className="font-mono">${m.outputCostPer1M.toFixed(2)}</td>
                  <td className="font-mono text-primary font-semibold">
                    ${m.totalInputCost < 0.0001 ? '<$0.0001' : m.totalInputCost.toFixed(4)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
