import { act, fireEvent, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import AdSenseScriptLoader, { ADSENSE_SCRIPT_READY_EVENT } from './AdSenseScriptLoader';

const { trackProductEventMock } = vi.hoisted(() => ({
  trackProductEventMock: vi.fn(),
}));

vi.mock('@/lib/analytics', () => ({
  trackProductEvent: trackProductEventMock,
}));

describe('AdSenseScriptLoader', () => {
  beforeEach(() => {
    trackProductEventMock.mockReset();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    document.querySelectorAll('script[data-devstools-adsense-loader="true"]').forEach((script) => script.remove());
  });

  it('retries a failed script load and announces readiness after recovery', async () => {
    const ready = vi.fn();
    window.addEventListener(ADSENSE_SCRIPT_READY_EVENT, ready);
    render(<AdSenseScriptLoader clientId="ca-pub-123" />);

    const first = document.querySelector<HTMLScriptElement>('script[data-devstools-adsense-loader="true"]');
    expect(first).toHaveAttribute('data-attempt', '1');
    fireEvent.error(first!);

    expect(trackProductEventMock).toHaveBeenCalledWith('adsense_script_load_failed', { attempt: 1 });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1500);
    });

    const second = document.querySelector<HTMLScriptElement>('script[data-devstools-adsense-loader="true"]');
    expect(second).not.toBe(first);
    expect(second).toHaveAttribute('data-attempt', '2');
    fireEvent.load(second!);

    expect(ready).toHaveBeenCalledTimes(1);
    expect(trackProductEventMock).toHaveBeenCalledWith('adsense_script_loaded', { attempt: 2 });
    window.removeEventListener(ADSENSE_SCRIPT_READY_EVENT, ready);
  });

  it('restarts the retry cycle when connectivity returns', async () => {
    render(<AdSenseScriptLoader clientId="ca-pub-123" />);
    fireEvent.error(document.querySelector('script[data-devstools-adsense-loader="true"]')!);

    await act(async () => {
      window.dispatchEvent(new Event('online'));
    });

    expect(document.querySelector('script[data-devstools-adsense-loader="true"]')).toHaveAttribute(
      'data-attempt',
      '1',
    );
  });
});
