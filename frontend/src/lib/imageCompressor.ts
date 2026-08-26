export interface ImageCompressionOptions {
  quality: number; // 0.01 to 1.0
  maxWidth?: number;
  maxHeight?: number;
  format?: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/avif';
}

export interface ImageCompressionMetrics {
  originalSize: number;
  compressedSize: number;
  savedBytes: number;
  savedPercentage: number;
  compressionRatio: number;
}

export function calculateCompressionMetrics(
  originalSize: number,
  compressedSize: number
): ImageCompressionMetrics {
  const safeOrig = Math.max(1, originalSize);
  const savedBytes = Math.max(0, safeOrig - compressedSize);
  const savedPercentage = Number(((savedBytes / safeOrig) * 100).toFixed(2));
  const compressionRatio = Number((safeOrig / Math.max(1, compressedSize)).toFixed(2));

  return {
    originalSize,
    compressedSize,
    savedBytes,
    savedPercentage,
    compressionRatio,
  };
}

export function calculateTargetDimensions(
  srcWidth: number,
  srcHeight: number,
  maxWidth?: number,
  maxHeight?: number
): { width: number; height: number } {
  let width = srcWidth;
  let height = srcHeight;

  if (maxWidth && width > maxWidth) {
    height = Math.round((height * maxWidth) / width);
    width = maxWidth;
  }

  if (maxHeight && height > maxHeight) {
    width = Math.round((width * maxHeight) / height);
    height = maxHeight;
  }

  return {
    width: Math.max(1, width),
    height: Math.max(1, height),
  };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
