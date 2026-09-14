export const TOOL_USAGE_STORAGE_KEY = 'devstools-tool-usage-v1';
export const TOOL_USAGE_UPDATED_EVENT = 'devstools:tool-usage-updated';

export interface ToolUsageEntry {
  count: number;
  lastOpenedAt: number;
}

export type ToolUsageMap = Record<string, ToolUsageEntry>;

export function rankToolUsage(usage: ToolUsageMap, now = Date.now()): string[] {
  const day = 24 * 60 * 60 * 1000;
  return Object.entries(usage)
    .filter(([, entry]) => entry.count > 0 && Number.isFinite(entry.lastOpenedAt))
    .map(([slug, entry]) => {
      const ageDays = Math.max(0, (now - entry.lastOpenedAt) / day);
      const recencyBoost = Math.max(0, 7 - ageDays) / 7;
      const score = Math.log2(entry.count + 1) * 2 + recencyBoost;
      return { slug, score, lastOpenedAt: entry.lastOpenedAt };
    })
    .sort((a, b) => b.score - a.score || b.lastOpenedAt - a.lastOpenedAt)
    .map((entry) => entry.slug);
}

function readUsage(): ToolUsageMap {
  if (typeof window === 'undefined') return {};
  try {
    const parsed = JSON.parse(window.localStorage.getItem(TOOL_USAGE_STORAGE_KEY) || '{}') as ToolUsageMap;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function recordLocalToolOpen(slug: string): void {
  if (typeof window === 'undefined') return;
  const usage = readUsage();
  const current = usage[slug];
  usage[slug] = { count: (current?.count || 0) + 1, lastOpenedAt: Date.now() };
  try {
    window.localStorage.setItem(TOOL_USAGE_STORAGE_KEY, JSON.stringify(usage));
    window.dispatchEvent(new Event(TOOL_USAGE_UPDATED_EVENT));
  } catch {
    // Personal ranking is optional and must never block tool usage.
  }
}

export function getLocalTrendingToolSlugs(limit = 8): string[] {
  return rankToolUsage(readUsage()).slice(0, limit);
}
