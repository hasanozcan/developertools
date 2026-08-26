import { describe, expect, it } from 'vitest';
import {
  calculateCompressionMetrics,
  calculateTargetDimensions,
  formatFileSize,
} from './imageCompressor';

describe('imageCompressor', () => {
  it('calculates saved percentage and compression metrics correctly', () => {
    const metrics = calculateCompressionMetrics(1000000, 400000);
    expect(metrics.savedBytes).toBe(600000);
    expect(metrics.savedPercentage).toBe(60);
    expect(metrics.compressionRatio).toBe(2.5);
  });

  it('resizes dimensions while keeping aspect ratio', () => {
    const dims = calculateTargetDimensions(1920, 1080, 960);
    expect(dims.width).toBe(960);
    expect(dims.height).toBe(540);
  });

  it('formats file sizes accurately', () => {
    expect(formatFileSize(500)).toBe('500 B');
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(1048576)).toBe('1 MB');
  });
});
