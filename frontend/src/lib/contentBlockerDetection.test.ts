import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { detectContentBlocker, probeAdSenseRuntime } from './contentBlockerDetection';

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

  it('returns clear when the bait and AdSense runtime are available', async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue({} as Response);
    const runtimeProbeImpl = vi.fn().mockResolvedValue('reachable' as const);

    await expect(
      detectContentBlocker('ca-pub-123', { fetchImpl, runtimeProbeImpl, baitSettleMs: 0 }),
    ).resolves.toBe('clear');

    expect(runtimeProbeImpl).toHaveBeenCalledWith(2500);
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(document.querySelector('.adsbox')).toBeNull();
  });

  it('does not flag a visible bordered bait with a zero-sized content box', async () => {
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(0);
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(0);
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue({} as Response);
    const runtimeProbeImpl = vi.fn().mockResolvedValue('reachable' as const);

    await expect(
      detectContentBlocker('ca-pub-123', { fetchImpl, runtimeProbeImpl, baitSettleMs: 0 }),
    ).resolves.toBe('clear');
  });

  it('returns blocked and removes a hidden bait without a network probe', async () => {
    vi.restoreAllMocks();
    mockBaitSize(0);
    const fetchImpl = vi.fn<typeof fetch>();
    const runtimeProbeImpl = vi.fn();

    await expect(
      detectContentBlocker('ca-pub-123', { fetchImpl, runtimeProbeImpl, baitSettleMs: 0 }),
    ).resolves.toBe('blocked');

    expect(fetchImpl).not.toHaveBeenCalled();
    expect(runtimeProbeImpl).not.toHaveBeenCalled();
    expect(document.querySelector('.adsbox')).toBeNull();
  });

  it('returns blocked when the AdSense script request explicitly fails and same-origin is reachable', async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockImplementation(async (input) => {
      const url = String(input);
      if (url.includes('pagead2.googlesyndication.com')) {
        throw new TypeError('Failed to fetch');
      }
      return {} as Response;
    });
    const runtimeProbeImpl = vi.fn().mockResolvedValue('timeout' as const);

    await expect(
      detectContentBlocker('ca-pub-123', { fetchImpl, runtimeProbeImpl, baitSettleMs: 0 }),
    ).resolves.toBe('blocked');

    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it('returns clear without blocking users when the AdSense runtime times out but direct script is reachable', async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue({} as Response);
    const runtimeProbeImpl = vi.fn().mockResolvedValue('timeout' as const);

    await expect(
      detectContentBlocker('ca-pub-123', { fetchImpl, runtimeProbeImpl, baitSettleMs: 0 }),
    ).resolves.toBe('clear');
  });

  it('returns unknown when both ad and same-origin requests fail', async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockRejectedValue(new TypeError('offline'));
    const runtimeProbeImpl = vi.fn().mockResolvedValue('timeout' as const);

    await expect(
      detectContentBlocker('ca-pub-123', { fetchImpl, runtimeProbeImpl, baitSettleMs: 0 }),
    ).resolves.toBe('unknown');

    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('returns unknown and aborts a hanging same-origin request', async () => {
    let wasAborted = false;
    const runtimeProbeImpl = vi.fn().mockResolvedValue('timeout' as const);
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
        runtimeProbeImpl,
        baitSettleMs: 0,
        networkTimeoutMs: 5,
      }),
    ).resolves.toBe('unknown');

    expect(wasAborted).toBe(true);
    expect(document.querySelector('.adsbox')).toBeNull();
  });
});

describe('probeAdSenseRuntime', () => {
  afterEach(() => {
    Reflect.deleteProperty(window, 'adsbygoogle');
  });

  it('returns reachable when the real AdSense runtime is loaded', async () => {
    Reflect.set(window, 'adsbygoogle', { loaded: true });

    await expect(probeAdSenseRuntime(100)).resolves.toBe('reachable');
  });

  it('observes the AdSense runtime becoming ready', async () => {
    const result = probeAdSenseRuntime(200);

    setTimeout(() => Reflect.set(window, 'adsbygoogle', { loaded: true }), 10);

    await expect(result).resolves.toBe('reachable');
  });

  it('times out when the AdSense runtime never loads', async () => {
    await expect(probeAdSenseRuntime(5)).resolves.toBe('timeout');
  });
});
