'use client';
import React, { useState, useMemo } from 'react';
import { parseHarFile } from '@/lib/harViewer';

export default function HarViewerTool() {
  const [harJson, setHarJson] = useState('{\n  "log": {\n    "pages": [],\n    "entries": []\n  }\n}');
  const summary = useMemo(() => {
    try { return parseHarFile(harJson); } catch (e: any) { return { pagesCount: 0, entriesCount: 0, totalBytes: 0, requests: [] }; }
  }, [harJson]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <textarea rows={6} value={harJson} onChange={(e) => setHarJson(e.target.value)} className="w-full rounded-xl border p-3 font-mono text-xs" />
        <div className="p-4 bg-indigo-500/10 rounded-xl text-xs">
          <p><strong>Entries Recorded:</strong> {summary.entriesCount}</p>
        </div>
      </div>
    </div>
  );
}
