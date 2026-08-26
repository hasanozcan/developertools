'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, FileText, ArrowUp, ArrowDown, Trash2, Combine, CheckCircle2 } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { reorderPdfList, type PdfFileItem } from '@/lib/pdfMerger';
import { formatFileSize } from '@/lib/imageCompressor';

export default function PdfMergerTool() {
  const [files, setFiles] = useState<PdfFileItem[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [mergedUrl, setMergedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const newItems: PdfFileItem[] = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const buffer = await file.arrayBuffer();
      const uint8 = new Uint8Array(buffer);

      let pageCount = 1;
      try {
        const doc = await PDFDocument.load(uint8, { ignoreEncryption: true });
        pageCount = doc.getPageCount();
      } catch {
        // Fallback page count
      }

      newItems.push({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        name: file.name,
        size: file.size,
        data: uint8,
        pageCount,
      });
    }

    setFiles((prev) => [...prev, ...newItems]);
    setMergedUrl(null);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setFiles(reorderPdfList(files, index, index - 1));
    setMergedUrl(null);
  };

  const moveDown = (index: number) => {
    if (index === files.length - 1) return;
    setFiles(reorderPdfList(files, index, index + 1));
    setMergedUrl(null);
  };

  const removeFile = (id: string) => {
    setFiles(files.filter((f) => f.id !== id));
    setMergedUrl(null);
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setIsMerging(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of files) {
        const pdf = await PDFDocument.load(item.data);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setMergedUrl(url);
    } catch (err) {
      console.error('Merge error:', err);
    } finally {
      setIsMerging(false);
    }
  };

  const handleDownload = () => {
    if (!mergedUrl) return;
    const link = document.createElement('a');
    link.href = mergedUrl;
    link.download = 'merged-document.pdf';
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-8 text-center cursor-pointer hover:border-indigo-500 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition flex flex-col items-center justify-center space-y-3"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleFileUpload}
          className="hidden"
        />
        <div className="p-3.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-2xl">
          <Combine className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
            Click to Upload or Drag & Drop PDF Files
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Combine multiple PDF files into one. 100% private, runs entirely inside your browser.
          </p>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Files to Merge ({files.length})
            </span>
            <button
              onClick={() => setFiles([])}
              className="text-xs text-red-500 hover:underline"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-xl">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                      {index + 1}. {file.name}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {file.pageCount} {file.pageCount === 1 ? 'page' : 'pages'} • {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    disabled={index === 0}
                    onClick={() => moveUp(index)}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30"
                    title="Move Up"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    disabled={index === files.length - 1}
                    onClick={() => moveDown(index)}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30"
                    title="Move Down"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                    title="Remove"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
            <span className="text-xs text-slate-600 dark:text-slate-400">
              Total Pages: {files.reduce((acc, f) => acc + (f.pageCount || 1), 0)}
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={handleMerge}
                disabled={files.length < 2 || isMerging}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition shadow-sm disabled:opacity-50"
              >
                <Combine className="h-4 w-4" />
                {isMerging ? 'Merging PDFs...' : 'Merge All PDFs'}
              </button>

              {mergedUrl && (
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition shadow-sm"
                >
                  <Download className="h-4 w-4" /> Download Merged PDF
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
