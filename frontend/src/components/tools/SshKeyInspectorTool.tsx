'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useEffect, useState } from 'react';
import { inspectSshPublicKey, type SshKeyDetails } from '@/lib/sshKeyInspector';

const SAMPLE_SSH_KEY =
  'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8g dev@company.com';

export default function SshKeyInspectorTool() {
  const { t } = useLanguage();
  const [key, setKey] = useState(SAMPLE_SSH_KEY);
  const [details, setDetails] = useState<SshKeyDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    inspectSshPublicKey(key)
      .then((res) => {
        if (!active) return;
        setDetails(res);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setDetails({
          isValid: false,
          error: err instanceof Error ? err.message : 'Failed to inspect SSH key.',
        });
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [key]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <textarea
          rows={6}
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full rounded-xl border border-slate-200 p-3 font-mono text-xs dark:border-white/10 dark:bg-slate-950"
        />
        {details && !details.isValid ? (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-600 dark:text-red-300">
            {details.error || 'Invalid OpenSSH public key'}
          </div>
        ) : (
          <div className="p-4 bg-indigo-500/10 rounded-xl text-xs space-y-1.5 font-mono">
            <p>
              <strong>{t('uiText.e1f7e162')}</strong>{' '}
              {loading && !details ? '...' : details?.keyType ?? '-'}
            </p>
            <p>
              <strong>Bits / Curve:</strong>{' '}
              {details?.keyLengthBits ? `${details.keyLengthBits}-bit` : '-'}
              {details?.curve ? ` (${details.curve})` : ''}
            </p>
            <p className="break-all">
              <strong>SHA-256 Fingerprint:</strong> {details?.fingerprintSha256 ?? '-'}
            </p>
            <p>
              <strong>{t('uiText.8958818c')}</strong> {details?.comment ?? '-'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
