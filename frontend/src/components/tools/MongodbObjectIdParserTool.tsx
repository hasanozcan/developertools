'use client';
import React, { useState, useMemo } from 'react';
import { parseMongoObjectId } from '@/lib/mongodbObjectIdParser';

export default function MongodbObjectIdParserTool() {
  const [id, setId] = useState('507f1f77bcf86cd799439011');
  const res = useMemo(() => parseMongoObjectId(id), [id]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} className="w-full rounded-xl border p-2.5 font-mono text-xs" />
        {res.isValid && (
          <div className="p-4 bg-indigo-500/10 rounded-xl space-y-1 text-xs">
            <p><strong>Created:</strong> {res.isoString}</p>
            <p><strong>Machine ID:</strong> {res.machineIdentifier}</p>
            <p><strong>Process ID:</strong> {res.processId}</p>
          </div>
        )}
      </div>
    </div>
  );
}
