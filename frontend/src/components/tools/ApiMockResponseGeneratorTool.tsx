'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, RefreshCw, Layers } from 'lucide-react';
import { generateMockData, MockDatasetType } from '@/lib/apiMockResponseGenerator';

export default function ApiMockResponseGeneratorTool() {
  const [type, setType] = useState<MockDatasetType>('users');
  const [count, setCount] = useState<number>(5);
  const [includePagination, setIncludePagination] = useState<boolean>(true);
  const [statusCode, setStatusCode] = useState<number>(200);
  const [copied, setCopied] = useState(false);

  const mockJson = useMemo(() => {
    const data = generateMockData({
      type,
      count,
      statusCode,
      includePagination,
      page: 1,
      perPage: count,
    });
    return JSON.stringify(data, null, 2);
  }, [type, count, statusCode, includePagination]);

  const handleCopy = () => {
    navigator.clipboard.writeText(mockJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between p-4 rounded-xl bg-card border border-border">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Dataset Entity</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as MockDatasetType)}
              className="select select-bordered select-sm"
            >
              <option value="users">Users & Profiles</option>
              <option value="products">E-Commerce Products</option>
              <option value="orders">Orders & Cart</option>
              <option value="posts">Blog Posts & Articles</option>
              <option value="transactions">Financial Transactions</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-muted-foreground block mb-1">Items Count ({count})</label>
            <input
              type="range"
              min="1"
              max="25"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value, 10))}
              className="range range-primary range-sm w-36"
            />
          </div>

          <div>
            <label className="text-xs text-muted-foreground block mb-1">HTTP Status</label>
            <select
              value={statusCode}
              onChange={(e) => setStatusCode(parseInt(e.target.value, 10))}
              className="select select-bordered select-sm"
            >
              <option value={200}>200 OK</option>
              <option value={201}>201 Created</option>
              <option value={400}>400 Bad Request</option>
              <option value={404}>404 Not Found</option>
            </select>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              id="includePag"
              checked={includePagination}
              onChange={(e) => setIncludePagination(e.target.checked)}
              className="checkbox checkbox-primary checkbox-sm"
            />
            <label htmlFor="includePag" className="text-xs text-muted-foreground cursor-pointer">
              Wrap with Pagination Envelope
            </label>
          </div>
        </div>

        <button onClick={handleCopy} className="btn btn-primary btn-sm gap-2">
          {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied JSON' : 'Copy Mock Response'}
        </button>
      </div>

      <div className="relative">
        <textarea
          readOnly
          value={mockJson}
          className="textarea textarea-bordered w-full h-[450px] font-mono text-xs leading-relaxed bg-muted/30"
        />
      </div>
    </div>
  );
}
