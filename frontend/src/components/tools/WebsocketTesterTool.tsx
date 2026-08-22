'use client';
import React, { useState } from 'react';

export default function WebsocketTesterTool() {
  const [url, setUrl] = useState('wss://echo.websocket.org');
  const [msg, setMsg] = useState('{"type":"ping"}');

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full rounded-xl border p-2 text-xs font-mono" />
        <textarea rows={4} value={msg} onChange={(e) => setMsg(e.target.value)} className="w-full rounded-xl border p-3 font-mono text-xs" />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">Connect & Send</button>
      </div>
    </div>
  );
}
