'use client';

import { useLanguage } from '@/context/LanguageContext';
import { interpolateText } from '@/lib/localizedText';
import React, { useState, useMemo } from 'react';
import { ShieldCheck, ShieldAlert, Shield, CheckCircle2, AlertTriangle, XCircle, ExternalLink } from 'lucide-react';
import { analyzeSecurityHeaders } from '@/lib/httpSecurityHeadersAnalyzer';

export default function HttpSecurityHeadersAnalyzerTool() {
  const { t } = useLanguage();
  const [headersText, setHeadersText] = useState(
    `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload\nContent-Security-Policy: default-src 'self'\nX-Frame-Options: DENY\nX-Content-Type-Options: nosniff\nReferrer-Policy: strict-origin-when-cross-origin\nPermissions-Policy: camera=(), microphone=()`
  );

  const analysis = useMemo(() => {
    return analyzeSecurityHeaders(headersText);
  }, [headersText]);

  const gradeColor =
    analysis.grade === 'A+' || analysis.grade === 'A'
      ? 'text-success bg-success/10 border-success/30'
      : analysis.grade === 'B' || analysis.grade === 'C'
      ? 'text-warning bg-warning/10 border-warning/30'
      : 'text-error bg-error/10 border-error/30';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`p-4 rounded-xl border flex flex-col items-center justify-center ${gradeColor}`}>
          <span className="text-xs uppercase tracking-wider font-semibold">{t("uiText.ff591150")}</span>
          <span className="text-4xl font-extrabold my-1">{analysis.grade}</span>
          <span className="text-xs">{interpolateText(t('tool.httpSecurity.score'), { score: analysis.score })}</span>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card flex flex-col justify-center">
          <div className="flex items-center gap-2 text-success font-semibold text-sm">
            <CheckCircle2 className="w-4 h-4" /> {t("uiText.f1b48f9a")}</div>
          <span className="text-2xl font-bold mt-1">{analysis.passedCount}</span>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card flex flex-col justify-center">
          <div className="flex items-center gap-2 text-warning font-semibold text-sm">
            <AlertTriangle className="w-4 h-4" /> {t("tool.openapi.warnings")}</div>
          <span className="text-2xl font-bold mt-1">{analysis.warningCount}</span>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card flex flex-col justify-center">
          <div className="flex items-center gap-2 text-error font-semibold text-sm">
            <XCircle className="w-4 h-4" /> {t("uiText.f4dc8149")}</div>
          <span className="text-2xl font-bold mt-1">{analysis.failedCount}</span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-muted-foreground">
          {t("uiText.4750d6a2")}</label>
        <textarea
          value={headersText}
          onChange={(e) => setHeadersText(e.target.value)}
          placeholder={t("uiText.df44da93")}
          className="textarea textarea-bordered w-full h-36 font-mono text-xs"
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {t("uiText.9f97fdf4")}</h3>
        <div className="space-y-2">
          {analysis.checks.map((check, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border border-border bg-card/60 flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {check.status === 'Pass' && <CheckCircle2 className="w-4 h-4 text-success" />}
                  {check.status === 'Warning' && <AlertTriangle className="w-4 h-4 text-warning" />}
                  {check.status === 'Fail' && <XCircle className="w-4 h-4 text-error" />}
                  <span className="font-semibold text-sm text-foreground">{check.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    {check.category}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{check.recommendation}</p>
                {check.value && (
                  <p className="text-xs font-mono text-primary/90 truncate max-w-xl">
                    {t("uiText.c44d78f0")}{check.value}
                  </p>
                )}
              </div>
              <a
                href={check.documentation}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost btn-xs gap-1 text-primary self-start md:self-auto"
              >
                {t("uiText.8fcacbf2")}<ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
