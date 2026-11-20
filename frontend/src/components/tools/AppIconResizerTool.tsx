'use client';

import { useLanguage } from '@/context/LanguageContext';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Download, Image as ImageIcon, Upload } from 'lucide-react';
import CopyButton from '@/components/common/CopyButton';
import {
  generateIosContentsJson,
  getAppIconManifest,
  resizeImageToPngBlob,
  type AppIconSizeSpec,
  type IconResizeFit,
} from '@/lib/appIconResizer';

interface GeneratedIcon {
  spec: AppIconSizeSpec;
  url: string;
  byteSize: number;
}

export default function AppIconResizerTool() {
  const { t } = useLanguage();
  const specs = useMemo(() => getAppIconManifest(), []);
  const contentsJson = useMemo(() => generateIosContentsJson(specs), [specs]);

  const [fit, setFit] = useState<IconResizeFit>('cover');
  const [transparentBg, setTransparentBg] = useState(true);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [sourceInfo, setSourceInfo] = useState<{
    name: string;
    width: number;
    height: number;
  } | null>(null);
  const [generated, setGenerated] = useState<GeneratedIcon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const loadedImageRef = useRef<HTMLImageElement | null>(null);
  const activeUrlsRef = useRef<string[]>([]);

  const revokeGeneratedUrls = useCallback(() => {
    for (const url of activeUrlsRef.current) {
      URL.revokeObjectURL(url);
    }
    activeUrlsRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      revokeGeneratedUrls();
    };
  }, [revokeGeneratedUrls]);

  const generateAllIcons = useCallback(
    async (img: HTMLImageElement, nextFit: IconResizeFit, nextBg: string | null) => {
      setLoading(true);
      setError(null);
      try {
        const nextIcons: GeneratedIcon[] = [];
        const newUrls: string[] = [];

        for (const spec of specs) {
          const blob = await resizeImageToPngBlob(img, spec.size, {
            fit: nextFit,
            background: nextBg,
          });
          const url = URL.createObjectURL(blob);
          newUrls.push(url);
          nextIcons.push({ spec, url, byteSize: blob.size });
        }

        revokeGeneratedUrls();
        activeUrlsRef.current = newUrls;
        setGenerated(nextIcons);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to resize app icons.');
      } finally {
        setLoading(false);
      }
    },
    [revokeGeneratedUrls, specs],
  );

  useEffect(() => {
    if (loadedImageRef.current) {
      void generateAllIcons(loadedImageRef.current, fit, transparentBg ? null : bgColor);
    }
  }, [fit, transparentBg, bgColor, generateAllIcons]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please choose a valid image file (PNG, JPEG, WebP, SVG).');
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onerror = () => {
      setError('Failed to read the selected image file.');
    };
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new window.Image();
      img.onerror = () => {
        setError('Unable to decode the selected image.');
      };
      img.onload = () => {
        loadedImageRef.current = img;
        setSourceInfo({
          name: file.name,
          width: img.naturalWidth || img.width,
          height: img.naturalHeight || img.height,
        });
        void generateAllIcons(img, fit, transparentBg ? null : bgColor);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleDownloadContentsJson = () => {
    const blob = new Blob([contentsJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Contents.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h4 className="font-bold text-sm">{t('uiText.fc85bbf1')}</h4>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
          >
            <Upload className="h-4 w-4" />
            Upload App Icon Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            aria-label="Upload app icon image"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <label className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
            Resize Mode:
            <select
              value={fit}
              onChange={(e) => setFit(e.target.value as IconResizeFit)}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="cover">Cover (centered square crop)</option>
              <option value="contain">Contain (fit whole image)</option>
            </select>
          </label>

          <label className="inline-flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={transparentBg}
              onChange={(e) => setTransparentBg(e.target.checked)}
            />
            Preserve transparency
          </label>

          {!transparentBg && (
            <label className="inline-flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
              Background:
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-7 w-10 cursor-pointer rounded border border-slate-300"
              />
            </label>
          )}
        </div>

        {sourceInfo && (
          <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            <ImageIcon className="h-4 w-4 text-indigo-500" />
            <span>
              Source: <strong>{sourceInfo.name}</strong> ({sourceInfo.width}x{sourceInfo.height} px)
            </span>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
          >
            {error}
          </div>
        )}

        {loading && (
          <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
            Rendering PNG icon set...
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(generated.length > 0
            ? generated
            : specs.map((spec) => ({ spec, url: '', byteSize: 0 }))
          ).map((item) => (
            <div
              key={`${item.spec.platform}-${item.spec.filename}`}
              className="flex flex-col justify-between gap-2 rounded-xl border border-slate-200/80 bg-slate-50 p-3 text-xs dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    {item.spec.platform}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">
                    {item.spec.size}x{item.spec.size}
                  </span>
                </div>
                <p className="mt-1 truncate font-mono text-[11px] text-slate-600 dark:text-slate-300">
                  {item.spec.filename}
                </p>
              </div>

              {item.url ? (
                <>
                  <div className="flex h-16 items-center justify-center rounded-lg bg-white p-2 dark:bg-slate-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt={`${item.spec.filename} preview`}
                      className="max-h-12 max-w-12 rounded object-contain"
                    />
                  </div>
                  <a
                    href={item.url}
                    download={item.spec.filename}
                    className="inline-flex items-center justify-center gap-1 rounded-lg bg-indigo-50 px-2.5 py-1.5 text-[11px] font-semibold text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-900/60"
                  >
                    <Download className="h-3.5 w-3.5" />
                    PNG ({(item.byteSize / 1024).toFixed(1)} KB)
                  </a>
                </>
              ) : (
                <p className="text-[11px] text-slate-400">Upload image to generate</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="surface-card rounded-2xl p-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-bold text-sm">Xcode AppIcon.appiconset / Contents.json</h4>
          <div className="flex items-center gap-2">
            <CopyButton text={contentsJson} />
            <button
              type="button"
              onClick={handleDownloadContentsJson}
              className="inline-flex items-center gap-1.5 rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700"
            >
              <Download className="h-3.5 w-3.5" />
              Download Contents.json
            </button>
          </div>
        </div>
        <textarea
          readOnly
          rows={10}
          value={contentsJson}
          aria-label="Xcode Contents.json"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
        />
      </div>
    </div>
  );
}
