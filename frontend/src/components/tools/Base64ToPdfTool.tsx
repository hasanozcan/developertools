'use client';

import React, { useState } from 'react';
import { FileText, Download, Upload, Eye } from 'lucide-react';
import { cleanBase64PdfString, base64ToPdfBlob } from '@/lib/base64ToPdf';
import { useLanguage } from '@/context/LanguageContext';

// Sample minimal valid PDF in Base64 (%PDF-1.4 sample)
const SAMPLE_BASE64_PDF = `JVBERi0xLjQKJcOkw7zDtsOfCjIgMCBvYmoKPDwKL0xlbmd0aCA4MAovRmlsdGVyIC9GbGF0ZURl
Y29kZQo+PgpzdHJlYW0KeJzLSM3JyVcozy/KSVECshQ8EktSU3SLU/P0gEJF2fkpmXppChWpuUp5
iUkZCsWZeekA66ERWwplbmRzdHJlYW0KZW5kb2JqCjEgMCBvYmoKPDwKL1R5cGUgL0NhYXRhbG9n
Ci9QYWdlcyAzIDAgUgo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvUGFnZXMKL0NvdW50IDEK
L0tpZHMgWyA0IDAgUiBdCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9QYXJlbnQg
MyAwIFIKL1Jlc291cmNlcyA8PAovRm9udCA8PAovRjEgNSAwIFIKPj4KPj4KL01lZGlhQm94IFsg
MCAwIDIwMCAxMDAgXQovQ29udGVudHMgMiAwIFIKPj4KZW5kb2JqCjUgMCBvYmoKPDwKL1R5cGUg
L0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iagp4cmVm
CjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAxMzQgMDAwMDAgbiAKMDAwMDAwMDAxNSAw
MDAwMCBuIAowMDAwMDAwMTgzIDAwMDAwIGbiAKMDAwMDAwMDI0MCAwMDAwMCBuIAowMDAwMDAwMzU2
IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDE4
CiUlRU9GCg==`;

export default function Base64ToPdfTool() {
  const { t } = useLanguage();
  const [base64Input, setBase64Input] = useState(SAMPLE_BASE64_PDF);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePreviewPdf = () => {
    setError(null);
    try {
      const cleaned = cleanBase64PdfString(base64Input);
      if (!cleaned) {
        setError('Please provide a Base64 string.');
        return;
      }

      const blob = base64ToPdfBlob(cleaned);
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch {
      setError('Invalid Base64 PDF data string.');
    }
  };

  const handleDownload = () => {
    try {
      const cleaned = cleanBase64PdfString(base64Input);
      const blob = base64ToPdfBlob(cleaned);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError('Could not download PDF. Check your base64 string.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setBase64Input(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="surface-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('tool.b64pdf.title') || 'Base64 to PDF Decoder & Viewer'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Text File</span>
            <input type="file" accept=".txt,.b64" onChange={handleFileUpload} className="hidden" />
          </label>
          <button
            onClick={handlePreviewPdf}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview PDF</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Grid: Editor + PDF Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Base64 Input */}
        <div className="surface-card rounded-2xl p-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Base64 String or Data URI
            </span>
            <button
              onClick={() => {
                setBase64Input(SAMPLE_BASE64_PDF);
                setError(null);
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              {t('common.loadSample') || 'Load Sample'}
            </button>
          </div>
          <textarea
            value={base64Input}
            onChange={(e) => setBase64Input(e.target.value)}
            rows={14}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 resize-y"
            placeholder="Paste your base64 string or data:application/pdf;base64,... here"
          />
        </div>

        {/* Live PDF Viewer */}
        <div className="surface-card rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              PDF Document Viewer
            </span>
            {pdfUrl && (
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-400/10 dark:text-indigo-300"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            )}
          </div>

          <div className="flex-1 min-h-[300px] rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
            {pdfUrl ? (
              <iframe src={pdfUrl} className="w-full h-full min-h-[300px] border-0" title="PDF Preview" />
            ) : (
              <div className="p-8 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
                <FileText className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                <span>Click &quot;Preview PDF&quot; to render the document</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
