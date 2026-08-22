'use client';
import React, { useState, useMemo } from 'react';
import { generateUuidV7 } from '@/lib/uuidV7Generator';

export default function UuidV7GeneratorTool() {
  const [uuids, setUuids] = useState<string[]>([generateUuidV7(), generateUuidV7(), generateUuidV7()]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <button onClick={() => setUuids([generateUuidV7(), generateUuidV7(), generateUuidV7(), generateUuidV7(), generateUuidV7()])} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">Generate UUIDv7 (Time-Ordered)</button>
        <div className="space-y-2">
          {uuids.map((u, i) => (
            <div key={i} className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400">{u}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
