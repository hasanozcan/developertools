'use client';

import { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';
import { trackCurrentToolEvent } from '@/lib/analytics';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export default function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    trackCurrentToolEvent('tool_copied');
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md
        bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors ${className}`}
      disabled={!text}
      aria-live="polite"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-500" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          Copy
        </>
      )}
    </button>
  );
}
