'use client';
import React, { useState, useMemo } from 'react';
import { inspectPemCertificate } from '@/lib/sslCertificateInspector';

export default function SslCertificateInspectorTool() {
  const [cert, setCert] = useState('-----BEGIN CERTIFICATE-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0...\n-----END CERTIFICATE-----');
  const details = useMemo(() => inspectPemCertificate(cert), [cert]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <textarea rows={6} value={cert} onChange={(e) => setCert(e.target.value)} className="w-full rounded-xl border p-3 font-mono text-xs" />
        <div className="p-4 bg-indigo-500/10 rounded-xl text-xs space-y-1">
          <p><strong>Valid PEM:</strong> {details.isValidPem ? 'YES' : 'NO'}</p>
          <p><strong>Common Name:</strong> {details.commonName || '-'}</p>
          <p><strong>Issuer:</strong> {details.issuer || '-'}</p>
        </div>
      </div>
    </div>
  );
}
