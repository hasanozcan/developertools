'use client';
import React, { useState, useMemo } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';
import { formatPromptTemplate } from '@/lib/promptTemplateFormatter';

export default function PromptTemplateFormatterTool() {
  const [template, setTemplate] = useState('You are an expert {{role}} assistant. Write a complete guide on {topic} for {{audience}} developers.');
  const [variablesJson, setVariablesJson] = useState('{\n  "role": "Next.js & TypeScript",\n  "topic": "Server Actions and Form Validation",\n  "audience": "intermediate"\n}');
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    try {
      const vars = JSON.parse(variablesJson);
      return formatPromptTemplate(template, vars);
    } catch {
      return { rendered: template, missingVariables: [], usedVariables: [] };
    }
  }, [template, variablesJson]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.rendered);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="surface-card rounded-2xl p-5 space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">Prompt Template</h3>
          <textarea
            rows={6}
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs text-slate-900 shadow-inner dark:border-white/10 dark:bg-slate-950 dark:text-slate-100"
          />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm pt-2">Variables (JSON)</h3>
          <textarea
            rows={5}
            value={variablesJson}
            onChange={(e) => setVariablesJson(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs text-slate-900 shadow-inner dark:border-white/10 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>
        <div className="surface-card rounded-2xl p-5 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Compiled Prompt</h3>
            <button onClick={handleCopy} className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Prompt'}
            </button>
          </div>
          <textarea
            readOnly
            rows={14}
            value={result.rendered}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-900 p-3 font-mono text-xs text-emerald-400 dark:border-white/10 dark:bg-slate-950"
          />
        </div>
      </div>
    </div>
  );
}
