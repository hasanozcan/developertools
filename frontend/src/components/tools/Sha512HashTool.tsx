'use client';

import { useState, useCallback, useRef } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import CopyButton from '@/components/common/CopyButton';
import { useLanguage } from '@/context/LanguageContext';
import { Upload, X, FileText } from 'lucide-react';

// SHA512 implementation (client-side)
async function sha512(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-512', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// SHA512 for files
async function sha512File(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const hashBuffer = await crypto.subtle.digest('SHA-512', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      resolve(hashArray.map(b => b.toString(16).padStart(2, '0')).join(''));
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}

export default function Sha512HashTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');
  const [uppercase, setUppercase] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileHash, setFileHash] = useState<string | null>(null);
  const [hashingFile, setHashingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateHash = useCallback(async () => {
    if (!input) {
      setHash('');
      return;
    }
    const result = await sha512(input);
    setHash(uppercase ? result.toUpperCase() : result);
  }, [input, uppercase]);

  const handleInputChange = useCallback(async (value: string) => {
    setInput(value);
    if (value) {
      const result = await sha512(value);
      setHash(uppercase ? result.toUpperCase() : result);
    } else {
      setHash('');
    }
  }, [uppercase]);

  const loadSample = useCallback(async () => {
    const sampleText = 'Hello, World! This is a sample text for SHA512 hashing.';
    setInput(sampleText);
    const result = await sha512(sampleText);
    setHash(uppercase ? result.toUpperCase() : result);
  }, [uppercase]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileHash(null);
      setHashingFile(true);
      
      try {
        const result = await sha512File(selectedFile);
        setFileHash(uppercase ? result.toUpperCase() : result);
      } catch (err) {
        console.error('File hashing error:', err);
      } finally {
        setHashingFile(false);
      }
    }
  }, [uppercase]);

  const removeFile = useCallback(() => {
    setFile(null);
    setFileHash(null);
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
          Generate SHA512 Hash
        </button>
        
        <button
          onClick={loadSample}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          Load Sample
        </button>
        
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => {
              setUppercase(e.target.checked);
              if (hash) {
                setHash(e.target.checked ? hash.toUpperCase() : hash.toLowerCase());
              }
              if (fileHash) {
                setFileHash(e.target.checked ? fileHash.toUpperCase() : fileHash.toLowerCase());
              }
            }}
            className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-primary-600"
          />
          Uppercase
        </label>
      </div>

      {/* File Upload Section */}
      <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Hash a File
        </label>
        
        {file ? (
          <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{file.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{formatFileSize(file.size)}</div>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
              title="Remove file"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Upload className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">
                {hashingFile ? 'Hashing file...' : 'Click to upload a file'}
              </span>
            </button>
          </div>
        )}
        
        {fileHash && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">File SHA512 Hash:</label>
              <CopyButton text={fileHash} />
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
              <code className="text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
                {fileHash}
              </code>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Input Text
        </label>
        <CodeEditor
          value={input}
          onChange={handleInputChange}
          placeholder="Enter text to generate SHA512 hash..."
          language="text"
          minHeight="150px"
        />
      </div>

      {/* Output */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          SHA512 Hash
        </label>
        <div className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <code className="flex-1 font-mono text-sm break-all text-gray-800 dark:text-gray-200">
            {hash || 'Hash will appear here...'}
          </code>
          {hash && <CopyButton text={hash} />}
        </div>
      </div>

      {/* Info */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>SHA512 produces a 512-bit (64-byte) hash value, typically rendered as a 128-digit hexadecimal number. It is part of the SHA-2 family of cryptographic hash functions and is considered secure for most applications.</p>
      </div>
    </div>
  );
}