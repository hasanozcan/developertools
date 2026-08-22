export interface HarSummary {
  pagesCount: number;
  entriesCount: number;
  totalBytes: number;
  requests: { method: string; url: string; status: number; durationMs: number }[];
}

export function parseHarFile(harContent: string): HarSummary {
  let parsed: any;
  try {
    parsed = JSON.parse(harContent);
  } catch (err: unknown) {
    throw new Error('Invalid HAR JSON: ' + (err instanceof Error ? err.message : String(err)));
  }

  const entries = parsed?.log?.entries || [];
  let totalBytes = 0;

  const requests = entries.map((e: any) => {
    const size = e.response?.bodySize || 0;
    if (size > 0) totalBytes += size;
    return {
      method: e.request?.method || 'GET',
      url: e.request?.url || '',
      status: e.response?.status || 200,
      durationMs: Math.round(e.time || 0),
    };
  });

  return {
    pagesCount: parsed?.log?.pages?.length || 1,
    entriesCount: entries.length,
    totalBytes,
    requests: requests.slice(0, 50),
  };
}
