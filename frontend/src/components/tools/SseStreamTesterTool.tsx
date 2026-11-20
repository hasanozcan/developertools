'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Radio, Square, Trash2 } from 'lucide-react';

type SseStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

interface SseEventLog {
  id: number;
  timestamp: string;
  eventType: string;
  lastEventId: string;
  data: string;
}

function validateSseUrl(
  rawUrl: string,
): { valid: true; url: string } | { valid: false; error: string } {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter an HTTP or HTTPS EventSource URL.' };
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return {
        valid: false,
        error: `Unsupported protocol "${parsed.protocol}". EventSource requires http:// or https://.`,
      };
    }
    return { valid: true, url: parsed.toString() };
  } catch {
    return { valid: false, error: 'Invalid URL format. Example: https://api.example.com/events' };
  }
}

function statusBadge(status: SseStatus): { label: string; className: string } {
  switch (status) {
    case 'connecting':
      return {
        label: 'Connecting',
        className: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
      };
    case 'connected':
      return {
        label: 'Connected',
        className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
      };
    case 'error':
      return {
        label: 'Error',
        className: 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300',
      };
    default:
      return {
        label: 'Disconnected',
        className: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
      };
  }
}

export default function SseStreamTesterTool() {
  const [url, setUrl] = useState('https://api.example.com/events');
  const [withCredentials, setWithCredentials] = useState(false);
  const [customEventsInput, setCustomEventsInput] = useState('ping, update');
  const [eventFilter, setEventFilter] = useState('');
  const [status, setStatus] = useState<SseStatus>('disconnected');
  const [errorHint, setErrorHint] = useState<string | null>(null);
  const [events, setEvents] = useState<SseEventLog[]>([]);

  const sourceRef = useRef<EventSource | null>(null);
  const listenersRef = useRef<Array<{ name: string; handler: EventListener }>>([]);
  const nextId = useRef(1);

  const cleanupSource = useCallback(() => {
    const current = sourceRef.current;
    if (current) {
      for (const { name, handler } of listenersRef.current) {
        current.removeEventListener(name, handler);
      }
      listenersRef.current = [];
      current.onopen = null;
      current.onmessage = null;
      current.onerror = null;
      try {
        current.close();
      } catch {
        // Ignore teardown errors.
      }
      sourceRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      cleanupSource();
    };
  }, [cleanupSource]);

  const appendEvent = useCallback((eventType: string, data: string, lastEventId = '') => {
    const id = nextId.current++;
    const timestamp = new Date().toLocaleTimeString([], { hour12: false });
    setEvents((prev) => [{ id, timestamp, eventType, lastEventId, data }, ...prev].slice(0, 200));
  }, []);

  const handleToggleStream = () => {
    if (status === 'connecting' || status === 'connected') {
      cleanupSource();
      setStatus('disconnected');
      return;
    }

    const check = validateSseUrl(url);
    if (!check.valid) {
      setErrorHint(check.error);
      setStatus('error');
      return;
    }

    if (typeof EventSource === 'undefined') {
      setErrorHint('EventSource API is unavailable in this environment.');
      setStatus('error');
      return;
    }

    setErrorHint(null);
    cleanupSource();
    setStatus('connecting');

    try {
      const es = new EventSource(check.url, { withCredentials });
      sourceRef.current = es;

      es.onopen = () => {
        if (sourceRef.current !== es) return;
        setStatus('connected');
        setErrorHint(null);
      };

      es.onmessage = (event: MessageEvent) => {
        if (sourceRef.current !== es) return;
        appendEvent(event.type || 'message', String(event.data ?? ''), event.lastEventId ?? '');
      };

      const customNames = Array.from(
        new Set(
          customEventsInput
            .split(',')
            .map((s) => s.trim())
            .filter((name) => name.length > 0 && name !== 'message'),
        ),
      );

      for (const eventName of customNames) {
        const handler: EventListener = (evt) => {
          if (sourceRef.current !== es) return;
          const msgEvt = evt as MessageEvent;
          appendEvent(eventName, String(msgEvt.data ?? ''), msgEvt.lastEventId ?? '');
        };
        es.addEventListener(eventName, handler);
        listenersRef.current.push({ name: eventName, handler });
      }

      es.onerror = () => {
        if (sourceRef.current !== es) return;
        setStatus('error');
        setErrorHint(
          'Stream connection failed or closed. Browsers suppress CORS and HTTP status details on EventSource errors: verify the server returns Content-Type: text/event-stream, sends Access-Control-Allow-Origin matching this site' +
            (withCredentials ? ', and sets Access-Control-Allow-Credentials: true' : '') +
            '.',
        );
      };
    } catch (err) {
      setStatus('error');
      setErrorHint(err instanceof Error ? err.message : 'Failed to initialize EventSource.');
    }
  };

  const filteredEvents = useMemo(() => {
    const needle = eventFilter.trim().toLowerCase();
    if (!needle) return events;
    return events.filter(
      (ev) => ev.eventType.toLowerCase().includes(needle) || ev.data.toLowerCase().includes(needle),
    );
  }, [events, eventFilter]);

  const badge = statusBadge(status);
  const isActive = status === 'connecting' || status === 'connected';

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Stream Status
          </span>
          <span
            data-testid="sse-status"
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${badge.className}`}
          >
            {badge.label}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="sse-url-input"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              EventSource URL
            </label>
            <input
              id="sse-url-input"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isActive}
              placeholder="https://api.example.com/events"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-mono disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="sse-custom-events-input"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Custom Event Listeners (comma-separated)
            </label>
            <input
              id="sse-custom-events-input"
              type="text"
              value={customEventsInput}
              onChange={(e) => setCustomEventsInput(e.target.value)}
              disabled={isActive}
              placeholder="ping, update, notification"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-mono disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={withCredentials}
              onChange={(e) => setWithCredentials(e.target.checked)}
              disabled={isActive}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            Send credentials (withCredentials)
          </label>

          <button
            type="button"
            onClick={handleToggleStream}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-white transition-colors ${
              isActive ? 'bg-rose-600 hover:bg-rose-700' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isActive ? <Square className="h-3.5 w-3.5" /> : <Radio className="h-4 w-4" />}
            {isActive ? 'Disconnect' : 'Connect Stream'}
          </button>
        </div>

        {errorHint && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
          >
            {errorHint}
          </div>
        )}
      </div>

      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            Stream Events ({filteredEvents.length})
          </h3>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              placeholder="Filter by event or payload..."
              aria-label="Filter stream events"
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-900"
            />
            <button
              type="button"
              onClick={() => setEvents([])}
              disabled={events.length === 0}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear Log
            </button>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
            No SSE events received yet.
          </p>
        ) : (
          <ul className="max-h-80 space-y-2 overflow-y-auto pr-1" aria-label="SSE stream log">
            {filteredEvents.map((ev) => (
              <li
                key={ev.id}
                className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 text-xs dark:border-slate-800 dark:bg-slate-900/70"
              >
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                    event: {ev.eventType}
                  </span>
                  {ev.lastEventId && (
                    <span className="rounded bg-slate-200 px-1.5 py-0.5 font-mono text-[10px] text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      id: {ev.lastEventId}
                    </span>
                  )}
                  <span className="font-mono text-[11px] text-slate-400">{ev.timestamp}</span>
                </div>
                <pre className="whitespace-pre-wrap break-all font-mono text-xs text-slate-800 dark:text-slate-200">
                  {ev.data}
                </pre>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
