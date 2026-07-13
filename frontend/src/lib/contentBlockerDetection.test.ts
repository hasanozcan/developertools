import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { detectContentBlocker, probeScriptResource } from './contentBlockerDetection';

function mockBaitSize(size: number) {
  vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(size);
  vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(size);
  vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(size);
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(size);
}

describe('detectContentBlocker', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    mockBaitSize(1);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('returns clear when the bait and AdSense script request are available', async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue({} as Response);
    const scriptProbeImpl = vi.fn().mockResolvedValue('reachable' as const);

    await expect(
      detectContentBlocker('ca-pub-123', { fetchImpl, scriptProbeImpl, baitSettleMs: 0 }),
    ).resolves.toBe('clear');

    expect(scriptProbeImpl).toHaveBeenCalledWith(
      expect.stringContaining('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'),
      2500,
    );
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(document.querySelector('.adsbox')).toBeNull();
  });

  it('does not flag a visible bordered bait with a zero-sized content box', async () => {
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(0);
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(0);
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue({} as Response);
    const scriptProbeImpl = vi.fn().mockResolvedValue('reachable' as const);

    await expect(
      detectContentBlocker('ca-pub-123', { fetchImpl, scriptProbeImpl, baitSettleMs: 0 }),
    ).resolves.toBe('clear');
  });

  it('returns blocked and removes a hidden bait without a network probe', async () => {
    vi.restoreAllMocks();
    mockBaitSize(0);
    const fetchImpl = vi.fn<typeof fetch>();
    const scriptProbeImpl = vi.fn();

    await expect(
      detectContentBlocker('ca-pub-123', { fetchImpl, scriptProbeImpl, baitSettleMs: 0 }),
    ).resolves.toBe('blocked');

    expect(fetchImpl).not.toHaveBeenCalled();
    expect(scriptProbeImpl).not.toHaveBeenCalled();
    expect(document.querySelector('.adsbox')).toBeNull();
  });

  it('returns blocked when only the AdSense script request fails', async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue({} as Response);
    const scriptProbeImpl = vi.fn().mockResolvedValue('failed' as const);

    await expect(
      detectContentBlocker('ca-pub-123', { fetchImpl, scriptProbeImpl, baitSettleMs: 0 }),
    ).resolves.toBe('blocked');

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(String(fetchImpl.mock.calls[0][0])).toContain('/favicon.svg?content_blocker_probe=');
  });

  it('returns unknown when both ad and same-origin requests fail', async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockRejectedValue(new TypeError('offline'));
    const scriptProbeImpl = vi.fn().mockResolvedValue('failed' as const);

    await expect(
      detectContentBlocker('ca-pub-123', { fetchImpl, scriptProbeImpl, baitSettleMs: 0 }),
    ).resolves.toBe('unknown');

    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('returns unknown and aborts a hanging same-origin request', async () => {
    let wasAborted = false;
    const scriptProbeImpl = vi.fn().mockResolvedValue('failed' as const);
    const fetchImpl = vi.fn<typeof fetch>().mockImplementation((_input, init) => {
      return new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => {
          wasAborted = true;
          reject(new DOMException('Aborted', 'AbortError'));
        });
      });
    });

    await expect(
      detectContentBlocker('ca-pub-123', {
        fetchImpl,
        scriptProbeImpl,
        baitSettleMs: 0,
        networkTimeoutMs: 5,
      }),
    ).resolves.toBe('unknown');

    expect(wasAborted).toBe(true);
    expect(document.querySelector('.adsbox')).toBeNull();
  });

  it('returns unknown when the AdSense script request times out', async () => {
    const fetchImpl = vi.fn<typeof fetch>();
    const scriptProbeImpl = vi.fn().mockResolvedValue('timeout' as const);

    await expect(
      detectContentBlocker('ca-pub-123', { fetchImpl, scriptProbeImpl, baitSettleMs: 0 }),
    ).resolves.toBe('unknown');

    expect(fetchImpl).not.toHaveBeenCalled();
  });
});

describe('probeScriptResource', () => {
  afterEach(() => {
    document.querySelectorAll('[data-content-blocker-probe="script"]').forEach((node) => node.remove());
  });

  it('uses a non-executing script preload and removes it after load', async () => {
    const result = probeScriptResource('https://example.com/ad.js', 100);
    const preload = document.querySelector<HTMLLinkElement>(
      'link[data-content-blocker-probe="script"]',
    );

    expect(preload).not.toBeNull();
    expect(preload).toHaveAttribute('rel', 'preload');
    expect(preload).toHaveAttribute('as', 'script');
    preload?.dispatchEvent(new Event('load'));

    await expect(result).resolves.toBe('reachable');
    expect(preload?.isConnected).toBe(false);
  });

  it('reports failed requests and removes the preload', async () => {
    const result = probeScriptResource('https://example.com/ad.js', 100);
    const preload = document.querySelector<HTMLLinkElement>(
      'link[data-content-blocker-probe="script"]',
    );

    preload?.dispatchEvent(new Event('error'));

    await expect(result).resolves.toBe('failed');
    expect(preload?.isConnected).toBe(false);
  });

  it('times out and removes a preload that never settles', async () => {
    const result = probeScriptResource('https://example.com/ad.js', 5);
    const preload = document.querySelector<HTMLLinkElement>(
      'link[data-content-blocker-probe="script"]',
    );

    await expect(result).resolves.toBe('timeout');
    expect(preload?.isConnected).toBe(false);
  });
});
