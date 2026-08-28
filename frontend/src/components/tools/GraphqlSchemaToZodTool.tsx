'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Code2 } from 'lucide-react';
import { convertGraphqlToZod } from '@/lib/graphqlSchemaToZod';

export default function GraphqlSchemaToZodTool() {
  const [sdlInput, setSdlInput] = useState(
    `enum Role {\n  ADMIN\n  USER\n  GUEST\n}\n\ntype User {\n  id: ID!\n  name: String!\n  email: String\n  age: Int\n  roles: [Role!]!\n}`
  );
  const [copied, setCopied] = useState(false);

  const zodOutput = useMemo(() => {
    if (!sdlInput.trim()) return '';
    try {
      return convertGraphqlToZod(sdlInput);
    } catch (err: any) {
      return '// Error parsing GraphQL SDL: ' + err.message;
    }
  }, [sdlInput]);

  const handleCopy = () => {
    navigator.clipboard.writeText(zodOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={handleCopy} className="btn btn-primary btn-sm gap-2">
          {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy TypeScript Zod Schema'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            GraphQL SDL (Schema Definition Language):
          </label>
          <textarea
            value={sdlInput}
            onChange={(e) => setSdlInput(e.target.value)}
            placeholder="type User { ... }"
            className="textarea textarea-bordered w-full h-96 font-mono text-xs leading-relaxed"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Generated Zod TypeScript Schema & Types:
          </label>
          <textarea
            readOnly
            value={zodOutput}
            className="textarea textarea-bordered w-full h-96 font-mono text-xs leading-relaxed bg-muted/40 text-foreground"
          />
        </div>
      </div>
    </div>
  );
}
