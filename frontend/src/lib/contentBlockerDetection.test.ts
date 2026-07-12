import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { detectContentBlocker } from './contentBlockerDetection';

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

  it('returns clear when the bait and AdSense request are available', async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue({} as Response);

    await expect(detectContentBlocker('ca-pub-123', { fetchImpl, baitSettleMs: 0 })).resolves.toBe(
      'clear',
    );

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(document.querySelector('.adsbox')).toBeNull();
  });

  it('does not flag a visible bordered bait with a zero-sized content box', async () => {
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(0);
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(0);
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue({} as Response);

    await expect(detectContentBlocker('ca-pub-123', { fetchImpl, baitSettleMs: 0 })).resolves.toBe(
      'clear',
    );
  });

  it('returns blocked and removes a hidden bait without a network probe', async () => {
    vi.restoreAllMocks();
    mockBaitSize(0);
    const fetchImpl = vi.fn<typeof fetch>();

    await expect(detectContentBlocker('ca-pub-123', { fetchImpl, baitSettleMs: 0 })).resolves.toBe(
      'blocked',
    );

    expect(fetchImpl).not.toHaveBeenCalled();
    expect(document.querySelector('.adsbox')).toBeNull();
  });

  it('returns blocked when only the AdSense request fails', async () => {
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockRejectedValueOnce(new TypeError('blocked'))
      .mockResolvedValueOnce({} as Response);

    await expect(detectContentBlocker('ca-pub-123', { fetchImpl, baitSettleMs: 0 })).resolves.toBe(
      'blocked',
    );

    expect(fetchImpl).toHaveBeenCalledTimes(2);
    expect(String(fetchImpl.mock.calls[1][0])).toContain('/favicon.svg?content_blocker_probe=');
  });

  it('returns unknown when both ad and same-origin requests fail', async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockRejectedValue(new TypeError('offline'));

    await expect(detectContentBlocker('ca-pub-123', { fetchImpl, baitSettleMs: 0 })).resolves.toBe(
      'unknown',
    );

    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it('returns unknown and aborts a hanging ad request', async () => {
    let wasAborted = false;
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
        baitSettleMs: 0,
        networkTimeoutMs: 5,
      }),
    ).resolves.toBe('unknown');

    expect(wasAborted).toBe(true);
    expect(document.querySelector('.adsbox')).toBeNull();
  });
});
