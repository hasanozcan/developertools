export const ADSENSE_PRODUCTION_ORIGIN = 'https://devstools.app';

/** The actual browser origin decides eligibility, independently of SEO metadata. */
export function isAdSenseAllowedOrigin(origin: string | undefined) {
  return origin === ADSENSE_PRODUCTION_ORIGIN;
}

export function isAdSenseAllowedInBrowser() {
  return typeof window !== 'undefined' && isAdSenseAllowedOrigin(window.location.origin);
}

const ADSENSE_CLIENT_ID = /^ca-pub-\d+$/;

export function normalizeAdSenseClientId(value: string | undefined) {
  const clientId = value?.trim();
  return clientId && ADSENSE_CLIENT_ID.test(clientId) ? clientId : undefined;
}

export function normalizeAdSensePublisherId(value: string | undefined) {
  return normalizeAdSenseClientId(value)?.slice(3);
}
