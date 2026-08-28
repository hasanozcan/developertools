'use client';

import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { generateJsonSchema } from '@/lib/jsonToJsonSchema';

const SAMPLE_DATA = JSON.stringify({
  productId: 1045,
  name: "Wireless Mechanical Keyboard",
  price: 99.99,
  inStock: true,
  tags: ["gadgets", "ergonomic"],
  dimensions: { width: 35.5, height: 12.0 }
}, null, 2);

export default function JsonToJsonSchemaTool() {
  const [jsonInput, setJsonInput] = useState(SAMPLE_DATA);
  const schemaOutput = generateJsonSchema(jsonInput, '2020-12');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">JSON Payload</label>
            <button onClick={() => setJsonInput(SAMPLE_DATA)} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Load Sample</button>
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={14}
            className="w-full rounded-2xl border border-slate-200 bg-white p-3 font-mono text-xs shadow-inner dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Generated JSON Schema (2020-12)</label>
            <CopyButton text={schemaOutput} />
          </div>
          <pre className="h-72 overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-3 font-mono text-xs text-sky-400 dark:border-slate-700">
            {schemaOutput}
          </pre>
        </div>
      </div>
    </div>
  );
}
