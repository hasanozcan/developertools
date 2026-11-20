import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SseStreamTesterTool from './SseStreamTesterTool';

class MockEventSource {
  static instances: MockEventSource[] = [];
  url: string;
  options?: EventSourceInit;
  closed = false;
  listeners = new Map<string, Set<EventListener>>();
  onopen: ((ev: Event) => void) | null = null;
  onmessage: ((ev: MessageEvent) => void) | null = null;
  onerror: ((ev: Event) => void) | null = null;

  constructor(url: string, options?: EventSourceInit) {
    this.url = url;
    this.options = options;
    MockEventSource.instances.push(this);
  }

  addEventListener(type: string, listener: EventListener) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type)!.add(listener);
  }

  removeEventListener(type: string, listener: EventListener) {
    this.listeners.get(type)?.delete(listener);
  }

  close() {
    this.closed = true;
  }

  emitOpen() {
    this.onopen?.(new Event('open'));
  }

  emitMessage(data: string, lastEventId = '') {
    this.onmessage?.({ type: 'message', data, lastEventId } as MessageEvent);
  }

  emitCustom(type: string, data: string, lastEventId = '') {
    const evt = { type, data, lastEventId } as unknown as Event;
    this.listeners.get(type)?.forEach((fn) => fn(evt));
  }

  emitError() {
    this.onerror?.(new Event('error'));
  }
}

describe('SseStreamTesterTool', () => {
  afterEach(() => {
    cleanup();
    MockEventSource.instances = [];
    vi.unstubAllGlobals();
  });

  it('rejects non-http(s) URLs before opening EventSource', () => {
    const esSpy = vi.fn();
    vi.stubGlobal('EventSource', esSpy);

    render(<SseStreamTesterTool />);
    fireEvent.change(screen.getByLabelText('EventSource URL'), {
      target: { value: 'ws://example.com/events' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Connect Stream' }));

    expect(screen.getByRole('alert')).toHaveTextContent('http:// or https://');
    expect(esSpy).not.toHaveBeenCalled();
  });

  it('connects with withCredentials, captures default and custom events, shows CORS error hint, and cleans up on unmount', () => {
    vi.stubGlobal('EventSource', MockEventSource);

    const { unmount } = render(<SseStreamTesterTool />);
    fireEvent.click(screen.getByLabelText('Send credentials (withCredentials)'));
    fireEvent.change(screen.getByLabelText('Custom Event Listeners (comma-separated)'), {
      target: { value: 'ping, stock_tick' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Connect Stream' }));

    const instance = MockEventSource.instances[0];
    expect(instance.url).toBe('https://api.example.com/events');
    expect(instance.options).toEqual({ withCredentials: true });
    expect(screen.getByTestId('sse-status')).toHaveTextContent('Connecting');

    act(() => {
      instance.emitOpen();
      instance.emitMessage('hello world', '42');
      instance.emitCustom('stock_tick', '{"price":123}', '43');
    });

    expect(screen.getByTestId('sse-status')).toHaveTextContent('Connected');
    expect(screen.getByText('hello world')).toBeInTheDocument();
    expect(screen.getByText('{"price":123}')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Filter stream events'), {
      target: { value: 'stock_tick' },
    });
    expect(screen.queryByText('hello world')).not.toBeInTheDocument();
    expect(screen.getByText('{"price":123}')).toBeInTheDocument();

    act(() => {
      instance.emitError();
    });
    expect(screen.getByTestId('sse-status')).toHaveTextContent('Error');
    expect(screen.getByRole('alert')).toHaveTextContent('Access-Control-Allow-Credentials');

    unmount();
    expect(instance.closed).toBe(true);
  });
});
