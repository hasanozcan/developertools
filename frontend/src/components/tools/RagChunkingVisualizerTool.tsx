'use client';
import React, { useState, useMemo } from 'react';
import { chunkDocument } from '@/lib/ragChunkingVisualizer';

export default function RagChunkingVisualizerTool() {
  const [text, setText] = useState('Retrieval-Augmented Generation (RAG) splits long unstructured documents into smaller semantic chunks with overlapping token windows for high-accuracy embedding search in vector databases.');
  const [chunkSize, setChunkSize] = useState(80);
  const [overlap, setOverlap] = useState(20);

  const chunks = useMemo(() => chunkDocument(text, chunkSize, overlap), [text, chunkSize, overlap]);

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        className="w-full rounded-xl border border-border bg-card p-4 font-mono text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground">Chunk Size (chars): {chunkSize}</label>
          <input type="range" min="30" max="200" value={chunkSize} onChange={(e) => setChunkSize(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Overlap (chars): {overlap}</label>
          <input type="range" min="0" max="60" value={overlap} onChange={(e) => setOverlap(Number(e.target.value))} className="w-full" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="text-sm font-semibold">Generated Chunks ({chunks.length})</div>
        {chunks.map((c) => (
          <div key={c.index} className="p-3 rounded-lg border border-border bg-card font-mono text-xs">
            <div className="text-primary font-bold mb-1">Chunk #{c.index + 1} ({c.charStart}-{c.charEnd})</div>
            <div>{c.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
