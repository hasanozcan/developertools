'use client';
import { useLanguage } from '@/context/LanguageContext';
import React, { useState, useMemo } from 'react';
import { validateKubeconfig } from '@/lib/kubeconfigValidator';

export default function KubeconfigValidatorTool() {
  const { t } = useLanguage();
  const [yaml, setYaml] = useState('apiVersion: v1\nkind: Config\ncurrent-context: prod\nclusters:\n- cluster:\n    server: https://10.0.0.1\n  name: prod');
  const res = useMemo(() => validateKubeconfig(yaml), [yaml]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <textarea rows={6} value={yaml} onChange={(e) => setYaml(e.target.value)} className="w-full rounded-xl border p-3 font-mono text-xs" />
        <div className="p-4 bg-emerald-500/10 rounded-xl text-xs">
          <p><strong>{t("uiText.3702e2f6")}</strong> {res.isValid ? t("uiText.9355e4f0") : t("uiText.41e68bba")}</p>
          <p><strong>{t("uiText.2cd42af9")}</strong> {res.currentContext || t("uiText.304ff7fb")}</p>
        </div>
      </div>
    </div>
  );
}
