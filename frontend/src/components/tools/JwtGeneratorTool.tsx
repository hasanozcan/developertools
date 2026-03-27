'use client';

import { useState, useCallback } from 'react';
import CodeEditor from '@/components/common/CodeEditor';
import CopyButton from '@/components/common/CopyButton';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

type Algorithm = 'HS256' | 'HS384' | 'HS512';

function base64UrlEncode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  bytes.forEach(byte => binary += String.fromCharCode(byte));
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function signHmac(algorithm: Algorithm, data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);

  const hashAlg = algorithm === 'HS256' ? 'SHA-256' : algorithm === 'HS384' ? 'SHA-384' : 'SHA-512';

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: hashAlg },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(data));

  const signatureArray = new Uint8Array(signature);
  let binary = '';
  signatureArray.forEach(byte => binary += String.fromCharCode(byte));
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function getDefaultHeader(algorithm: Algorithm): Record<string, any> {
  return {
    alg: algorithm,
    typ: 'JWT'
  };
}

function getDefaultPayload(): Record<string, any> {
  const now = Math.floor(Date.now() / 1000);
  return {
    sub: '1234567890',
    name: 'John Doe',
    iat: now,
    exp: now + 3600,
    nbf: now
  };
}

export default function JwtGeneratorTool() {
  const { t } = useLanguage();
  const [algorithm, setAlgorithm] = useState<Algorithm>('HS256');
  const [headerJson, setHeaderJson] = useState(JSON.stringify(getDefaultHeader('HS256'), null, 2));
  const [payloadJson, setPayloadJson] = useState(JSON.stringify(getDefaultPayload(), null, 2));
  const [secret, setSecret] = useState('');
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAlgorithmChange = useCallback((newAlg: Algorithm) => {
    setAlgorithm(newAlg);
    try {
      const header = JSON.parse(headerJson);
      header.alg = newAlg;
      setHeaderJson(JSON.stringify(header, null, 2));
    } catch {
      // ignore parse errors during algorithm change
    }
  }, [headerJson]);

  const handleHeaderChange = useCallback((value: string) => {
    setHeaderJson(value);
    setGeneratedToken(null);
  }, []);

  const handlePayloadChange = useCallback((value: string) => {
    setPayloadJson(value);
    setGeneratedToken(null);
  }, []);

  const handleSecretChange = useCallback((value: string) => {
    setSecret(value);
    setGeneratedToken(null);
  }, []);

  const handleGenerate = useCallback(async () => {
    setError(null);

    if (!secret.trim()) {
      setError('Secret key is required');
      return;
    }

    let headerObj: Record<string, any>;
    let payloadObj: Record<string, any>;

    try {
      headerObj = JSON.parse(headerJson);
    } catch {
      setError('Invalid header JSON');
      return;
    }

    try {
      payloadObj = JSON.parse(payloadJson);
    } catch {
      setError('Invalid payload JSON');
      return;
    }

    try {
      const encodedHeader = base64UrlEncode(JSON.stringify(headerObj));
      const encodedPayload = base64UrlEncode(JSON.stringify(payloadObj));
      const signingInput = `${encodedHeader}.${encodedPayload}`;

      const signature = await signHmac(algorithm, signingInput, secret);
      const token = `${signingInput}.${signature}`;

      setGeneratedToken(token);
    } catch (err) {
      setError('Failed to generate token: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  }, [algorithm, headerJson, payloadJson, secret]);

  const loadSample = useCallback(() => {
    setAlgorithm('HS256');
    setHeaderJson(JSON.stringify(getDefaultHeader('HS256'), null, 2));
    setPayloadJson(JSON.stringify(getDefaultPayload(), null, 2));
    setSecret('your-256-bit-secret');
    setGeneratedToken(null);
    setError(null);
  }, []);

  const tokenParts = generatedToken ? generatedToken.split('.') : null;

  return (
    <div className="space-y-6">
      {/* Algorithm and Secret */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Algorithm
          </label>
          <select
            value={algorithm}
            onChange={(e) => handleAlgorithmChange(e.target.value as Algorithm)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="HS256">HS256</option>
            <option value="HS384">HS384</option>
            <option value="HS512">HS512</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Secret Key
          </label>
          <input
            type="text"
            value={secret}
            onChange={(e) => handleSecretChange(e.target.value)}
            placeholder="Enter your secret key"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Header Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Header</label>
          <CopyButton text={headerJson} />
        </div>
        <CodeEditor
          value={headerJson}
          onChange={handleHeaderChange}
          language="json"
          minHeight="80px"
        />
      </div>

      {/* Payload Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Payload</label>
          <CopyButton text={payloadJson} />
        </div>
        <CodeEditor
          value={payloadJson}
          onChange={handlePayloadChange}
          language="json"
          minHeight="120px"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Generate Button */}
      <div className="flex gap-3">
        <button
          onClick={handleGenerate}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Generate Token
        </button>
        <button
          onClick={loadSample}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          Load Sample
        </button>
      </div>

      {/* Generated Token */}
      {generatedToken && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="font-medium text-green-700 dark:text-green-400">Token Generated Successfully</span>
          </div>

          {/* Full Token */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Signed Token</label>
              <CopyButton text={generatedToken} />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <code className="font-mono text-sm text-gray-900 dark:text-gray-100 break-all">
                {generatedToken}
              </code>
            </div>
          </div>

          {/* Token Parts */}
          {tokenParts && tokenParts.length === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Header</label>
                  <CopyButton text={tokenParts[0]} />
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 border border-blue-100 dark:border-blue-800">
                  <code className="font-mono text-xs text-blue-900 dark:text-blue-200 break-all">
                    {tokenParts[0]}
                  </code>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Payload</label>
                  <CopyButton text={tokenParts[1]} />
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3 border border-purple-100 dark:border-purple-800">
                  <code className="font-mono text-xs text-purple-900 dark:text-purple-200 break-all">
                    {tokenParts[1]}
                  </code>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Signature</label>
                  <CopyButton text={tokenParts[2]} />
                </div>
                <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-3 border border-red-100 dark:border-red-800">
                  <code className="font-mono text-xs text-red-900 dark:text-red-200 break-all">
                    {tokenParts[2]}
                  </code>
                </div>
              </div>
            </div>
          )}

          {/* Decoded Header Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Decoded Header</label>
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
              <pre className="font-mono text-sm text-blue-900 dark:text-blue-200 whitespace-pre-wrap">
                {JSON.stringify(JSON.parse(atob(tokenParts![0].replace(/-/g, '+').replace(/_/g, '/'))), null, 2)}
              </pre>
            </div>
          </div>

          {/* Decoded Payload Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Decoded Payload</label>
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 border border-purple-100 dark:border-purple-800">
              <pre className="font-mono text-sm text-purple-900 dark:text-purple-200 whitespace-pre-wrap">
                {JSON.stringify(JSON.parse(atob(tokenParts![1].replace(/-/g, '+').replace(/_/g, '/'))), null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>Enter your header, payload, and secret key to generate a signed JWT token. The token will be signed using HMAC with the selected algorithm.</p>
      </div>
    </div>
  );
}
