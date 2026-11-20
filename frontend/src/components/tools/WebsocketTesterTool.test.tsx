import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import WebsocketTesterTool from './WebsocketTesterTool';

class MockWebSocket {
  static instances: MockWebSocket[] = [];
  url: string;
  protocols?: string | string[];
  protocol = '';
  readyState = 0;
  sent: string[] = [];
  closedWith: { code?: number; reason?: string } | null = null;
  onopen: ((ev: Event) => void) | null = null;
  onmessage: ((ev: MessageEvent) => void) | null = null;
  onerror: ((ev: Event) => void) | null = null;
  onclose: ((ev: CloseEvent) => void) | null = null;

  constructor(url: string, protocols?: string | string[]) {
    this.url = url;
    this.protocols = protocols;
    MockWebSocket.instances.push(this);
  }

  send(data: string) {
    this.sent.push(data);
  }

  close(code?: number, reason?: string) {
    this.closedWith = { code, reason };
    this.readyState = 3;
    this.onclose?.({ code: code ?? 1000, reason: reason ?? '' } as CloseEvent);
  }

  triggerOpen(protocol = '') {
    this.readyState = 1;
    this.protocol = protocol;
    this.onopen?.(new Event('open'));
  }

  triggerMessage(data: string) {
    this.onmessage?.({ data } as MessageEvent);
  }
}

describe('WebsocketTesterTool', () => {
  afterEach(() => {
    cleanup();
    MockWebSocket.instances = [];
    vi.unstubAllGlobals();
  });

  it('validates ws:// and wss:// URLs before connecting', () => {
    const wsSpy = vi.fn();
    vi.stubGlobal('WebSocket', wsSpy);

    render(<WebsocketTesterTool />);
    fireEvent.change(screen.getByLabelText('WebSocket URL'), {
      target: { value: 'https://example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Connect' }));

    expect(screen.getByRole('alert')).toHaveTextContent('ws:// or wss://');
    expect(wsSpy).not.toHaveBeenCalled();
  });

  it('connects, sends and receives messages, clears log, and closes on unmount', () => {
    vi.stubGlobal('WebSocket', MockWebSocket);

    const { unmount } = render(<WebsocketTesterTool />);
    fireEvent.change(screen.getByLabelText('Subprotocols (optional)'), {
      target: { value: 'json, custom' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Connect' }));

    const instance = MockWebSocket.instances[0];
    expect(instance.url).toBe('wss://echo.websocket.org/');
    expect(instance.protocols).toEqual(['json', 'custom']);
    expect(screen.getByTestId('ws-ready-state')).toHaveTextContent('CONNECTING');

    act(() => {
      instance.triggerOpen('json');
    });
    expect(screen.getByTestId('ws-ready-state')).toHaveTextContent('OPEN');

    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));
    expect(instance.sent).toEqual(['{"type":"ping"}']);

    act(() => {
      instance.triggerMessage('{"type":"pong"}');
    });
    expect(screen.getByText('{"type":"pong"}')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Clear Log' }));
    expect(screen.queryByText('{"type":"pong"}')).not.toBeInTheDocument();

    unmount();
    expect(instance.closedWith).not.toBeNull();
  });
});
