import { describe, it, expect } from 'vitest';
import { convertCsvToGeojson } from './csvToGeojson';

describe('csvToGeojson', () => {
  it('converts CSV to GeoJSON', () => {
    const csv = 'lat,lon,city\n41.01,28.97,Istanbul';
    expect(convertCsvToGeojson(csv)).toContain('FeatureCollection');
  });
});
