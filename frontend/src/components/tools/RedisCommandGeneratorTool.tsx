'use client';
import React, { useState, useMemo } from 'react';
import { generateRedisCommand } from '@/lib/redisCommandGenerator';

export default function RedisCommandGeneratorTool() {
  const [key, setKey] = useState('user:1001');
  const [val, setVal] = useState('Alice');
  const cmd = useMemo(() => generateRedisCommand('HSET', key, { field: 'name', value: val }), [key, val]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" value={key} onChange={(e) => setKey(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <input type="text" value={val} onChange={(e) => setVal(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400">{cmd}</div>
      </div>
    </div>
  );
}
