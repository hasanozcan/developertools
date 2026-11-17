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
      ? 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950/30 dark:border-green-800'
      : analysis.grade === 'B' || analysis.grade === 'C'
      ? 'text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/30 dark:border-amber-800'
      : 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/30 dark:border-red-800';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`p-4 rounded-xl border flex flex-col items-center justify-center ${gradeColor}`}>
          <span className="text-xs uppercase tracking-wider font-semibold">{t("uiText.ff591150")}</span>
          <span className="text-4xl font-extrabold my-1">{analysis.grade}</span>
          <span className="text-xs">{interpolateText(t('tool.httpSecurity.score'), { score: analysis.score })}</span>
        </div>

        <div className="p-4 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold text-sm">
            <CheckCircle2 className="w-4 h-4" /> {t("uiText.f1b48f9a")}</div>
          <span className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{analysis.passedCount}</span>
        </div>

        <div className="p-4 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
            <AlertTriangle className="w-4 h-4" /> {t("tool.openapi.warnings")}</div>
          <span className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{analysis.warningCount}</span>
        </div>

        <div className="p-4 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold text-sm">
            <XCircle className="w-4 h-4" /> {t("uiText.f4dc8149")}</div>
          <span className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{analysis.failedCount}</span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("uiText.4750d6a2")}</label>
        <textarea
          value={headersText}
          onChange={(e) => setHeadersText(e.target.value)}
          placeholder={t("uiText.df44da93")}
          className="w-full h-36 rounded-lg border border-gray-300 bg-white px-3 py-2.5 font-mono text-xs text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {t("uiText.9f97fdf4")}</h3>
        <div className="space-y-2">
          {analysis.checks.map((check, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800/60 flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {check.status === 'Pass' && <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />}
                  {check.status === 'Warning' && <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                  {check.status === 'Fail' && <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />}
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">{check.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    {check.category}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{check.recommendation}</p>
                {check.value && (
                  <p className="text-xs font-mono text-primary-600 dark:text-primary-400 truncate max-w-xl">
                    {t("uiText.c44d78f0")} {check.value}
                  </p>
                )}
              </div>
              <a
                href={check.documentation}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-primary-600 transition-colors hover:bg-gray-100 dark:text-primary-400 dark:hover:bg-gray-700 self-start md:self-auto"
              >
                {t("uiText.8fcacbf2")} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
