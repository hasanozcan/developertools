'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { buildGitCommand } from '@/lib/gitCommandBuilder';

export default function GitCommandBuilderTool() {
  const { t } = useLanguage();
  const [action, setAction] = useState<'rebase' | 'reset'>('rebase');
  const cmd = useMemo(() => buildGitCommand({ action, args: { branch: 'main' } }), [action]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <select value={action} onChange={(e) => setAction(e.target.value as any)} className="rounded-xl border p-2 text-xs">
          <option value="rebase">{t("uiText.c8b7ce41")}</option>
          <option value="reset">{t("uiText.972bb83c")}</option>
        </select>
        <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400">{cmd}</div>
      </div>
    </div>
  );
}
