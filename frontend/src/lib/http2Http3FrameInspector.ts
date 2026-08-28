export function inspectFrame(frameType: string): string {
  const map: Record<string, string> = {
    'DATA': 'Contains raw stream payload data',
    'HEADERS': 'Transmits HTTP headers with HPACK compression',
    'SETTINGS': 'Configures connection parameters and stream limits',
    'PING': 'Measures RTT round-trip connection latency'
  };
  return map[frameType.toUpperCase()] || 'Generic HTTP/2 or HTTP/3 transport frame';
}
