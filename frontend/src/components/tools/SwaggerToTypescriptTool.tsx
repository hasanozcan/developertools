'use client';

import React, { useState } from 'react';
import CopyButton from '@/components/common/CopyButton';
import { convertOpenApiToTypeScript } from '@/lib/swaggerToTypescript';

const SAMPLE_SWAGGER = JSON.stringify({
  openapi: "3.0.0",
  info: { title: "PetStore API", version: "1.0.0" },
  components: {
    schemas: {
      User: {
        type: "object",
        required: ["id", "username"],
        properties: {
          id: { type: "integer" },
          username: { type: "string" },
          email: { type: "string" },
          role: { type: "string", enum: ["admin", "member", "guest"] }
        }
      }
    }
  },
  paths: {
    "/users": {
      get: { operationId: "listUsers" }
    }
  }
}, null, 2);

export default function SwaggerToTypescriptTool() {
  const [input, setInput] = useState(SAMPLE_SWAGGER);
  const output = convertOpenApiToTypeScript(input);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Swagger / OpenAPI JSON Schema</label>
            <button onClick={() => setInput(SAMPLE_SWAGGER)} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Load Sample</button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={16}
            className="w-full rounded-2xl border border-slate-200 bg-white p-3 font-mono text-xs shadow-inner dark:border-slate-700 dark:bg-slate-900"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Generated TypeScript Client & Interfaces</label>
            <CopyButton text={output} />
          </div>
          <pre className="h-80 overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-3 font-mono text-xs text-emerald-400 dark:border-slate-700">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}
