export function buildUtmUrl(baseUrl: string, utm: { source: string; medium: string; campaign: string; term?: string; content?: string }): string {
  try {
    const url = new URL(baseUrl);
    if (utm.source) url.searchParams.set('utm_source', utm.source);
    if (utm.medium) url.searchParams.set('utm_medium', utm.medium);
    if (utm.campaign) url.searchParams.set('utm_campaign', utm.campaign);
    if (utm.term) url.searchParams.set('utm_term', utm.term);
    if (utm.content) url.searchParams.set('utm_content', utm.content);
    return url.toString();
  } catch {
    return baseUrl;
  }
}
