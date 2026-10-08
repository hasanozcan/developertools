'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { simulateEd25519Keypair } from '@/lib/ed25519KeyGenerator';

export default function Ed25519KeyGeneratorTool() {
  const { t } = useLanguage();
  const [keys, setKeys] = useState(() => simulateEd25519Keypair());
  const [copied, setCopied] = useState(false);

  const regenerate = () => setKeys(simulateEd25519Keypair());

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={regenerate} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
          <RefreshCw className="w-4 h-4" />
          {t("uiText.492c86cf")}</button>
      </div>
      <div className="space-y-4">
        <div className="p-4 rounded-xl border border-border bg-card space-y-2">
          <div className="text-xs text-muted-foreground font-semibold">{t("uiText.147ee05c")}</div>
          <div className="font-mono text-sm text-primary break-all">{keys.publicKeyHex}</div>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card space-y-2">
          <div className="text-xs text-muted-foreground font-semibold">{t("uiText.d7a8cc36")}</div>
          <div className="font-mono text-sm text-rose-400 break-all">{keys.privateKeyHex}</div>
        </div>
      </div>
    </div>
  );
}
