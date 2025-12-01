'use client';

import React, { useState, useEffect, useRef } from 'react';
import { QrCode, Download, Copy, Check, RefreshCw, FileText, Palette } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface QrOptions {
  size: number;
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
  foreground: string;
  background: string;
}

export default function QrCodeGeneratorTool() {
  const { t } = useLanguage();
  const [text, setText] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<QrOptions>({
    size: 256,
    errorCorrection: 'M',
    foreground: '#000000',
    background: '#ffffff',
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simple QR Code generation using canvas
  // This is a simplified implementation - for production, use a library like qrcode
  const generateQR = async (data: string) => {
    if (!data.trim()) {
      setQrDataUrl('');
      return;
    }

    // Use QR Code API for generation
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${options.size}x${options.size}&data=${encodeURIComponent(data)}&ecc=${options.errorCorrection}&color=${options.foreground.slice(1)}&bgcolor=${options.background.slice(1)}`;
    
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setQrDataUrl(url);
      }
    } catch (error) {
      console.error('QR generation error:', error);
      // Fallback: create a placeholder
      setQrDataUrl('');
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      generateQR(text);
    }, 300);

    return () => clearTimeout(debounce);
  }, [text, options]);

  const downloadQR = (format: 'png' | 'svg') => {
    if (!qrDataUrl) return;

    const link = document.createElement('a');
    link.download = `qrcode.${format}`;
    
    if (format === 'svg') {
      // For SVG, use API endpoint
      link.href = `https://api.qrserver.com/v1/create-qr-code/?size=${options.size}x${options.size}&data=${encodeURIComponent(text)}&ecc=${options.errorCorrection}&color=${options.foreground.slice(1)}&bgcolor=${options.background.slice(1)}&format=svg`;
    } else {
      link.href = qrDataUrl;
    }
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = async () => {
    if (!qrDataUrl) return;
    
    try {
      const response = await fetch(qrDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const presetTexts = [
    { label: 'URL', value: 'https://example.com' },
    { label: 'Email', value: 'mailto:hello@example.com' },
    { label: 'Phone', value: 'tel:+1234567890' },
    { label: 'SMS', value: 'sms:+1234567890?body=Hello' },
    { label: 'WiFi', value: 'WIFI:T:WPA;S:MyNetwork;P:MyPassword;;' },
    { label: 'vCard', value: 'BEGIN:VCARD\nVERSION:3.0\nN:Doe;John\nFN:John Doe\nTEL:+1234567890\nEMAIL:john@example.com\nEND:VCARD' },
  ];

  const loadSample = () => {
    setText('https://example.com/my-website');
  };

  const sizePresets = [128, 256, 512, 1024];

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('tool.qrCode.contentToEncode')}
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Enter text, URL, or data to encode..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {text.length} characters
          </span>
          <button
            onClick={loadSample}
            className="px-3 py-1.5 text-sm bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
          >
            {t('common.loadSample')}
          </button>
        </div>
      </div>

      {/* Presets */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('tool.qrCode.quickPresets')}
        </label>
        <div className="flex flex-wrap gap-2">
          {presetTexts.map((preset) => (
            <button
              key={preset.label}
              onClick={() => setText(preset.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30 text-gray-700 dark:text-gray-300 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('tool.qrCode.size')}
          </label>
          <div className="flex gap-1">
            {sizePresets.map((size) => (
              <button
                key={size}
                onClick={() => setOptions({ ...options, size })}
                className={`flex-1 px-2 py-2 text-xs font-medium rounded-lg transition-colors ${
                  options.size === size
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Error Correction */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('tool.qrCode.errorCorrection')}
          </label>
          <select
            value={options.errorCorrection}
            onChange={(e) => setOptions({ ...options, errorCorrection: e.target.value as QrOptions['errorCorrection'] })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
          >
            <option value="L">Low (7%)</option>
            <option value="M">Medium (15%)</option>
            <option value="Q">Quartile (25%)</option>
            <option value="H">High (30%)</option>
          </select>
        </div>

        {/* Foreground Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Palette className="w-4 h-4 inline mr-1" />
            {t('tool.qrCode.foreground')}
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={options.foreground}
              onChange={(e) => setOptions({ ...options, foreground: e.target.value })}
              className="w-12 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
            />
            <input
              type="text"
              value={options.foreground}
              onChange={(e) => setOptions({ ...options, foreground: e.target.value })}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Background Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Palette className="w-4 h-4 inline mr-1" />
            {t('tool.qrCode.background')}
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={options.background}
              onChange={(e) => setOptions({ ...options, background: e.target.value })}
              className="w-12 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
            />
            <input
              type="text"
              value={options.background}
              onChange={(e) => setOptions({ ...options, background: e.target.value })}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-mono bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* QR Code Preview */}
      <div className="flex flex-col items-center gap-6">
        <div 
          className="p-6 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl"
          style={{ backgroundColor: options.background }}
        >
          {qrDataUrl ? (
            <img 
              src={qrDataUrl} 
              alt="QR Code" 
              width={options.size > 400 ? 400 : options.size}
              height={options.size > 400 ? 400 : options.size}
              className="max-w-full"
            />
          ) : (
            <div 
              className="flex items-center justify-center"
              style={{ width: Math.min(options.size, 400), height: Math.min(options.size, 400) }}
            >
              <div className="text-center text-gray-400 dark:text-gray-500">
                <QrCode className="w-16 h-16 mx-auto mb-2 opacity-50" />
                <p className="text-sm">{t('tool.qrCode.enterContent')}</p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        {qrDataUrl && (
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => downloadQR('png')}
              className="px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {t('common.download')} PNG
            </button>
            <button
              onClick={() => downloadQR('svg')}
              className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {t('common.download')} SVG
            </button>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              {copied ? t('common.copied') : t('tool.qrCode.copyImage')}
            </button>
            <button
              onClick={() => generateQR(text)}
              className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              {t('tool.qrCode.regenerate')}
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
          <span className="font-medium text-gray-700 dark:text-gray-300">{t('tool.qrCode.dataTypes')}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="font-medium text-gray-900 dark:text-white text-sm mb-1">URL</div>
            <code className="text-xs text-gray-600 dark:text-gray-400">https://example.com</code>
          </div>
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="font-medium text-gray-900 dark:text-white text-sm mb-1">Email</div>
            <code className="text-xs text-gray-600 dark:text-gray-400">mailto:email@example.com</code>
          </div>
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="font-medium text-gray-900 dark:text-white text-sm mb-1">Phone</div>
            <code className="text-xs text-gray-600 dark:text-gray-400">tel:+1234567890</code>
          </div>
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="font-medium text-gray-900 dark:text-white text-sm mb-1">SMS</div>
            <code className="text-xs text-gray-600 dark:text-gray-400">sms:+123?body=Hello</code>
          </div>
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="font-medium text-gray-900 dark:text-white text-sm mb-1">WiFi</div>
            <code className="text-xs text-gray-600 dark:text-gray-400">WIFI:T:WPA;S:SSID;P:pass;;</code>
          </div>
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="font-medium text-gray-900 dark:text-white text-sm mb-1">vCard</div>
            <code className="text-xs text-gray-600 dark:text-gray-400">BEGIN:VCARD...</code>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
