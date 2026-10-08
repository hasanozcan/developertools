'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { generateClickhouseDdl } from '@/lib/clickhouseDdlGenerator';

const defaultColumns = [
  { name: 'event_id', type: 'UUID' },
  { name: 'user_id', type: 'UInt64' },
  { name: 'event_type', type: 'LowCardinality(String)' },
  { name: 'timestamp', type: 'DateTime64(3)' },
];

export default function ClickhouseDdlGeneratorTool() {
  const { t } = useLanguage();
  const [tableName, setTableName] = useState('analytics_events');
  const [orderBy, setOrderBy] = useState('event_type, timestamp');
  const [copied, setCopied] = useState(false);

  const ddl = useMemo(() => generateClickhouseDdl(tableName, defaultColumns, orderBy), [tableName, orderBy]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground">{t("uiText.e5ac6eae")}</label>
          <input value={tableName} onChange={(e) => setTableName(e.target.value)} className="w-full p-2.5 rounded-lg border border-border bg-card font-mono text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">{t("uiText.0824109b")}</label>
          <input value={orderBy} onChange={(e) => setOrderBy(e.target.value)} className="w-full p-2.5 rounded-lg border border-border bg-card font-mono text-sm" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">{t("uiText.8743715a")}</label>
          <button onClick={() => { navigator.clipboard.writeText(ddl); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-secondary">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? t("uiText.8dc21305") : t("common.copy")}
          </button>
        </div>
        <textarea readOnly value={ddl} rows={8} className="w-full rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm" />
      </div>
    </div>
  );
}
