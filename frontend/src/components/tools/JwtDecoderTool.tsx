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
    const sampleJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxOTE2MjM5MDIyLCJuYmYiOjE1MTYyMzkwMDJ9.POstGetfAytaZS86wHcjoTyoqhMyxXiWdR7Nn7A29DN';
    handleInputChange(sampleJwt);
  }, [handleInputChange]);

  const isExpired = decoded?.payload?.exp 
    ? (decoded.payload.exp as number) * 1000 < Date.now() 
    : false;

  const getTimestampValidation = () => {
    if (!decoded?.payload) return null;

    const now = Math.floor(Date.now() / 1000);
    const iat = decoded.payload.iat as number | undefined;
    const nbf = decoded.payload.nbf as number | undefined;
    const exp = decoded.payload.exp as number | undefined;

    const validations: Array<{
      name: string;
      value: number;
      valid: boolean;
      message: string;
      color: string;
    }> = [];

    if (iat) {
      const iatValid = iat <= now;
      validations.push({
        name: 'Issued At (iat)',
        value: iat,
        valid: iatValid,
        message: iatValid ? 'Token was issued in the past' : 'Token issue date is in the future!',
        color: iatValid ? 'green' : 'red',
      });
    }

    if (nbf) {
      const nbfValid = nbf <= now;
      validations.push({
        name: 'Not Before (nbf)',
        value: nbf,
        valid: nbfValid,
        message: nbfValid ? 'Not-before time has passed' : 'Not-before time is in the future',
        color: nbfValid ? 'green' : 'red',
      });
    }

    if (exp) {
      const expValid = exp > now;
      validations.push({
        name: 'Expiration (exp)',
        value: exp,
        valid: expValid,
        message: expValid ? 'Expiration time is in the future' : 'Expiration time has passed',
        color: expValid ? 'green' : 'red',
      });
    }

    return validations;
  };

  const timestampValidations = getTimestampValidation();
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
          {/* Decoding never establishes authenticity. */}
          <div className="flex items-center justify-center gap-2 p-4 rounded-lg border-2 bg-amber-50 dark:bg-amber-900/30 border-amber-500 text-amber-800 dark:text-amber-300">
            <AlertCircle className="w-5 h-5" />
            <span className="font-bold text-lg">Decoded only — signature not verified</span>
          </div>

          {/* Timestamp Validation */}
          {timestampValidations && timestampValidations.length > 0 && (
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                <span className="font-medium text-gray-700 dark:text-gray-300">Timestamp Validation</span>
              </div>
              <div className="p-4 space-y-3">
                {timestampValidations.map((validation, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      validation.color === 'green'
                        ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        validation.color === 'green' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{validation.name}</div>
                        <div className={`text-sm ${validation.color === 'green' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                          {validation.message}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                        {new Date(validation.value * 1000).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        {Math.floor(validation.value)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
              {decoded.payload.nbf && (
                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                  <span className="text-gray-500 dark:text-gray-400">Not Before</span>{' '}
                  <span className="font-medium text-gray-900 dark:text-white">{formatDate(decoded.payload.nbf as number)}</span>
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
