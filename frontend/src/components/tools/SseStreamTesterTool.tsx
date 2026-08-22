'use client';
import React, { useState } from 'react';

export default function SseStreamTesterTool() {
  const [url, setUrl] = useState('https://api.example.com/events');

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">Listen to SSE Stream</button>
      </div>
    </div>
  );
}
