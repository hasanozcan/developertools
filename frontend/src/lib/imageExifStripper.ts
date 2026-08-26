export interface ParsedExifData {
  hasExif: boolean;
  cameraMake?: string;
  cameraModel?: string;
  dateTimeOriginal?: string;
  software?: string;
  exposureTime?: string;
  fNumber?: string;
  iso?: string;
  focalLength?: string;
  gpsLatitude?: number;
  gpsLongitude?: number;
  gpsGoogleMapsUrl?: string;
  rawTags: Record<string, string>;
}

export function parseExifFromBuffer(buffer: ArrayBuffer): ParsedExifData {
  const dataView = new DataView(buffer);
  const rawTags: Record<string, string> = {};

  // Check for JPEG SOI (0xFFD8)
  if (dataView.byteLength < 4 || dataView.getUint16(0) !== 0xffd8) {
    return { hasExif: false, rawTags };
  }

  let offset = 2;
  let hasExif = false;
  let cameraMake: string | undefined;
  let cameraModel: string | undefined;
  let dateTimeOriginal: string | undefined;
  let software: string | undefined;

  while (offset < dataView.byteLength) {
    if (dataView.getUint8(offset) !== 0xff) break;

    const marker = dataView.getUint8(offset + 1);

    // APP1 Marker (0xFFE1) contains EXIF
    if (marker === 0xe1) {
      hasExif = true;
      const length = dataView.getUint16(offset + 2);
      const exifHeader = String.fromCharCode(
        dataView.getUint8(offset + 4),
        dataView.getUint8(offset + 5),
        dataView.getUint8(offset + 6),
        dataView.getUint8(offset + 7)
      );

      if (exifHeader === 'Exif') {
        // Read ASCII text heuristically for common tags in APP1
        const app1Bytes = new Uint8Array(buffer, offset + 4, Math.min(length, dataView.byteLength - offset - 4));
        const text = new TextDecoder('utf-8', { fatal: false }).decode(app1Bytes);

        // Basic metadata regex scan
        const dateMatch = text.match(/\d{4}:\d{2}:\d{2} \d{2}:\d{2}:\d{2}/);
        if (dateMatch) {
          dateTimeOriginal = dateMatch[0];
          rawTags['DateTimeOriginal'] = dateMatch[0];
        }

        const appleMatch = text.match(/iPhone\s*[\w\s]+/i) || text.match(/Apple/i);
        if (appleMatch) {
          cameraMake = 'Apple';
          cameraModel = appleMatch[0];
          rawTags['Make'] = 'Apple';
          rawTags['Model'] = cameraModel;
        }

        const canonNikonMatch = text.match(/(Canon|Nikon|Sony|Samsung|Google|Xiaomi)[\w\s]+/i);
        if (canonNikonMatch) {
          cameraMake = canonNikonMatch[1];
          cameraModel = canonNikonMatch[0];
          rawTags['Make'] = cameraMake;
          rawTags['Model'] = cameraModel;
        }
      }
      break;
    }

    if (marker === 0xda || marker === 0xd9) {
      // SOS (Start of Scan) or EOI
      break;
    }

    const sectionLength = dataView.getUint16(offset + 2);
    offset += 2 + sectionLength;
  }

  return {
    hasExif,
    cameraMake,
    cameraModel,
    dateTimeOriginal,
    software,
    rawTags,
  };
}

export function stripJpegExif(buffer: ArrayBuffer): Uint8Array {
  const dataView = new DataView(buffer);

  if (dataView.byteLength < 4 || dataView.getUint16(0) !== 0xffd8) {
    return new Uint8Array(buffer);
  }

  const chunks: Uint8Array[] = [new Uint8Array([0xff, 0xd8])];
  let offset = 2;

  while (offset < dataView.byteLength) {
    if (dataView.getUint8(offset) !== 0xff) {
      // Remaining image stream
      chunks.push(new Uint8Array(buffer, offset));
      break;
    }

    const marker = dataView.getUint8(offset + 1);

    if (marker === 0xda) {
      // SOS marker: rest of the file is compressed image data
      chunks.push(new Uint8Array(buffer, offset));
      break;
    }

    if (marker === 0xd9) {
      // EOI
      chunks.push(new Uint8Array([0xff, 0xd9]));
      break;
    }

    const length = dataView.getUint16(offset + 2);

    // Skip APP1 (0xE1: EXIF) and APP2 (0xE2: ICC/Metadata)
    if (marker !== 0xe1 && marker !== 0xe2) {
      chunks.push(new Uint8Array(buffer, offset, 2 + length));
    }

    offset += 2 + length;
  }

  const totalLength = chunks.reduce((acc, curr) => acc + curr.length, 0);
  const result = new Uint8Array(totalLength);
  let pos = 0;
  for (const chunk of chunks) {
    result.set(chunk, pos);
    pos += chunk.length;
  }

  return result;
}
