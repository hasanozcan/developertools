'use client';

import { useState, useCallback, useRef } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import CopyButton from '@/components/common/CopyButton';
import { useLanguage } from '@/context/LanguageContext';
import { compareSha256Checksums } from '@/lib/sha256Checksum';
import { CheckCircle2, CircleAlert, FileText, Upload, X } from 'lucide-react';

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
    const sampleText = 'Hello, World! This is a sample text for SHA256 hashing.';
    setInput(sampleText);
    void calculateTextHash(sampleText);
  }, [calculateTextHash]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const requestId = ++fileHashRequestRef.current;
      setFile(selectedFile);
      setFileHash(null);
      setHashingFile(true);

      try {
        const result = await sha256File(selectedFile);
        if (fileHashRequestRef.current === requestId) {
          setFileHash(result);
        }
      } catch (err) {
        if (fileHashRequestRef.current === requestId) {
          console.error('File hashing error:', err);
        }
      } finally {
        if (fileHashRequestRef.current === requestId) {
          setHashingFile(false);
        }
      }
    }
  }, []);

  const removeFile = useCallback(() => {
    fileHashRequestRef.current += 1;
    setFile(null);
    setFileHash(null);
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
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={generateHash}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          {t('tool.sha256Hash.generateHash')}
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

      {/* File Upload Section */}
      <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('tool.sha256Hash.hashFile')}
        </label>

        {file ? (
          <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{file.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {formatFileSize(file.size)}
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
          <div>
            <input ref={fileInputRef} type="file" onChange={handleFileSelect} className="hidden" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Upload className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">
                {hashingFile ? t('tool.sha256Hash.hashingFile') : t('tool.sha256Hash.uploadFile')}
              </span>
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
      </div>

      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('common.input')}
        </label>
        <CodeEditor
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

      {/* Info */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>{t('tool.sha256Hash.infoText')}</p>
      </div>
    </div>
  );
}
