'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, FileCode } from 'lucide-react';
import { convertJsonToPydantic } from '@/lib/jsonToPythonPydantic';

export default function JsonToPythonPydanticTool() {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(
      {
        id: 101,
        username: 'alex_dev',
        email: 'alex@example.com',
        isActive: true,
        stats: {
          points: 940,
          rank: 'Gold',
        },
        tags: ['python', 'fastapi', 'ai'],
      },
      null,
      2
    )
  );
  const [rootModel, setRootModel] = useState('User');
  const [copied, setCopied] = useState(false);

  const pythonOutput = useMemo(() => {
    if (!jsonInput.trim()) return '';
    try {
      return convertJsonToPydantic(jsonInput, rootModel);
    } catch (err: any) {
      return '# Error converting JSON: ' + err.message;
    }
  }, [jsonInput, rootModel]);

  const handleCopy = () => {
    navigator.clipboard.writeText(pythonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-xs text-muted-foreground font-medium">Root Model Name:</label>
          <input
            type="text"
            value={rootModel}
            onChange={(e) => setRootModel(e.target.value)}
            className="input input-bordered input-sm font-medium w-40"
          />
        </div>
        <button onClick={handleCopy} className="btn btn-primary btn-sm gap-2">
          {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy Pydantic V2 Code'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">JSON Input:</label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="textarea textarea-bordered w-full h-96 font-mono text-xs leading-relaxed"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Pydantic V2 Models Output:
          </label>
          <textarea
            readOnly
            value={pythonOutput}
            className="textarea textarea-bordered w-full h-96 font-mono text-xs leading-relaxed bg-muted/40 text-foreground"
          />
        </div>
      </div>
    </div>
  );
}
