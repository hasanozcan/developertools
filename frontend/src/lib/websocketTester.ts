export interface WsMessageLog {
  id: string;
  timestamp: string;
  type: 'sent' | 'received' | 'status';
  payload: string;
}

export function formatWsPayload(data: unknown): string {
  if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return data;
    }
  }
  return JSON.stringify(data, null, 2);
}
