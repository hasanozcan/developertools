// Rule for the final rendered <title> of tool (and category) pages.
//
// The root layout applies the template `%s | DevsTools`. Search engines
// truncate titles at roughly 60 characters, so the FINAL title (including the
// site suffix when it is applied) must be <= MAX_TITLE_LENGTH:
//
//   1. Start from the hand-written `metadataTitle` (or `<name> Online` when a
//      tool has none) and strip boilerplate such as "Online Free – Instant &
//      Private" or "– Free Online Developer Tool".
//   2. Keep the site suffix only when `body + " | DevsTools"` still fits in 60
//      characters (i.e. the body is <= 48). Otherwise render the body alone as
//      an `absolute` title.
//   3. If the body alone is still too long, drop the trailing " – tagline" or
//      parenthetical, then cut at a word boundary (never mid-word, never
//      leaving a dangling connective such as "&", "to" or "and"). The primary
//      keyword stays at the front because we only ever remove from the end.

export const SITE_NAME = 'DevsTools';
export const TITLE_SUFFIX = ` | ${SITE_NAME}`;
export const MAX_TITLE_LENGTH = 60;

const BOILERPLATE_SUFFIXES: readonly RegExp[] = [
  /\s+Online\s+Free\s*[–—-]\s*Instant\s*&\s*Private$/i,
  /\s+Online\s+Free$/i,
  /\s*[–—-]\s*Free\s+Online\s+Developer\s+Tool$/i,
  /\s*[–—-]\s*Free\s+Online\s+Tool$/i,
  /\s*[–—-]\s*Free\s+Online\s+Developer\s+Tools$/i,
];

// Trailing tokens that must never end a shortened title.
const DANGLING_TAIL =
  /(?:\s+(?:and|or|to|of|for|the|a|an|in|on|with|vs|from|into|by|as|at|desde|hasta|sobre|aus|nach|bei|dans|sur|avec|sans|de|del|la|las|el|los|y|e|en|para|por|con|und|oder|für|zu|mit|der|die|das|von|et|ou|à|au|aux|pour|le|les|du|des|un|une|ve|veya|için|ile|bir|и|или|для|на|в|с|по|из|к)|\s*[&,:;/+\-–—(\[]|\s+\()$/i;

const codePoints = (value: string): string[] => [...value];

/** Length as the SEO audit measures it: Unicode code points. */
export function titleLength(value: string): number {
  return codePoints(value).length;
}

/** Removes "Online Free – Instant & Private"-style boilerplate from the end. */
export function stripTitleBoilerplate(title: string): string {
  let result = title.trim();
  let changed = true;
  while (changed) {
    changed = false;
    for (const pattern of BOILERPLATE_SUFFIXES) {
      const next = result.replace(pattern, '').trim();
      if (next !== result && next.length > 0) {
        result = next;
        changed = true;
      }
    }
  }
  return result;
}

function trimDanglingTail(value: string): string {
  let result = value.trim();
  for (let i = 0; i < 6; i += 1) {
    const next = result.replace(DANGLING_TAIL, '').trim();
    if (next === result) break;
    result = next;
  }
  return result;
}

/**
 * Shortens `value` to at most `max` characters without cutting mid-word and
 * without leaving a dangling connective. Prefers dropping a trailing
 * " – tagline" / "(parenthetical)" over cutting words.
 */
export function shortenTitle(value: string, max: number = MAX_TITLE_LENGTH): string {
  const trimmed = value.trim();
  if (titleLength(trimmed) <= max) return trimmed;

  // 1. Drop a trailing " – tagline" (keep the head when it fits).
  const dashSplit = trimmed.split(/\s+[–—-]\s+/);
  if (dashSplit.length > 1) {
    const head = trimDanglingTail(dashSplit.slice(0, -1).join(' – '));
    if (head && titleLength(head) <= max) return head;
    return shortenTitle(head || dashSplit[0], max);
  }

  // 2. Drop a trailing parenthetical.
  const withoutParen = trimmed.replace(/\s*\([^()]*\)\s*$/, '').trim();
  if (withoutParen && withoutParen !== trimmed) {
    return shortenTitle(withoutParen, max);
  }

  // 3. Cut at a word boundary.
  const chars = codePoints(trimmed);
  if (!/\s/.test(trimmed)) {
    // CJK / single-token titles: cut on the last punctuation if any, else hard cut.
    const slice = chars.slice(0, max).join('');
    const punct = slice.search(/[、，,，/&][^、，,，/&]*$/);
    return (punct > 0 ? slice.slice(0, punct) : slice).trim();
  }
  let cut = chars.slice(0, max + 1);
  // Only cut on whitespace: if char at `max` is a space the last word is whole.
  const boundary =
    cut[max] && /\s/.test(cut[max]) ? max : cut.slice(0, max).join('').lastIndexOf(' ');
  cut = boundary > 0 ? chars.slice(0, boundary) : chars.slice(0, max);
  return trimDanglingTail(cut.join(''));
}

export interface ResolvedTitle {
  /** Value for Next's `metadata.title`: plain string keeps the site template, `{ absolute }` skips it. */
  title: string | { absolute: string };
  /** Title text without the site suffix (used for og:title / twitter:title). */
  socialTitle: string;
  /** What the browser shows: `title` after the site template is applied. */
  finalTitle: string;
}

/**
 * Applies the 60-character rule to a title body. The site suffix is kept only
 * when it fits; the body is shortened when even the bare body is too long.
 */
export function resolveTitle(
  body: string,
  options: { stripBoilerplate?: boolean } = {},
): ResolvedTitle {
  const cleaned = options.stripBoilerplate === false ? body.trim() : stripTitleBoilerplate(body);
  if (titleLength(cleaned) + titleLength(TITLE_SUFFIX) <= MAX_TITLE_LENGTH) {
    return { title: cleaned, socialTitle: cleaned, finalTitle: `${cleaned}${TITLE_SUFFIX}` };
  }
  const absolute = shortenTitle(cleaned, MAX_TITLE_LENGTH);
  return { title: { absolute }, socialTitle: absolute, finalTitle: absolute };
}

/** English tool page title: hand-written `metadataTitle`, else "<name> Online". */
export function resolveToolTitle(tool: { name: string; metadataTitle?: string }): ResolvedTitle {
  const body = tool.metadataTitle?.trim() || `${tool.name} Online`;
  return resolveTitle(body);
}

/**
 * Localized tool page title. Localized pages always render an absolute title,
 * so the result is the final <title>, guaranteed <= 60 characters:
 *   "<name> – <tagline>" if it fits, else "<name> | DevsTools" if it fits, else
 *   "<name>", else the name shortened at a word boundary.
 */
export function buildLocalizedToolTitle(localizedName: string, tagline?: string): string {
  const name = localizedName.trim();
  const withTagline = tagline?.trim() ? `${name} – ${tagline.trim()}` : '';
  if (withTagline && titleLength(withTagline) <= MAX_TITLE_LENGTH) return withTagline;
  const withSite = `${name}${TITLE_SUFFIX}`;
  if (titleLength(withSite) <= MAX_TITLE_LENGTH) return withSite;
  if (titleLength(name) <= MAX_TITLE_LENGTH) return name;
  return shortenTitle(name, MAX_TITLE_LENGTH);
}
