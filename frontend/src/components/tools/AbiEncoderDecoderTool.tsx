'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { encodeAbiParams } from '@/lib/abiEncoderDecoder';

export default function AbiEncoderDecoderTool() {
  const { t } = useLanguage();
  const [fnName, setFnName] = useState('transfer');
  const [types, setTypes] = useState('address, uint256');
  const [values, setValues] = useState('0x1234567890123456789012345678901234567890, 1000000000000000000');
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    try {
      const typeList = types.split(',').map(s => s.trim()).filter(Boolean);
      const valList = values.split(',').map(s => s.trim()).filter(Boolean);
      return encodeAbiParams(fnName, typeList, valList);
    } catch (e: any) {
      return 'Error: ' + e.message;
    }
  }, [fnName, types, values]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs text-muted-foreground">{t("uiText.78f50ff0")}</label>
          <input value={fnName} onChange={(e) => setFnName(e.target.value)} className="w-full p-2.5 rounded-lg border border-border bg-card font-mono text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">{t("uiText.d6e6e4c5")}</label>
          <input value={types} onChange={(e) => setTypes(e.target.value)} className="w-full p-2.5 rounded-lg border border-border bg-card font-mono text-sm" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">{t("uiText.9bb83c7c")}</label>
          <input value={values} onChange={(e) => setValues(e.target.value)} className="w-full p-2.5 rounded-lg border border-border bg-card font-mono text-sm" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">{t("uiText.11155a6e")}</label>
          <button onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-secondary">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? t("uiText.8dc21305") : t("common.copy")}
          </button>
        </div>
        <textarea readOnly value={result} rows={6} className="w-full rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm" />
      </div>
    </div>
  );
}
