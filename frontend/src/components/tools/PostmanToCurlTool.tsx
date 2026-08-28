'use client';

import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { convertPostmanToCurl } from '@/lib/postmanToCurl';

const SAMPLE_POSTMAN = JSON.stringify({
  info: { name: "User Service API" },
  item: [
    {
      name: "Create Account",
      request: {
        method: "POST",
        header: [{ key: "Content-Type", value: "application/json" }],
        url: { raw: "https://api.example.com/v1/accounts" },
        body: { mode: "raw", raw: '{"email":"dev@example.com","plan":"pro"}' }
      }
    }
  ]
}, null, 2);

export default function PostmanToCurlTool() {
  const [input, setInput] = useState(SAMPLE_POSTMAN);
  const output = convertPostmanToCurl(input);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Postman Collection v2.1 JSON</label>
            <button onClick={() => setInput(SAMPLE_POSTMAN)} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Load Sample</button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={14}
            className="w-full rounded-2xl border border-slate-200 bg-white p-3 font-mono text-xs shadow-inner dark:border-slate-700 dark:bg-slate-900"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">cURL Terminal Commands</label>
            <CopyButton text={output} />
          </div>
          <pre className="h-72 overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-3 font-mono text-xs text-cyan-400 dark:border-slate-700">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}
