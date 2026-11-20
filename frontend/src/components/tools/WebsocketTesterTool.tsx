'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Plug, PlugZap, Send, Trash2 } from 'lucide-react';

type LogKind = 'system' | 'sent' | 'received' | 'error';

interface LogEntry {
  id: number;
  timestamp: string;
  kind: LogKind;
  message: string;
}

const WS_CONNECTING = 0;
const WS_OPEN = 1;
const WS_CLOSING = 2;
const WS_CLOSED = 3;

function formatTime(): string {
  return new Date().toLocaleTimeString([], { hour12: false });
}

function validateWebSocketUrl(
  rawUrl: string,
): { valid: true; url: string } | { valid: false; error: string } {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter a WebSocket URL starting with ws:// or wss://.' };
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'ws:' && parsed.protocol !== 'wss:') {
      return {
        valid: false,
        error: `Unsupported protocol "${parsed.protocol}". WebSocket URLs must use ws:// or wss://.`,
      };
    }
    return { valid: true, url: parsed.toString() };
  } catch {
    return { valid: false, error: 'Invalid URL format. Example: wss://echo.websocket.org' };
  }
}

function readyStateMeta(state: number): { label: string; className: string } {
  switch (state) {
    case WS_CONNECTING:
      return {
        label: 'CONNECTING',
        className: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
      };
    case WS_OPEN:
      return {
        label: 'OPEN',
        className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
      };
    case WS_CLOSING:
      return {
        label: 'CLOSING',
        className: 'bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300',
      };
    default:
      return {
        label: 'CLOSED',
        className: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
      };
  }
}

export default function WebsocketTesterTool() {
  const [url, setUrl] = useState('wss://echo.websocket.org');
  const [protocolsInput, setProtocolsInput] = useState('');
  const [msg, setMsg] = useState('{"type":"ping"}');
  const [readyState, setReadyState] = useState<number>(WS_CLOSED);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const nextLogId = useRef(1);

  const appendLog = useCallback((kind: LogKind, message: string) => {
    const id = nextLogId.current++;
    setLogs((prev) => [{ id, timestamp: formatTime(), kind, message }, ...prev].slice(0, 200));
  }, []);

  const closeActiveSocket = useCallback(() => {
    const current = wsRef.current;
    if (current) {
      wsRef.current = null;
      current.onopen = null;
      current.onmessage = null;
      current.onerror = null;
      current.onclose = null;
      try {
        if (current.readyState === WS_CONNECTING || current.readyState === WS_OPEN) {
          current.close(1000, 'Client disconnected');
        }
      } catch {
        // Ignore close errors during teardown.
      }
    }
    setReadyState(WS_CLOSED);
  }, []);

  useEffect(() => {
    return () => {
      closeActiveSocket();
    };
  }, [closeActiveSocket]);

  const handleConnectToggle = () => {
    if (readyState === WS_CONNECTING || readyState === WS_OPEN) {
      const current = wsRef.current;
      if (current) {
        setReadyState(WS_CLOSING);
        current.close(1000, 'Closed by user');
      } else {
        setReadyState(WS_CLOSED);
      }
      return;
    }

    const check = validateWebSocketUrl(url);
    if (!check.valid) {
      setError(check.error);
      return;
    }

    if (typeof WebSocket === 'undefined') {
      setError('WebSocket API is unavailable in this environment.');
      return;
    }

    setError(null);
    closeActiveSocket();

    const protocols = protocolsInput
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean);

    try {
      const socket =
        protocols.length > 0 ? new WebSocket(check.url, protocols) : new WebSocket(check.url);
      wsRef.current = socket;
      setReadyState(socket.readyState ?? WS_CONNECTING);
      appendLog(
        'system',
        `Connecting to ${check.url}${protocols.length > 0 ? ` (protocols: ${protocols.join(', ')})` : ''}...`,
      );

      socket.onopen = () => {
        if (wsRef.current !== socket) return;
        setReadyState(socket.readyState ?? WS_OPEN);
        const negotiated = socket.protocol ? ` [protocol: ${socket.protocol}]` : '';
        appendLog('system', `Connected${negotiated}`);
      };

      socket.onmessage = async (event: MessageEvent) => {
        if (wsRef.current !== socket) return;
        const data = event.data;
        if (typeof data === 'string') {
          appendLog('received', data);
        } else if (data instanceof ArrayBuffer) {
          const decoded = new TextDecoder().decode(new Uint8Array(data));
          appendLog('received', `[ArrayBuffer ${data.byteLength} bytes] ${decoded}`);
        } else if (typeof Blob !== 'undefined' && data instanceof Blob) {
          const text = await data.text();
          appendLog('received', `[Blob ${data.size} bytes] ${text}`);
        } else {
          appendLog('received', String(data));
        }
      };

      socket.onerror = () => {
        if (wsRef.current !== socket) return;
        const msgText =
          'WebSocket connection error. Verify the endpoint accepts ws:// or wss:// connections and allows this origin.';
        setError(msgText);
        appendLog('error', msgText);
      };

      socket.onclose = (event: CloseEvent) => {
        if (wsRef.current !== socket) return;
        wsRef.current = null;
        setReadyState(WS_CLOSED);
        const reason = event.reason ? ` (${event.reason})` : '';
        appendLog('system', `Disconnected (code ${event.code}${reason})`);
      };
    } catch (err) {
      const errMessage =
        err instanceof Error ? err.message : 'Failed to open WebSocket connection.';
      setError(errMessage);
      appendLog('error', errMessage);
      setReadyState(WS_CLOSED);
    }
  };

  const handleSend = () => {
    const socket = wsRef.current;
    if (!socket || readyState !== WS_OPEN) {
      setError('Connect to a WebSocket server before sending a message.');
      return;
    }
    try {
      setError(null);
      socket.send(msg);
      appendLog('sent', msg);
    } catch (err) {
      const errMessage = err instanceof Error ? err.message : 'Failed to send WebSocket message.';
      setError(errMessage);
      appendLog('error', errMessage);
    }
  };

  const status = readyStateMeta(readyState);
  const isConnectedOrConnecting = readyState === WS_CONNECTING || readyState === WS_OPEN;

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Connection Status
          </span>
          <span
            data-testid="ws-ready-state"
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${status.className}`}
          >
            {status.label}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 space-y-1.5">
            <label
              htmlFor="ws-url-input"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              WebSocket URL
            </label>
            <input
              id="ws-url-input"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isConnectedOrConnecting}
              placeholder="wss://echo.websocket.org"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-mono disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900"
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="ws-protocols-input"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Subprotocols (optional)
            </label>
            <input
              id="ws-protocols-input"
              type="text"
              value={protocolsInput}
              onChange={(e) => setProtocolsInput(e.target.value)}
              disabled={isConnectedOrConnecting}
              placeholder="json, graphql-ws"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-mono disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleConnectToggle}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-white transition-colors ${
              isConnectedOrConnecting
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isConnectedOrConnecting ? (
              <PlugZap className="h-4 w-4" />
            ) : (
              <Plug className="h-4 w-4" />
            )}
            {isConnectedOrConnecting ? 'Disconnect' : 'Connect'}
          </button>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
          >
            {error}
          </div>
        )}

        <div className="space-y-2 pt-2 border-t border-slate-200/70 dark:border-slate-800">
          <label
            htmlFor="ws-message-input"
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            Message Payload
          </label>
          <textarea
            id="ws-message-input"
            rows={4}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={readyState !== WS_OPEN}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />
            Send Message
          </button>
        </div>
      </div>

      <div className="surface-card rounded-2xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            Event Log ({logs.length})
          </h3>
          <button
            type="button"
            onClick={() => setLogs([])}
            disabled={logs.length === 0}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear Log
          </button>
        </div>

        {logs.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
            No WebSocket events yet. Click Connect to open a live session.
          </p>
        ) : (
          <ul className="max-h-72 space-y-2 overflow-y-auto pr-1" aria-label="WebSocket event log">
            {logs.map((entry) => {
              const badgeClass =
                entry.kind === 'sent'
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                  : entry.kind === 'received'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : entry.kind === 'error'
                      ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';
              return (
                <li
                  key={entry.id}
                  className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 text-xs dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <div className="mb-1 flex items-center gap-2">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${badgeClass}`}
                    >
                      {entry.kind}
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">{entry.timestamp}</span>
                  </div>
                  <pre className="whitespace-pre-wrap break-all font-mono text-xs text-slate-800 dark:text-slate-200">
                    {entry.message}
                  </pre>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
