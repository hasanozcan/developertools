'use client';

import { useState, useCallback } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import CopyButton from '@/components/common/CopyButton';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface JwtPayload {
  header: Record<string, any>;
  payload: Record<string, any>;
  signature: string;
}

function decodeJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    const signature = parts[2];

    return { header, payload, signature };
  } catch {
    return null;
  }
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString();
}

export default function JwtDecoderTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [decoded, setDecoded] = useState<JwtPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
    
    if (!value.trim()) {
      setDecoded(null);
      setError(null);
      return;
    }

    const result = decodeJwt(value.trim());
    if (result) {
      setDecoded(result);
      setError(null);
    } else {
      setDecoded(null);
      setError('Invalid JWT token format');
    }
  }, []);

  const loadSample = useCallback(() => {
    const sampleJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxOTE2MjM5MDIyfQ.POstGetfAytaZS82wHcjoTyoqhMyxXiWdR7Nn7A29DN';
    handleInputChange(sampleJwt);
  }, [handleInputChange]);

  const isExpired = decoded?.payload?.exp 
    ? (decoded.payload.exp as number) * 1000 < Date.now() 
    : false;

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('tool.jwtDecoder.jwtToken')}</label>
          <button
            onClick={loadSample}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {t('common.loadSample')}
          </button>
        </div>
        <CodeEditor
          value={input}
          onChange={handleInputChange}
          placeholder="Paste your JWT token here (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
          language="text"
          minHeight="100px"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Decoded Output */}
      {decoded && (
        <div className="space-y-4">
          {/* Token Status */}
          {decoded.payload.exp && (
            <div className={`flex items-center gap-2 p-3 rounded-lg ${isExpired ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'}`}>
              <span className="font-medium">{isExpired ? t('tool.jwtDecoder.tokenExpired') : t('tool.jwtDecoder.tokenValid')}</span>
              {decoded.payload.exp && (
                <span className="text-sm">
                  (Expires: {formatDate(decoded.payload.exp as number)})
                </span>
              )}
            </div>
          )}

          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('tool.jwtDecoder.header')}</label>
              <CopyButton text={JSON.stringify(decoded.header, null, 2)} />
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
              <pre className="font-mono text-sm text-blue-900 dark:text-blue-200 whitespace-pre-wrap overflow-auto">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </div>
          </div>

          {/* Payload */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('tool.jwtDecoder.payload')}</label>
              <CopyButton text={JSON.stringify(decoded.payload, null, 2)} />
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 border border-purple-100 dark:border-purple-800">
              <pre className="font-mono text-sm text-purple-900 dark:text-purple-200 whitespace-pre-wrap overflow-auto">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
            </div>
            
            {/* Common claims */}
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {decoded.payload.iat && (
                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                  <span className="text-gray-500 dark:text-gray-400">{t('tool.jwtDecoder.issuedAt')}</span>{' '}
                  <span className="font-medium text-gray-900 dark:text-white">{formatDate(decoded.payload.iat as number)}</span>
                </div>
              )}
              {decoded.payload.exp && (
                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                  <span className="text-gray-500 dark:text-gray-400">{t('tool.jwtDecoder.expires')}</span>{' '}
                  <span className="font-medium text-gray-900 dark:text-white">{formatDate(decoded.payload.exp as number)}</span>
                </div>
              )}
              {decoded.payload.sub && (
                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                  <span className="text-gray-500 dark:text-gray-400">{t('tool.jwtDecoder.subject')}</span>{' '}
                  <span className="font-medium text-gray-900 dark:text-white">{decoded.payload.sub as string}</span>
                </div>
              )}
              {decoded.payload.iss && (
                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                  <span className="text-gray-500 dark:text-gray-400">{t('tool.jwtDecoder.issuer')}</span>{' '}
                  <span className="font-medium text-gray-900 dark:text-white">{decoded.payload.iss as string}</span>
                </div>
              )}
            </div>
          </div>

          {/* Signature */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('tool.jwtDecoder.signature')}</label>
            <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-4 border border-red-100 dark:border-red-800">
              <code className="font-mono text-sm text-red-900 dark:text-red-200 break-all">
                {decoded.signature}
              </code>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {t('tool.jwtDecoder.signatureWarning')}
            </p>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>{t('tool.jwtDecoder.infoText')}</p>
      </div>
    </div>
  );
}
