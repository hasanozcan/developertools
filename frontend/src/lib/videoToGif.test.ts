import { describe, it, expect } from 'vitest';
import { calculateGifDimensions, estimateGifFrameCount, estimateGifFileSize, formatFileSize } from './videoToGif';

describe('videoToGif', () => {
  it('calculates aspect ratio scaled dimensions correctly', () => {
    const dims = calculateGifDimensions(1920, 1080, 480);
    expect(dims.width).toBe(480);
    expect(dims.height).toBe(270);
  });

  it('estimates frame count based on duration and fps', () => {
    expect(estimateGifFrameCount(3.5, 10)).toBe(35);
    expect(estimateGifFrameCount(0, 10)).toBe(0);
  });

  it('estimates file size correctly', () => {
    const size = estimateGifFileSize(480, 270, 30, 7);
    expect(size).toBeGreaterThan(0);
  });

  it('formats byte units properly', () => {
    expect(formatFileSize(1024)).toBe('1.0 KB');
    expect(formatFileSize(1048576 * 2.5)).toBe('2.5 MB');
  });
});
