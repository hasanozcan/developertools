'use client';
import React, { useState, useMemo } from 'react';
import { calculateClaudeTokens } from '@/lib/claudeTokenCounter';

export default function ClaudeTokenCounterTool() {
  const [text, setText] = useState('Analyze this full codebase architecture with Claude 3.5 Sonnet.');
  const stats = useMemo(() => calculateClaudeTokens(text), [text]);

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        className="w-full rounded-xl border border-border bg-card p-4 font-mono text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Enter prompt..."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="text-xs text-muted-foreground">Tokens</div>
          <div className="text-2xl font-bold text-primary">{stats.tokens}</div>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="text-xs text-muted-foreground">Haiku Cost</div>
          <div className="text-lg font-semibold">${stats.costHaikuInput.toFixed(6)}</div>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="text-xs text-muted-foreground">Sonnet 3.5 Cost</div>
          <div className="text-lg font-semibold text-amber-500">${stats.costSonnetInput.toFixed(6)}</div>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="text-xs text-muted-foreground">Opus Cost</div>
          <div className="text-lg font-semibold text-rose-500">${stats.costOpusInput.toFixed(6)}</div>
        </div>
      </div>
    </div>
  );
}
