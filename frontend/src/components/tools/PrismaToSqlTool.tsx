'use client';
import React, { useState, useMemo } from 'react';
import { prismaToSql } from '@/lib/prismaToSql';

export default function PrismaToSqlTool() {
  const [prisma, setPrisma] = useState('model User {\n  id    Int     @id @default(autoincrement())\n  email String  @unique\n  name  String?\n}');
  const sql = useMemo(() => prismaToSql(prisma), [prisma]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea rows={12} value={prisma} onChange={(e) => setPrisma(e.target.value)} className="rounded-xl border p-3 font-mono text-xs" />
        <textarea readOnly rows={12} value={sql} className="rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
