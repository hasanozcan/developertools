'use client';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { generateStructuredSystemPrompt } from '@/lib/systemPromptFormatter';

export default function SystemPromptFormatterTool() {
  const [roleTitle, setRoleTitle] = useState('Senior Fullstack Engineer');
  const [context, setContext] = useState('Building production-grade Next.js and TypeScript apps.');
  const [guidelines, setGuidelines] = useState('Follow strict type safety\nUse Server Actions\nWrite comprehensive tests');
  const [outputFormat, setOutputFormat] = useState('Return only code blocks with explanation.');
  const [copied, setCopied] = useState(false);

  const formatted = useMemo(() => {
    return generateStructuredSystemPrompt({
      roleTitle,
      context,
      guidelines: guidelines.split('\n'),
      outputFormat,
      examples: [{ input: 'Build a button', output: 'export function Button() { ... }' }],
    });
  }, [roleTitle, context, guidelines, outputFormat]);

  const handleCopy = () => {
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="surface-card rounded-2xl p-5 space-y-3">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Role & Objective</label>
          <input type="text" value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs dark:border-white/10 dark:bg-slate-900 dark:text-slate-100" />
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Context</label>
          <textarea rows={3} value={context} onChange={(e) => setContext(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs dark:border-white/10 dark:bg-slate-900 dark:text-slate-100" />
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Instructions & Constraints (Line by line)</label>
          <textarea rows={3} value={guidelines} onChange={(e) => setGuidelines(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs dark:border-white/10 dark:bg-slate-900 dark:text-slate-100" />
        </div>
        <div className="surface-card rounded-2xl p-5 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Structured System Prompt</h3>
            <button onClick={handleCopy} className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <textarea readOnly rows={14} value={formatted} className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-900 p-3 font-mono text-xs text-emerald-400 dark:border-white/10 dark:bg-slate-950" />
        </div>
      </div>
    </div>
  );
}
