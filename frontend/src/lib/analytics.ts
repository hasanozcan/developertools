import { track } from '@vercel/analytics';

export type ProductAnalyticsEvent =
  | 'contact_submitted'
  | 'tool_copied'
  | 'tool_favorite_added'
  | 'tool_favorite_removed'
  | 'tool_opened'
  | 'tool_search_selected';

type AnalyticsValue = boolean | number | string | null;
type AnalyticsProperties = Record<string, AnalyticsValue | undefined>;

const MAX_PROPERTY_KEY_LENGTH = 40;
const MAX_STRING_VALUE_LENGTH = 100;
const propertyKeyPattern = /^[a-z][a-z0-9_]*$/;

function sanitizeProperties(properties: AnalyticsProperties): Record<string, AnalyticsValue> {
  const sanitized: Record<string, AnalyticsValue> = {};

  for (const [key, value] of Object.entries(properties)) {
    if (
      value === undefined ||
      key.length > MAX_PROPERTY_KEY_LENGTH ||
      !propertyKeyPattern.test(key)
    ) {
      continue;
    }

    sanitized[key] =
      typeof value === 'string' ? value.slice(0, MAX_STRING_VALUE_LENGTH) : value;
  }

  return sanitized;
}

export function getToolAnalyticsContext(pathname?: string): {
  category: string;
  tool: string;
} | null {
  const currentPathname = pathname ?? (typeof window === 'undefined' ? '' : window.location.pathname);
  const match = /^\/tools\/([^/?#]+)\/([^/?#]+)\/?$/.exec(currentPathname);

  if (!match) {
    return null;
  }

  try {
    return {
      category: decodeURIComponent(match[1]),
      tool: decodeURIComponent(match[2]),
    };
  } catch {
    return null;
  }
}

export function trackProductEvent(
  event: ProductAnalyticsEvent,
  properties: AnalyticsProperties = {},
): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    track(event, sanitizeProperties(properties));
  } catch {
    // Analytics must never interrupt a tool workflow.
  }
}

export function trackToolEvent(
  event: Exclude<ProductAnalyticsEvent, 'contact_submitted'>,
  tool: string,
  category: string,
  properties: AnalyticsProperties = {},
): void {
  trackProductEvent(event, { ...properties, category, tool });
}

export function trackCurrentToolEvent(
  event: 'tool_copied',
  properties: AnalyticsProperties = {},
): void {
  const context = getToolAnalyticsContext();

  if (context) {
    trackToolEvent(event, context.tool, context.category, properties);
  }
}
