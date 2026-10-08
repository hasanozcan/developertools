'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { inspectMcpMessage } from '@/lib/mcpInspector';

export default function McpInspectorTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState(JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list', params: {} }, null, 2));
  const result = useMemo(() => inspectMcpMessage(input), [input]);

  return (
    <div className="space-y-6">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        className="w-full rounded-xl border border-border bg-card p-4 font-mono text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <div className="p-4 rounded-xl border border-border bg-card space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{t("uiText.ca77496f")}</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${result.isValid ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
            {result.isValid ? t("uiText.a56e15da") : t("uiText.61a58c50")}
          </span>
        </div>
        <div className="text-sm">{t("uiText.e116f8f5") + ' '}<span className="font-mono text-primary">{result.type}</span></div>
        {result.method && <div className="text-sm">{t("uiText.b23febde") + ' '}<span className="font-mono">{result.method}</span></div>}
        {result.errors.length > 0 && (
          <ul className="text-xs text-rose-400 list-disc list-inside space-y-1">
            {result.errors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}
