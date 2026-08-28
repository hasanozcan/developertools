export interface VideoToGifOptions {
  fps: number;
  width: number;
  quality: number;
  startTime: number;
  endTime: number;
}

export interface VideoMetadata {
  duration: number;
  videoWidth: number;
  videoHeight: number;
}

export function calculateGifDimensions(
  origWidth: number,
  origHeight: number,
  targetWidth: number
): { width: number; height: number } {
  if (!origWidth || !origHeight || origWidth <= 0 || origHeight <= 0) {
    return { width: targetWidth || 320, height: 240 };
  }
  const scale = targetWidth / origWidth;
  const height = Math.round(origHeight * scale);
  return {
    width: Math.max(16, targetWidth),
    height: Math.max(16, height),
  };
}

export function estimateGifFrameCount(duration: number, fps: number): number {
  if (duration <= 0 || fps <= 0) return 0;
  return Math.round(duration * fps);
}

export function estimateGifFileSize(
  width: number,
  height: number,
  frameCount: number,
  quality: number = 7
): number {
  const bytesPerPixelPerFrame = 0.35 + (10 - quality) * 0.04;
  return Math.round(width * height * frameCount * bytesPerPixelPerFrame);
}

export function formatFileSize(bytes: number): string {
  if (bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}
