'use client';
import React, { useState, useMemo } from 'react';
import { calculateDeepSeekTokens } from '@/lib/deepseekTokenCounter';

export default function DeepseekTokenCounterTool() {
  const [text, setText] = useState('DeepSeek R1 reasoning token calculation example payload.');
  const stats = useMemo(() => calculateDeepSeekTokens(text), [text]);

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        className="w-full rounded-xl border border-border bg-card p-4 font-mono text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Paste your prompt here..."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="text-xs text-muted-foreground">Tokens</div>
          <div className="text-2xl font-bold text-primary">{stats.tokens}</div>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="text-xs text-muted-foreground">Words</div>
          <div className="text-2xl font-bold">{stats.words}</div>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="text-xs text-muted-foreground">V3 Input Cost</div>
          <div className="text-lg font-semibold text-emerald-500">${stats.costV3Input.toFixed(6)}</div>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="text-xs text-muted-foreground">R1 Reasoning Cost</div>
          <div className="text-lg font-semibold text-purple-500">${stats.costR1Input.toFixed(6)}</div>
        </div>
      </div>
    </div>
  );
}
