'use client';
import React, { useState, useMemo } from 'react';
import { validateJwtStructure } from '@/lib/jwtSignatureValidator';

export default function JwtSignatureValidatorTool() {
  const [jwt, setJwt] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.signature');
  const res = useMemo(() => validateJwtStructure(jwt), [jwt]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <textarea rows={4} value={jwt} onChange={(e) => setJwt(e.target.value)} className="w-full rounded-xl border p-3 font-mono text-xs" />
        <div className="p-4 bg-indigo-500/10 rounded-xl text-xs">
          <p><strong>Valid JWT Structure:</strong> {res.isValidStructure ? 'YES' : 'NO'}</p>
        </div>
      </div>
    </div>
  );
}
