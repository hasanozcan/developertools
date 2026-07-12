const ADSENSE_CLIENT_ID = /^ca-pub-\d+$/;

export function normalizeAdSenseClientId(value: string | undefined) {
  const clientId = value?.trim();
  return clientId && ADSENSE_CLIENT_ID.test(clientId) ? clientId : undefined;
}
