export function calculateTransferTime(fileSizeBytes: number, speedMbps: number): {
  seconds: number;
  formattedTime: string;
} {
  const speedBps = (speedMbps * 1_000_000) / 8;
  const seconds = fileSizeBytes / speedBps;

  if (seconds < 60) return { seconds, formattedTime: `${seconds.toFixed(1)}s` };
  if (seconds < 3600) return { seconds, formattedTime: `${(seconds / 60).toFixed(1)}m` };
  return { seconds, formattedTime: `${(seconds / 3600).toFixed(1)}h` };
}
