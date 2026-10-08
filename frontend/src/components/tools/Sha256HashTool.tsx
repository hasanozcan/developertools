'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from '@/components/common/LocalizedLink';
import CodeEditor from '@/components/common/CodeEditor';
import CopyButton from '@/components/common/CopyButton';
import { useLanguage } from '@/context/LanguageContext';
import { compareSha256Checksums } from '@/lib/sha256Checksum';
import { CheckCircle2, CircleAlert, FileText, Upload, X, Shield, Sparkles } from 'lucide-react';

// SHA256 implementation (client-side)
async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// SHA256 for files
export async function sha256File(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        resolve(hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''));
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}

export default function Sha256HashTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');
  const [uppercase, setUppercase] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileHash, setFileHash] = useState<string | null>(null);
  const [hashingFile, setHashingFile] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [expectedChecksum, setExpectedChecksum] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textHashRequestRef = useRef(0);
  const fileHashRequestRef = useRef(0);
  const checksumComparison = compareSha256Checksums(fileHash ?? '', expectedChecksum);
  const displayedHash = uppercase ? hash.toUpperCase() : hash;
  const displayedFileHash = fileHash && (uppercase ? fileHash.toUpperCase() : fileHash);

  const calculateTextHash = useCallback(async (value: string) => {
    const requestId = ++textHashRequestRef.current;
    if (!value) {
      setHash('');
      return;
    }

    try {
      const result = await sha256(value);
      if (textHashRequestRef.current === requestId) {
        setHash(result);
      }
    } catch (error) {
      if (textHashRequestRef.current === requestId) {
        setHash('');
        console.error('Text hashing error:', error);
      }
    }
  }, []);

  // Read URL query parameter or hash on mount (e.g. #input=... or ?input=...)
  useEffect(() => {
    try {
      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
      const queryParams = new URLSearchParams(window.location.search);
      const initialInput = hashParams.get('input') || queryParams.get('input');
      if (initialInput) {
        setInput(initialInput);
        void calculateTextHash(initialInput);
      }
    } catch {
      // ignore
    }
  }, [calculateTextHash]);

  const generateHash = useCallback(() => {
    void calculateTextHash(input);
  }, [calculateTextHash, input]);

  const handleInputChange = useCallback(
    (value: string) => {
      setInput(value);
      void calculateTextHash(value);
    },
    [calculateTextHash],
  );

  const loadSample = useCallback(() => {
    const sampleText = 'abc';
    setInput(sampleText);
    void calculateTextHash(sampleText);
  }, [calculateTextHash]);

  const processSelectedFile = useCallback(async (selectedFile: File) => {
    const requestId = ++fileHashRequestRef.current;
    setFile(selectedFile);
    setFileHash(null);
    setFileError(false);
    setHashingFile(true);

    try {
      const result = await sha256File(selectedFile);
      if (fileHashRequestRef.current === requestId) {
        setFileHash(result);
      }
    } catch (err) {
      if (fileHashRequestRef.current === requestId) {
        setFileError(true);
        console.error('File hashing error:', err);
      }
    } finally {
      if (fileHashRequestRef.current === requestId) {
        setHashingFile(false);
      }
    }
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        void processSelectedFile(selectedFile);
      }
    },
    [processSelectedFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        void processSelectedFile(e.dataTransfer.files[0]);
      }
    },
    [processSelectedFile],
  );

  const removeFile = useCallback(() => {
    fileHashRequestRef.current += 1;
    setFile(null);
    setFileHash(null);
    setFileError(false);
    setHashingFile(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Offline Security & Extension Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-gradient-to-r from-indigo-50 to-sky-50 dark:from-indigo-950/40 dark:to-sky-950/30 border border-indigo-200/80 dark:border-indigo-800/50 rounded-xl text-xs text-indigo-950 dark:text-indigo-200">
        <div className="flex items-center gap-2.5">
          <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span>
            <strong>{t('tool.sha256Hash.localTitle')}</strong>{' '}
            {t('tool.sha256Hash.localDescription')}
          </span>
        </div>
        <Link
          href="/about"
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
        >
          <Sparkles className="w-3 h-3" />
          {t("uiText.fa222c74")}</Link>
      </div>

      <section aria-labelledby="sha256-text-heading" className="space-y-4">
        <h2
          id="sha256-text-heading"
          className="text-lg font-semibold text-gray-900 dark:text-white"
        >
          {t('tool.sha256Hash.textHash')}
        </h2>
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={generateHash}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
          >
            {t('common.generate')}
          </button>

          <button
            onClick={loadSample}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            {t('common.loadSample')}
          </button>

          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-primary-600"
            />
            {t('common.uppercase')}
          </label>
        </div>

        {/* Input */}
        <div>
          <label
            htmlFor="sha256-text-input"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t('common.input')}
          </label>
          <CodeEditor
            id="sha256-text-input"
            onRun={generateHash}
            value={input}
            onChange={handleInputChange}
            placeholder={t('tool.sha256Hash.inputPlaceholder')}
            language="text"
            minHeight="150px"
          />
        </div>

        {/* Output */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('tool.sha256Hash.sha256Hash')}
          </label>
          <div className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <code className="flex-1 font-mono text-sm break-all text-gray-800 dark:text-gray-200">
              {displayedHash || t('tool.sha256Hash.outputPlaceholder')}
            </code>
            {displayedHash && <CopyButton text={displayedHash} />}
          </div>
        </div>
      </section>

      {/* File Upload Section */}
      <section
        aria-labelledby="sha256-file-heading"
        className="border border-gray-200 dark:border-gray-600 rounded-lg p-4"
      >
        <h2
          id="sha256-file-heading"
          className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
        >
          {t('tool.sha256Hash.hashFile')}
        </h2>
        <p id="sha256-file-help" className="mb-3 text-sm text-gray-500 dark:text-gray-400">
          {t('tool.sha256Hash.fileMemoryHelp')}
        </p>

        {file ? (
          <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{file.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {hashingFile ? t('tool.sha256Hash.hashingFile') : formatFileSize(file.size)}
                </div>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
              title={t('tool.sha256Hash.removeFile')}
              aria-label={t('tool.sha256Hash.removeFile')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`transition-colors rounded-lg ${
              isDragging ? 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-500' : ''
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              aria-label={t('tool.sha256Hash.hashFile')}
              aria-describedby="sha256-file-help"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              aria-describedby="sha256-file-help"
              onClick={() => fileInputRef.current?.click()}
              className={`flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed rounded-lg transition-colors ${
                isDragging
                  ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                  : 'border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              <Upload className="w-5 h-5" />
              <span>
                {hashingFile
                  ? t('tool.sha256Hash.hashingFile')
                  : isDragging
                    ? t("uiText.827c6358")
                    : t('tool.sha256Hash.uploadFile')}
              </span>
            </button>
          </div>
        )}

        {fileError && file && (
          <div
            role="alert"
            className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300"
          >
            <p>{t('tool.sha256Hash.fileError')}</p>
            <button
              onClick={() => void processSelectedFile(file)}
              className="mt-2 rounded-lg border border-red-300 px-3 py-1.5 font-medium hover:bg-red-100 dark:border-red-700 dark:hover:bg-red-900/50"
            >
              {t('tool.sha256Hash.retryFile')}
            </button>
          </div>
        )}

        {displayedFileHash && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">
                {t('tool.sha256Hash.fileHash')}
              </label>
              <CopyButton text={displayedFileHash} />
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
              <code className="text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
                {displayedFileHash}
              </code>
            </div>
          </div>
        )}

        <div className="mt-4">
          <label
            htmlFor="sha256-expected-checksum"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t('tool.sha256Hash.expectedChecksum')}
          </label>
          <input
            id="sha256-expected-checksum"
            type="text"
            value={expectedChecksum}
            onChange={(event) => setExpectedChecksum(event.target.value)}
            placeholder={t('tool.sha256Hash.expectedPlaceholder')}
            spellCheck={false}
            autoComplete="off"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-gray-900 shadow-sm outline-none transition-colors placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500"
          />

          <div className="mt-2 min-h-6" aria-live="polite">
            {checksumComparison === 'match' && (
              <p className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-400">
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                {t('tool.sha256Hash.checksumMatch')}
              </p>
            )}
            {checksumComparison === 'invalid' && (
              <p className="flex items-center gap-2 text-sm font-medium text-red-700 dark:text-red-400">
                <CircleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
                {t('tool.sha256Hash.checksumInvalid')}
              </p>
            )}
            {checksumComparison === 'mismatch' && (
              <p className="flex items-center gap-2 text-sm font-medium text-red-700 dark:text-red-400">
                <CircleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
                {t('tool.sha256Hash.checksumMismatch')}
              </p>
            )}
            {checksumComparison === 'empty' && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('tool.sha256Hash.checksumHelp')}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Direct Related Crypto Tools Grid */}
      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
          {t("uiText.e4937a28")}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <Link
            href="/tools/crypto/md5-hash"
            className="flex flex-col p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="font-semibold text-xs text-gray-900 dark:text-white">{t("tool.md5Hash.md5Hash")}</span>
            <span className="text-[11px] text-gray-500 dark:text-gray-400">{t("uiText.d72874bf")}</span>
          </Link>
          <Link
            href="/tools/crypto/sha512-hash"
            className="flex flex-col p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="font-semibold text-xs text-gray-900 dark:text-white">
              {t("uiText.6d1f7f38")}</span>
            <span className="text-[11px] text-gray-500 dark:text-gray-400">{t("uiText.29736d5f")}</span>
          </Link>
          <Link
            href="/tools/crypto/hmac-generator"
            className="flex flex-col p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="font-semibold text-xs text-gray-900 dark:text-white">
              {t("uiText.62cddcb3")}</span>
            <span className="text-[11px] text-gray-500 dark:text-gray-400">{t("uiText.f4d3f95b")}</span>
          </Link>
          <Link
            href="/tools/crypto/bcrypt-generator"
            className="flex flex-col p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="font-semibold text-xs text-gray-900 dark:text-white">{t("uiText.5d38faf9")}</span>
            <span className="text-[11px] text-gray-500 dark:text-gray-400">{t("uiText.a47cc2f0")}</span>
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>{t('tool.sha256Hash.infoText')}</p>
      </div>
    </div>
  );
}
