const DEFAULT_BAIT_SETTLE_MS = 300;
const DEFAULT_NETWORK_TIMEOUT_MS = 2500;

type FetchLike = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
type ProbeResult = 'reachable' | 'failed' | 'timeout';
type RuntimeProbe = (timeoutMs: number) => Promise<ProbeResult>;

export type ContentBlockerDetection = 'clear' | 'blocked' | 'unknown';

interface DetectionOptions {
  fetchImpl?: FetchLike;
  runtimeProbeImpl?: RuntimeProbe;
  baitSettleMs?: number;
  networkTimeoutMs?: number;
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

function isAdSenseRuntimeLoaded() {
  const queue = Reflect.get(window, 'adsbygoogle') as { loaded?: unknown } | undefined;
  return queue?.loaded === true;
}

/** Waits for the real AdSense script on the page to initialize its runtime. */
export function probeAdSenseRuntime(timeoutMs: number): Promise<ProbeResult> {
  if (isAdSenseRuntimeLoaded()) return Promise.resolve('reachable');

  return new Promise((resolve) => {
    let settled = false;

    const finish = (result: ProbeResult) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      resolve(result);
    };

    const intervalId = setInterval(() => {
      if (isAdSenseRuntimeLoaded()) finish('reachable');
    }, 50);
    const timeoutId = setTimeout(() => finish('timeout'), timeoutMs);
  });
}

/**
 * Detects content filtering with a DOM bait and the real AdSense runtime.
 * A same-origin probe distinguishes blocking from a general connection error.
 */
export async function detectContentBlocker(
  adClient: string,
  options: DetectionOptions = {},
): Promise<ContentBlockerDetection> {
  const {
    fetchImpl = globalThis.fetch?.bind(globalThis),
    runtimeProbeImpl = probeAdSenseRuntime,
    baitSettleMs = DEFAULT_BAIT_SETTLE_MS,
    networkTimeoutMs = DEFAULT_NETWORK_TIMEOUT_MS,
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

    const adProbe = await runtimeProbeImpl(networkTimeoutMs);

    if (adProbe === 'reachable') return 'clear';
    if (!fetchImpl) return 'unknown';

    const nonce = Date.now();
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
