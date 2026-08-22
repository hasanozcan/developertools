'use client';
import React, { useState } from 'react';
import { generateApiKey } from '@/lib/apiKeyGenerator';

export default function ApiKeyGeneratorTool() {
  const [key, setKey] = useState(generateApiKey());

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <button onClick={() => setKey(generateApiKey())} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">Generate API Key</button>
        <div className="p-4 bg-slate-900 rounded-xl font-mono text-sm text-emerald-400">{key}</div>
      </div>
    </div>
  );
}
