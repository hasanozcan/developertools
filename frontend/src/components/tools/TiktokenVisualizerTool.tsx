'use client';
import React, { useState, useMemo } from 'react';
import { simulateTiktoken } from '@/lib/tiktokenVisualizer';

const colorPalette = [
  'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
];

export default function TiktokenVisualizerTool() {
  const [text, setText] = useState('Tiktoken Byte-Pair Encoding splits text into subword tokens.');
  const { tokens, totalTokens } = useMemo(() => simulateTiktoken(text), [text]);

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        className="w-full rounded-xl border border-border bg-card p-4 font-mono text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <div className="text-sm font-semibold text-muted-foreground">Token Count: {totalTokens}</div>
      <div className="p-4 rounded-xl border border-border bg-card flex flex-wrap gap-1 leading-relaxed font-mono text-sm">
        {tokens.map((t, i) => (
          <span key={i} className={`px-1.5 py-0.5 rounded border ${colorPalette[t.colorIndex]}`} title={`Token ID: ${t.id}`}>
            {t.text}
          </span>
        ))}
      </div>
    </div>
  );
}
