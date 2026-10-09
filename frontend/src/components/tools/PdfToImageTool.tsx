'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useState } from 'react';
import { FileText, Download, Sliders } from 'lucide-react';
import { parsePageRange, calculatePdfRenderScale } from '@/lib/pdfToImage';

export default function PdfToImageTool() {
  const { t } = useLanguage();
  const [totalPages, setTotalPages] = useState(5);
  const [pageRange, setPageRange] = useState('1-3, 5');
  const [dpi, setDpi] = useState(150);
  const [format, setFormat] = useState<'png' | 'jpg'>('png');

  const selectedPages = parsePageRange(pageRange, totalPages);
  const scale = calculatePdfRenderScale(dpi);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 sm:p-6 dark:border-white/10 dark:bg-slate-900/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">{t("uiText.ffcf6280")}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t("uiText.31a67e5a")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">{t("uiText.97882b18")}</label>
            <input type="text" value={pageRange} onChange={(e) => setPageRange(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs dark:border-slate-700 dark:bg-slate-800" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">{t("uiText.0d1a476e") + ' '}{dpi} {' ' + t("uiText.4e73ff28")}{scale.toFixed(1)}x)</label>
            <select value={dpi} onChange={(e) => setDpi(Number(e.target.value))} className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs dark:border-slate-700 dark:bg-slate-800">
              <option value={72}>{t("uiText.554a50e3")}</option>
              <option value={150}>{t("uiText.c5c135bf")}</option>
              <option value={300}>{t("uiText.a2f65694")}</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">{t("uiText.46305f1d")}</label>
            <select value={format} onChange={(e) => setFormat(e.target.value as 'png' | 'jpg')} className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs dark:border-slate-700 dark:bg-slate-800">
              <option value="png">{t("uiText.1004f9bb")}</option>
              <option value="jpg">{t("uiText.52898488")}</option>
            </select>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <span className="text-xs text-slate-600 dark:text-slate-300">
            {t("tool.regexTester.selected")} <strong>{selectedPages.length}</strong> {' ' + t("uiText.42ba2ee2")}{selectedPages.join(', ')}]
          </span>
          <button onClick={() => alert('Converted ' + selectedPages.length + ' pages to ' + format.toUpperCase())} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition">
            <Download className="w-4 h-4" /> {t("uiText.3911ddeb")}</button>
        </div>
      </div>
    </div>
  );
}
