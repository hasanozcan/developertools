export interface AudioTrimOptions {
  startTime: number;
  endTime: number;
  outputFormat: 'wav' | 'mp3' | 'ogg';
}

export function formatAudioDuration(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 100);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
}

export function calculateTrimmedSamples(
  sampleRate: number,
  startTime: number,
  endTime: number,
  totalDuration: number
): { startSample: number; endSample: number; numSamples: number } {
  const safeStart = Math.max(0, Math.min(startTime, totalDuration));
  const safeEnd = Math.max(safeStart, Math.min(endTime, totalDuration));
  const startSample = Math.floor(safeStart * sampleRate);
  const endSample = Math.floor(safeEnd * sampleRate);
  return {
    startSample,
    endSample,
    numSamples: Math.max(0, endSample - startSample),
  };
}
