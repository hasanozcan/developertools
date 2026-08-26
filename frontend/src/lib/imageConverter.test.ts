import { describe, expect, it } from 'vitest';
import {
  getImageExtension,
  getMimeTypeFromExtension,
  replaceFileExtension,
  SUPPORTED_IMAGE_FORMATS,
} from './imageConverter';

describe('imageConverter', () => {
  it('returns correct extension for mime types', () => {
    expect(getImageExtension('image/webp')).toBe('webp');
    expect(getImageExtension('image/jpeg')).toBe('jpg');
    expect(getImageExtension('image/png')).toBe('png');
  });

  it('resolves mime type from file extension', () => {
    expect(getMimeTypeFromExtension('jpg')).toBe('image/jpeg');
    expect(getMimeTypeFromExtension('webp')).toBe('image/webp');
    expect(getMimeTypeFromExtension('ico')).toBe('image/x-icon');
  });

  it('replaces file extensions correctly', () => {
    expect(replaceFileExtension('photo.jpg', 'webp')).toBe('photo.webp');
    expect(replaceFileExtension('avatar.profile.png', 'avif')).toBe('avatar.profile.avif');
  });

  it('has list of supported image formats', () => {
    expect(SUPPORTED_IMAGE_FORMATS.length).toBeGreaterThanOrEqual(5);
  });
});
