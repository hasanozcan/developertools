'use client';

import { useState, useCallback } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import CopyButton from '@/components/common/CopyButton';
import { AlertCircle } from 'lucide-react';

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

  const isExpired = decoded?.payload?.exp 
    ? (decoded.payload.exp as number) * 1000 < Date.now() 
    : false;

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">JWT Token</label>
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
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Decoded Output */}
      {decoded && (
        <div className="space-y-4">
          {/* Token Status */}
          {decoded.payload.exp && (
            <div className={`flex items-center gap-2 p-3 rounded-lg ${isExpired ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
              <span className="font-medium">{isExpired ? '⚠️ Token Expired' : '✓ Token Valid'}</span>
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
              <label className="block text-sm font-medium text-gray-700">Header</label>
              <CopyButton text={JSON.stringify(decoded.header, null, 2)} />
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <pre className="font-mono text-sm text-blue-900 whitespace-pre-wrap overflow-auto">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </div>
          </div>

          {/* Payload */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Payload</label>
              <CopyButton text={JSON.stringify(decoded.payload, null, 2)} />
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <pre className="font-mono text-sm text-purple-900 whitespace-pre-wrap overflow-auto">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
            </div>
            
            {/* Common claims */}
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {decoded.payload.iat && (
                <div className="bg-gray-50 p-2 rounded">
                  <span className="text-gray-500">Issued At:</span>{' '}
                  <span className="font-medium">{formatDate(decoded.payload.iat as number)}</span>
                </div>
              )}
              {decoded.payload.exp && (
                <div className="bg-gray-50 p-2 rounded">
                  <span className="text-gray-500">Expires:</span>{' '}
                  <span className="font-medium">{formatDate(decoded.payload.exp as number)}</span>
                </div>
              )}
              {decoded.payload.sub && (
                <div className="bg-gray-50 p-2 rounded">
                  <span className="text-gray-500">Subject:</span>{' '}
                  <span className="font-medium">{decoded.payload.sub as string}</span>
                </div>
              )}
              {decoded.payload.iss && (
                <div className="bg-gray-50 p-2 rounded">
                  <span className="text-gray-500">Issuer:</span>{' '}
                  <span className="font-medium">{decoded.payload.iss as string}</span>
                </div>
              )}
            </div>
          </div>

          {/* Signature */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Signature</label>
            <div className="bg-red-50 rounded-lg p-4 border border-red-100">
              <code className="font-mono text-sm text-red-900 break-all">
                {decoded.signature}
              </code>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              ⚠️ Signature verification requires the secret key and is not performed client-side.
            </p>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="text-sm text-gray-500">
        <p>JWT tokens consist of three parts: Header, Payload, and Signature, separated by dots.</p>
      </div>
    </div>
  );
}
