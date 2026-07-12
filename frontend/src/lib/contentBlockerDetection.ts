const DEFAULT_BAIT_SETTLE_MS = 300;
const DEFAULT_NETWORK_TIMEOUT_MS = 2500;

type FetchLike = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
type ProbeResult = 'reachable' | 'failed' | 'timeout';

export type ContentBlockerDetection = 'clear' | 'blocked' | 'unknown';

interface DetectionOptions {
  fetchImpl?: FetchLike;
  baitSettleMs?: number;
  networkTimeoutMs?: number;
  now?: () => number;
}

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function applyBaitStyles(element: HTMLElement) {
  element.style.position = 'absolute';
  element.style.top = '-10000px';
  element.style.left = '-10000px';
  element.style.width = '1px';
  element.style.height = '1px';
  element.style.pointerEvents = 'none';
}

function isBaitBlocked(element: HTMLElement) {
  if (!element.isConnected) return true;

  const computed = window.getComputedStyle(element);
  return (
    computed.display === 'none' ||
    computed.visibility === 'hidden' ||
    element.offsetHeight === 0 ||
    element.offsetWidth === 0
  );
}

async function probeUrl(
  fetchImpl: FetchLike,
  url: string,
  timeoutMs: number,
  init: RequestInit,
): Promise<ProbeResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    await fetchImpl(url, { ...init, signal: controller.signal });
    return 'reachable';
  } catch (error) {
    if (
      controller.signal.aborted ||
      (error instanceof DOMException && error.name === 'AbortError')
    ) {
      return 'timeout';
    }
    return 'failed';
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Detects content filtering with a DOM bait and an AdSense network probe.
 * A same-origin probe distinguishes blocking from a general connection error.
 */
export async function detectContentBlocker(
  adClient: string,
  options: DetectionOptions = {},
): Promise<ContentBlockerDetection> {
  const {
    fetchImpl = globalThis.fetch?.bind(globalThis),
    baitSettleMs = DEFAULT_BAIT_SETTLE_MS,
    networkTimeoutMs = DEFAULT_NETWORK_TIMEOUT_MS,
    now = Date.now,
  } = options;

  const bait = document.createElement('div');
  bait.id = 'ad-banner';
  bait.className = 'adsbox adsbygoogle ad-placement banner-ad advertisement pub_300x250 text-ad';
  bait.setAttribute('data-ad-client', adClient);
  bait.setAttribute('data-ad-slot', '0000000000');
  bait.setAttribute('aria-hidden', 'true');
  applyBaitStyles(bait);
  bait.textContent = '\u00a0';
  document.body.appendChild(bait);

  try {
    await wait(baitSettleMs);
    if (isBaitBlocked(bait)) return 'blocked';
    if (!fetchImpl) return 'unknown';

    const nonce = now();
    const adUrl =
      `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js` +
      `?client=${encodeURIComponent(adClient)}&adblock_probe=${nonce}`;
    const adProbe = await probeUrl(fetchImpl, adUrl, networkTimeoutMs, {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-store',
      credentials: 'omit',
    });

    if (adProbe === 'reachable') return 'clear';
    if (adProbe === 'timeout') return 'unknown';

    const firstPartyProbe = await probeUrl(
      fetchImpl,
      `/favicon.svg?content_blocker_probe=${nonce}`,
      networkTimeoutMs,
      { method: 'GET', cache: 'no-store', credentials: 'same-origin' },
    );
    return firstPartyProbe === 'reachable' ? 'blocked' : 'unknown';
  } finally {
    bait.remove();
  }
}
