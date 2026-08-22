export interface SseEventItem {
  id?: string;
  event: string;
  data: string;
  timestamp: string;
}

export function parseSseChunk(chunk: string): SseEventItem[] {
  const lines = chunk.split(/\r?\n/);
  const events: SseEventItem[] = [];
  let currentEvent = 'message';
  let currentData = '';
  let currentId: string | undefined = undefined;

  for (const line of lines) {
    if (line.startsWith('event:')) {
      currentEvent = line.replace('event:', '').trim();
    } else if (line.startsWith('data:')) {
      currentData = (currentData ? currentData + '\n' : '') + line.replace('data:', '').trim();
    } else if (line.startsWith('id:')) {
      currentId = line.replace('id:', '').trim();
    } else if (!line.trim()) {
      if (currentData) {
        events.push({
          id: currentId,
          event: currentEvent,
          data: currentData,
          timestamp: new Date().toISOString(),
        });
        currentEvent = 'message';
        currentData = '';
        currentId = undefined;
      }
    }
  }

  return events;
}
