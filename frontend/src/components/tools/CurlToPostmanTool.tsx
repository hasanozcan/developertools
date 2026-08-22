'use client';
import React, { useState, useMemo } from 'react';
import { curlToPostmanCollection } from '@/lib/curlToPostman';

export default function CurlToPostmanTool() {
  const [curl, setCurl] = useState('curl -X POST https://api.example.com/login -H "Content-Type: application/json" --data "{\\"user\\":\\"test\\"}"');
  const postman = useMemo(() => curlToPostmanCollection(curl), [curl]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea rows={12} value={curl} onChange={(e) => setCurl(e.target.value)} className="rounded-xl border p-3 font-mono text-xs" />
        <textarea readOnly rows={12} value={postman} className="rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
