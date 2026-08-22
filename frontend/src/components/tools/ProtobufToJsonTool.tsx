'use client';
import React, { useState, useMemo } from 'react';
import { protobufToJsonSchema } from '@/lib/protobufToJson';

export default function ProtobufToJsonTool() {
  const [proto, setProto] = useState('syntax = "proto3";\nmessage SearchRequest {\n  string query = 1;\n  int32 page_number = 2;\n  bool is_active = 3;\n}');
  const output = useMemo(() => protobufToJsonSchema(proto), [proto]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea rows={12} value={proto} onChange={(e) => setProto(e.target.value)} className="rounded-xl border p-3 font-mono text-xs" />
        <textarea readOnly rows={12} value={output} className="rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
