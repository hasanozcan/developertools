'use client';
import React, { useState, useMemo } from 'react';
import { Code2, Copy, Check } from 'lucide-react';
import { jsonToOpenAIFunctionSchema } from '@/lib/openaiFunctionSchema';

export default function OpenaiFunctionSchemaTool() {
  const [jsonInput, setJsonInput] = useState('{\n  "location": "San Francisco, CA",\n  "temperature_unit": "celsius",\n  "days": 5\n}');
  const [functionName, setFunctionName] = useState('get_weather_forecast');
  const [description, setDescription] = useState('Retrieve weather forecast data for a specified location');
  const [copied, setCopied] = useState(false);

  const schemaOutput = useMemo(() => {
    try {
      return jsonToOpenAIFunctionSchema(jsonInput, { functionName, description, strict: true });
    } catch (err: unknown) {
      return '// ' + (err instanceof Error ? err.message : String(err));
    }
  }, [jsonInput, functionName, description]);

  const handleCopy = () => {
    navigator.clipboard.writeText(schemaOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="surface-card rounded-2xl p-5 space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">Function Parameters (JSON)</h3>
          <input
            type="text"
            value={functionName}
            onChange={(e) => setFunctionName(e.target.value)}
            placeholder="Function Name"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-mono dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Function Description"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
          />
          <textarea
            rows={10}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs text-slate-900 shadow-inner dark:border-white/10 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>
        <div className="surface-card rounded-2xl p-5 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">OpenAI Tool Schema</h3>
            <button onClick={handleCopy} className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Schema'}
            </button>
          </div>
          <textarea
            readOnly
            rows={14}
            value={schemaOutput}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-900 p-3 font-mono text-xs text-emerald-400 dark:border-white/10 dark:bg-slate-950"
          />
        </div>
      </div>
    </div>
  );
}
