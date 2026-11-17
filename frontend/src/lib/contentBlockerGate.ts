export const ADBLOCK_GATE_STORAGE_KEY = 'dt_adblock_gate_v1';
export const ADBLOCK_GATE_WINDOW_MS = 24 * 60 * 60 * 1000;

export type AdBlockGateMode = 'soft' | 'hard';

export interface AdBlockGateState {
  count: number;
  windowStart: number;
}

let memoryFallbackState: AdBlockGateState | null = null;

function isValidGateState(value: unknown): value is AdBlockGateState {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.count === 'number' &&
    Number.isFinite(candidate.count) &&
    candidate.count >= 0 &&
    typeof candidate.windowStart === 'number' &&
    Number.isFinite(candidate.windowStart) &&
    candidate.windowStart >= 0
  );
}

function isWindowExpired(state: AdBlockGateState, now: number): boolean {
  return now < state.windowStart || now - state.windowStart >= ADBLOCK_GATE_WINDOW_MS;
}

function readStoredState(now: number): AdBlockGateState {
  if (typeof window === 'undefined') {
    return { count: 0, windowStart: now };
  }

  let candidate: unknown = null;
  try {
    const raw = window.localStorage.getItem(ADBLOCK_GATE_STORAGE_KEY);
    candidate = raw ? JSON.parse(raw) : null;
  } catch {
    candidate = memoryFallbackState;
  }

  if (!isValidGateState(candidate) || isWindowExpired(candidate, now)) {
    return { count: 0, windowStart: now };
  }

  return candidate;
}

function writeStoredState(state: AdBlockGateState): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(ADBLOCK_GATE_STORAGE_KEY, JSON.stringify(state));
  } catch {
    memoryFallbackState = state;
  }
}

/** Returns the active 24-hour ad-blocker gate state, expiring stale windows. */
export function getContentBlockerGateState(now = Date.now()): AdBlockGateState {
  return readStoredState(now);
}

/** Increments and persists the blocked page-view counter within the 24-hour window. */
export function recordBlockedPageView(now = Date.now()): AdBlockGateState {
  const current = readStoredState(now);
  const next: AdBlockGateState =
    current.count === 0
      ? { count: 1, windowStart: now }
      : { count: current.count + 1, windowStart: current.windowStart };

  writeStoredState(next);
  return next;
}

/** Clears the persisted ad-blocker gate counter once ads are confirmed reachable. */
export function resetContentBlockerGate(): void {
  memoryFallbackState = null;
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.removeItem(ADBLOCK_GATE_STORAGE_KEY);
  } catch {
    // Ignore storage access failures; in-memory fallback is already cleared.
  }
}

/** Maps the blocked page-view count to Tier 1 (soft banner) or Tier 2 (hard modal). */
export function getGateModeForCount(count: number): AdBlockGateMode {
  return count >= 2 ? 'hard' : 'soft';
}
