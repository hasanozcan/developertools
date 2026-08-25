'use client';
import React, { useState } from 'react';
import { curlToAiSdk } from '@/lib/curlToAiSdk';
import { Copy, Check, Sparkles } from 'lucide-react';

export default function CurlToAiSdkTool() {
  const [curl, setCurl] = useState('curl https://api.openai.com/v1/chat/completions -H "Authorization: Bearer $OPENAI_API_KEY" -H "Content-Type: application/json" -d "{\"model\":\"gpt-4o\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello AI!\"}]}"');
  const [sdk, setSdk] = useState<'openai' | 'anthropic'>('openai');
  const [copied, setCopied] = useState(false);

  const code = curlToAiSdk(curl, sdk);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Target SDK:</label>
          <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              onClick={() => setSdk('openai')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold ${sdk === 'openai' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
            >
              OpenAI SDK
            </button>
            <button
              onClick={() => setSdk('anthropic')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold ${sdk === 'anthropic' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
            >
              Anthropic Claude SDK
            </button>
          </div>
        </div>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-500"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'Copied' : 'Copy SDK Code'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <textarea
          value={curl}
          onChange={(e) => setCurl(e.target.value)}
          rows={12}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 font-mono text-xs text-slate-800 focus:border-indigo-500 focus:outline-none dark:border-white/10 dark:bg-slate-950 dark:text-slate-200"
        />
        <pre className="h-[235px] overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 dark:border-white/10">
          {code}
        </pre>
      </div>
    </div>
  );
}
