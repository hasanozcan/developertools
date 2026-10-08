'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react';
import { buildOpenAiStructuredOutputSchema, SchemaProperty } from '@/lib/openaiStructuredOutputs';
import { Copy, Check, Plus, Trash2 } from 'lucide-react';

export default function OpenaiStructuredOutputsTool() {
  const { t } = useLanguage();
  const [name, setName] = useState('UserResponse');
  const [desc, setDesc] = useState('Structured user profile output');
  const [props, setProps] = useState<SchemaProperty[]>([
    { name: 'name', type: 'string', description: 'Full name of user' },
    { name: 'age', type: 'number', description: 'Age in years' },
    { name: 'is_active', type: 'boolean', description: 'Whether account is active' },
  ]);
  const [copied, setCopied] = useState(false);

  const schemaJson = buildOpenAiStructuredOutputSchema(name, desc, props);

  const addProp = () => {
    setProps([...props, { name: 'field_' + (props.length + 1), type: 'string' }]);
  };

  const removeProp = (idx: number) => {
    setProps(props.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t("uiText.732df11c")}</h3>
        <button
          onClick={() => { navigator.clipboard.writeText(schemaJson); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-500"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? t("uiText.8dc21305") : t("uiText.363de335")}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/50 p-4 dark:border-white/10 dark:bg-slate-900/40">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-slate-500">{t("uiText.92741da9")}</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950" />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-500">{t("tool.metaTags.description")}</label>
              <input value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full rounded-xl border border-slate-200 p-2 text-xs dark:border-white/10 dark:bg-slate-950" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{t("uiText.81c809fc")}</span>
              <button onClick={addProp} className="inline-flex items-center gap-1 text-xs text-indigo-600 font-semibold hover:underline">
                <Plus className="h-3.5 w-3.5" /> {t("uiText.bf46c66d")}</button>
            </div>

            {props.map((p, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  value={p.name}
                  onChange={(e) => { const cp = [...props]; cp[i].name = e.target.value; setProps(cp); }}
                  placeholder={t("tool.curl.namePlaceholder")}
                  className="flex-1 rounded-lg border border-slate-200 p-1.5 text-xs dark:border-white/10 dark:bg-slate-950"
                />
                <select
                  value={p.type}
                  onChange={(e) => { const cp = [...props]; cp[i].type = e.target.value as any; setProps(cp); }}
                  className="rounded-lg border border-slate-200 p-1.5 text-xs dark:border-white/10 dark:bg-slate-950"
                >
                  <option value="string">{t("uiText.17c16538")}</option>
                  <option value="number">{t("uiText.1bd670a0")}</option>
                  <option value="boolean">{t("uiText.65f46ebf")}</option>
                  <option value="array">{t("uiText.8a58ad26")}</option>
                </select>
                <button onClick={() => removeProp(i)} className="text-red-500 hover:text-red-600 p-1">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <pre className="h-[300px] overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 dark:border-white/10">
          {schemaJson}
        </pre>
      </div>
    </div>
  );
}
