'use client';
import React, { useState, useMemo } from 'react';
import { buildPostgresUri } from '@/lib/postgresConnectionBuilder';

export default function PostgresConnectionBuilderTool() {
  const [host, setHost] = useState('localhost');
  const [port, setPort] = useState(5432);
  const [user, setUser] = useState('postgres');
  const [password, setPassword] = useState('password');
  const [database, setDatabase] = useState('app_production');

  const uri = useMemo(() => buildPostgresUri({ host, port, user, password, database, sslMode: 'require' }), [host, port, user, password, database]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <input type="text" placeholder="Host" value={host} onChange={(e) => setHost(e.target.value)} className="rounded-xl border p-2 text-xs" />
          <input type="number" placeholder="Port" value={port} onChange={(e) => setPort(Number(e.target.value))} className="rounded-xl border p-2 text-xs" />
          <input type="text" placeholder="Database" value={database} onChange={(e) => setDatabase(e.target.value)} className="rounded-xl border p-2 text-xs" />
          <input type="text" placeholder="User" value={user} onChange={(e) => setUser(e.target.value)} className="rounded-xl border p-2 text-xs" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-xl border p-2 text-xs" />
        </div>
        <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400">
          <p>{uri}</p>
        </div>
      </div>
    </div>
  );
}
