'use client';

import { useState, useCallback, useRef } from 'react';
import { Copy, Check, Upload, Image, Trash2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ImageToBase64Tool() {
  const { t } = useLanguage();
  const [base64, setBase64] = useState('');
  const [imageInfo, setImageInfo] = useState<{
    name: string;
    size: number;
    type: string;
    width: number;
    height: number;
  } | null>(null);
  const [copied, setCopied] = useState<'base64' | 'dataUri' | null>(null);
  const [outputFormat, setOutputFormat] = useState<'dataUri' | 'base64'>('dataUri');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(t('tool.imageBase64.invalidFile'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUri = e.target?.result as string;
      const base64Only = dataUri.split(',')[1];
      setBase64(base64Only);

      // Get image dimensions
      const img = new window.Image();
      img.onload = () => {
        setImageInfo({
          name: file.name,
          size: file.size,
          type: file.type,
          width: img.width,
          height: img.height,
        });
      };
      img.src = dataUri;
    };
    reader.readAsDataURL(file);
  }, [t]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const copyToClipboard = useCallback((type: 'base64' | 'dataUri') => {
    const text = type === 'dataUri' && imageInfo 
      ? `data:${imageInfo.type};base64,${base64}`
      : base64;
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  }, [base64, imageInfo]);

  const clear = useCallback(() => {
    setBase64('');
    setImageInfo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const dataUri = imageInfo ? `data:${imageInfo.type};base64,${base64}` : '';

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary-500 dark:hover:border-primary-500 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <Upload className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          {t('tool.imageBase64.dropOrClick')}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          {t('tool.imageBase64.supportedFormats')}
        </p>
      </div>

      {/* Image Preview & Info */}
      {imageInfo && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preview */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <Image className="w-5 h-5" />
                {t('tool.imageBase64.preview')}
              </h3>
              <button
                onClick={clear}
                className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-center bg-white dark:bg-gray-900 rounded-lg p-4" style={{ backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px' }}>
              <img
                src={dataUri}
                alt="Preview"
                className="max-w-full max-h-64 object-contain"
              />
            </div>
          </div>

          {/* Info */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">{t('tool.imageBase64.imageInfo')}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{t('tool.imageBase64.fileName')}:</span>
                <span className="text-gray-900 dark:text-white font-mono">{imageInfo.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{t('tool.imageBase64.fileType')}:</span>
                <span className="text-gray-900 dark:text-white font-mono">{imageInfo.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{t('tool.imageBase64.dimensions')}:</span>
                <span className="text-gray-900 dark:text-white font-mono">{imageInfo.width} x {imageInfo.height}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{t('tool.imageBase64.originalSize')}:</span>
                <span className="text-gray-900 dark:text-white font-mono">{formatFileSize(imageInfo.size)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{t('tool.imageBase64.base64Size')}:</span>
                <span className="text-gray-900 dark:text-white font-mono">{formatFileSize(base64.length)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Output */}
      {base64 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('tool.imageBase64.output')}
              </label>
              <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                <button
                  onClick={() => setOutputFormat('dataUri')}
                  className={`px-3 py-1 text-xs font-medium transition-colors ${
                    outputFormat === 'dataUri'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  Data URI
                </button>
                <button
                  onClick={() => setOutputFormat('base64')}
                  className={`px-3 py-1 text-xs font-medium transition-colors ${
                    outputFormat === 'base64'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  Base64
                </button>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(outputFormat)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium flex items-center gap-2 text-sm"
            >
              {copied === outputFormat ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              {copied === outputFormat ? t('common.copied') : t('common.copy')}
            </button>
          </div>
          <textarea
            readOnly
            value={outputFormat === 'dataUri' ? dataUri : base64}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-xs bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
          />
        </div>
      )}

      {/* Usage Examples */}
      {base64 && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-white">{t('tool.imageBase64.usageExamples')}</h3>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">HTML:</div>
            <code className="block text-xs font-mono text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto">
              {`<img src="${dataUri.substring(0, 50)}..." alt="image" />`}
            </code>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">CSS:</div>
            <code className="block text-xs font-mono text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto">
              {`background-image: url('${dataUri.substring(0, 50)}...');`}
            </code>
          </div>
        </div>
      )}
    </div>
  );
}
