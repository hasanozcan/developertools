'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, ArrowUp, ArrowDown, Trash2, FileCheck, Layers } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import {
  getPageDimensions,
  calculateFittedImageSize,
  type ImageToPdfItem,
  type PageFormat,
  type PageOrientation,
  type MarginOption,
} from '@/lib/imagesToPdf';
import { reorderPdfList } from '@/lib/pdfMerger';

export default function ImagesToPdfTool() {
  const [images, setImages] = useState<ImageToPdfItem[]>([]);
  const [pageFormat, setPageFormat] = useState<PageFormat>('a4');
  const [orientation, setOrientation] = useState<PageOrientation>('auto');
  const [margin, setMargin] = useState<MarginOption>('small');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const img = new Image();
        img.onload = () => {
          setImages((prev) => [
            ...prev,
            {
              id: `${file.name}-${Date.now()}-${Math.random()}`,
              name: file.name,
              dataUrl,
              width: img.width,
              height: img.height,
            },
          ]);
          setPdfUrl(null);
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setImages(reorderPdfList(images, index, index - 1));
    setPdfUrl(null);
  };

  const moveDown = (index: number) => {
    if (index === images.length - 1) return;
    setImages(reorderPdfList(images, index, index + 1));
    setPdfUrl(null);
  };

  const removeImage = (id: string) => {
    setImages(images.filter((img) => img.id !== id));
    setPdfUrl(null);
  };

  const handleGeneratePdf = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const item of images) {
        let embeddedImage;
        if (item.dataUrl.startsWith('data:image/png')) {
          embeddedImage = await pdfDoc.embedPng(item.dataUrl);
        } else {
          // Convert to JPEG via canvas if WebP or other format
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = item.width;
          tempCanvas.height = item.height;
          const ctx = tempCanvas.getContext('2d');
          const tempImg = new Image();
          await new Promise<void>((resolve) => {
            tempImg.onload = () => {
              ctx?.drawImage(tempImg, 0, 0);
              resolve();
            };
            tempImg.src = item.dataUrl;
          });
          const jpegDataUrl = tempCanvas.toDataURL('image/jpeg', 0.92);
          embeddedImage = await pdfDoc.embedJpg(jpegDataUrl);
        }

        const { width: pageW, height: pageH, marginPt } = getPageDimensions(
          pageFormat,
          orientation,
          item.width,
          item.height,
          margin
        );

        const page = pdfDoc.addPage([pageW, pageH]);
        const availW = pageW - marginPt * 2;
        const availH = pageH - marginPt * 2;

        const { width: drawW, height: drawH, x, y } = calculateFittedImageSize(
          item.width,
          item.height,
          availW,
          availH
        );

        page.drawImage(embeddedImage, {
          x: marginPt + x,
          y: marginPt + y,
          width: drawW,
          height: drawH,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      setPdfUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error('PDF Generation failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!pdfUrl) return;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'images-collection.pdf';
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
          accept="image/*"
          multiple
          onChange={handleFileUpload}
          className="hidden"
        />
        <div className="p-3.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-2xl">
          <Layers className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
            Select or Drop Images to Convert to PDF
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Convert JPG, PNG, WebP images into a single multi-page PDF document.
          </p>
        </div>
      </div>

      {images.length > 0 && (
        <div className="space-y-6">
          {/* Settings Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Page Size
              </label>
              <select
                value={pageFormat}
                onChange={(e) => setPageFormat(e.target.value as PageFormat)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="a4">A4 (Standard Document)</option>
                <option value="letter">US Letter</option>
                <option value="fit">Fit to Image Dimensions</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Page Orientation
              </label>
              <select
                value={orientation}
                onChange={(e) => setOrientation(e.target.value as PageOrientation)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="auto">Auto (Match Image Orientation)</option>
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Margins
              </label>
              <select
                value={margin}
                onChange={(e) => setMargin(e.target.value as MarginOption)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="none">No Margins (Full Bleed)</option>
                <option value="small">Small Margins (20pt)</option>
                <option value="large">Large Margins (40pt)</option>
              </select>
            </div>
          </div>

          {/* Image Thumbnail Reorder Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className="group relative rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm dark:border-white/10 dark:bg-slate-900 flex flex-col justify-between"
              >
                <div className="flex justify-between items-center pb-1">
                  <span className="text-[10px] font-bold text-slate-400">Page {idx + 1}</span>
                  <button
                    onClick={() => removeImage(img.id)}
                    className="text-red-400 hover:text-red-500 p-0.5"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="h-28 flex items-center justify-center bg-slate-50 dark:bg-slate-950 rounded-xl overflow-hidden my-1">
                  <img
                    src={img.dataUrl}
                    alt={img.name}
                    className="max-h-full object-contain"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    disabled={idx === 0}
                    onClick={() => moveUp(idx)}
                    className="p-1 rounded text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-20"
                  >
                    <ArrowUp className="h-3 w-3" />
                  </button>
                  <span className="text-[10px] text-slate-500 truncate max-w-[80px]">
                    {img.name}
                  </span>
                  <button
                    disabled={idx === images.length - 1}
                    onClick={() => moveDown(idx)}
                    className="p-1 rounded text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-20"
                  >
                    <ArrowDown className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/5">
            <span className="text-xs text-slate-600 dark:text-slate-400">
              Total Images: {images.length}
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={handleGeneratePdf}
                disabled={isGenerating}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition shadow-sm disabled:opacity-50"
              >
                <FileCheck className="h-4 w-4" />
                {isGenerating ? 'Generating PDF...' : 'Create PDF'}
              </button>

              {pdfUrl && (
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition shadow-sm"
                >
                  <Download className="h-4 w-4" /> Download PDF
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
