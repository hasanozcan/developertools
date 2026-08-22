'use client';
import React, { useState, useMemo } from 'react';
import { ArrowRightLeft, Copy, Check } from 'lucide-react';
import { parsePromptToMessages, formatMessages, PromptFormat } from '@/lib/promptFormatConverter';

export default function PromptFormatConverterTool() {
  const [input, setInput] = useState('System: You are an expert AI developer.\n\nHuman: How do I optimize Next.js?\n\nAssistant: Use Server Components and image optimization.');
  const [format, setFormat] = useState<PromptFormat>('chatml');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    const msgs = parsePromptToMessages(input);
    return formatMessages(msgs, format);
  }, [input, format]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="surface-card rounded-2xl p-5 space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Raw Prompt Input</h3>
          <textarea
            rows={12}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs text-slate-900 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>
        <div className="surface-card rounded-2xl p-5 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as PromptFormat)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200"
            >
              <option value="chatml">ChatML Format</option>
              <option value="llama3">Llama 3 Format</option>
              <option value="anthropic">Anthropic Format</option>
              <option value="json">JSON Messages Format</option>
            </select>
            <button onClick={handleCopy} className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <textarea
            readOnly
            rows={12}
            value={output}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-900 p-3 font-mono text-xs text-emerald-400 dark:border-white/10 dark:bg-slate-950"
          />
        </div>
      </div>
    </div>
  );
}
