'use client';

import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { convertProtobufToJsonSchema } from '@/lib/protobufToJsonSchema';

const SAMPLE = "message UserProfile {\n  int64 id = 1;\n  string full_name = 2;\n  repeated string roles = 3;\n}";

export default function ProtobufToJsonSchemaTool() {
  const [input, setInput] = useState(SAMPLE);
  let output = '';
  let error = '';

  try {
    output = convertProtobufToJsonSchema(input);
  } catch (e: any) {
    error = e.message || 'Conversion error';
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Protobuf 3 Definition</label>
            <button onClick={() => setInput(SAMPLE)} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Load Sample</button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={14}
            className="w-full rounded-2xl border border-slate-200 bg-white p-3 font-mono text-xs shadow-inner dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">JSON Schema Draft-07</label>
            <CopyButton text={output} />
          </div>
          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 font-mono text-xs text-red-600 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400">
              {error}
            </div>
          ) : (
            <textarea
              value={output}
              readOnly
              rows={14}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs shadow-inner dark:border-slate-700 dark:bg-slate-900/70"
            />
          )}
        </div>
      </div>
    </div>
  );
}
