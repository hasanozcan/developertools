'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { buildOptimizedAgentPrompt } from '@/lib/aiAgentPromptOptimizer';

export default function AiAgentPromptOptimizerTool() {
  const { t } = useLanguage();
  const [role, setRole] = useState('Senior Security Architect');
  const [goal, setGoal] = useState('Perform automated threat modeling and find security vulnerabilities.');
  const [constraints, setConstraints] = useState('Never make assumptions\nAlways cite OWASP Top 10 guidelines\nProvide secure code remediation examples');
  const [outputFormat, setOutputFormat] = useState('Markdown report with severity badges and remediation code snippets');
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    return buildOptimizedAgentPrompt({
      role,
      goal,
      constraints: constraints.split('\n').filter(Boolean),
      outputFormat,
    });
  }, [role, goal, constraints, outputFormat]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground">{t("uiText.06d0ed0f")}</label>
          <input value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2.5 rounded-lg border border-border bg-card text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">{t("uiText.22b9b8d6")}</label>
          <input value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full p-2.5 rounded-lg border border-border bg-card text-sm" />
        </div>
      </div>
      <div>
        <label className="text-xs text-muted-foreground">{t("uiText.3d6915dc")}</label>
        <textarea value={constraints} onChange={(e) => setConstraints(e.target.value)} rows={3} className="w-full p-2.5 rounded-lg border border-border bg-card text-sm" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">{t("uiText.7c103367")}</label>
          <button onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-secondary">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? t("uiText.8dc21305") : t("common.copy")}
          </button>
        </div>
        <textarea readOnly value={result} rows={8} className="w-full rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm" />
      </div>
    </div>
  );
}
