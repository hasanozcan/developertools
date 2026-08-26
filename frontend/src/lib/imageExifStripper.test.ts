import { describe, expect, it } from 'vitest';
import { parseExifFromBuffer, stripJpegExif } from './imageExifStripper';

describe('imageExifStripper', () => {
  it('returns hasExif false for non-JPEG buffers', () => {
    const buffer = new Uint8Array([0x00, 0x01, 0x02, 0x03]).buffer;
    const result = parseExifFromBuffer(buffer);
    expect(result.hasExif).toBe(false);
  });

  it('strips APP1 marker from mock JPEG buffer', () => {
    // Construct mock JPEG with SOI (FF D8) + APP1 (FF E1 00 08 'Exif\0\0') + SOS (FF DA 00 02) + EOI (FF D9)
    const exifApp1 = [0xff, 0xe1, 0x00, 0x08, 0x45, 0x78, 0x69, 0x66, 0x00, 0x00];
    const mockJpeg = new Uint8Array([
      0xff, 0xd8,
      ...exifApp1,
      0xff, 0xda, 0x00, 0x02,
      0xff, 0xd9,
    ]);

    const parsed = parseExifFromBuffer(mockJpeg.buffer);
    expect(parsed.hasExif).toBe(true);

    const stripped = stripJpegExif(mockJpeg.buffer);
    const parsedAfter = parseExifFromBuffer(stripped.buffer);
    expect(parsedAfter.hasExif).toBe(false);
  });
});
