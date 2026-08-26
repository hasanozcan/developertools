import { describe, expect, it } from 'vitest';
import { calculateMD5, calculateCRC32, calculateAllChecksums } from './fileChecksumComparator';

describe('fileChecksumComparator', () => {
  it('calculates MD5 accurately for hello world', () => {
    const encoder = new TextEncoder();
    const data = encoder.encode('hello world');
    const md5 = calculateMD5(data);
    expect(md5).toBe('5eb63bbbe01eeed093cb22bb8f5acdc3');
  });

  it('calculates CRC32 accurately for 123456789', () => {
    const encoder = new TextEncoder();
    const data = encoder.encode('123456789');
    const crc = calculateCRC32(data);
    expect(crc).toBe('cbf43926');
  });

  it('calculates multiple checksums and matches expected hash', async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode('hello world');
    const results = await calculateAllChecksums(data, '5eb63bbbe01eeed093cb22bb8f5acdc3');

    const md5 = results.find((r) => r.algorithm === 'MD5');
    expect(md5?.matchesExpected).toBe(true);

    const crc = results.find((r) => r.algorithm === 'CRC32');
    expect(crc?.matchesExpected).toBe(false);
  });
});
