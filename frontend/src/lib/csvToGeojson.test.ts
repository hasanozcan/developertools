import { describe, it, expect } from 'vitest';
import { convertCsvToGeojson } from './csvToGeojson';

describe('csvToGeojson', () => {
  it('converts CSV to GeoJSON', () => {
    const csv = 'lat,lon,city\n41.01,28.97,Istanbul';
    expect(convertCsvToGeojson(csv)).toContain('FeatureCollection');
  });

  it('safely matches custom column names containing regex metacharacters', () => {
    const csv = 'lat[0],lon(1),city\n41.01,28.97,Istanbul';
    const parsed = JSON.parse(convertCsvToGeojson(csv, 'lat[0]', 'lon(1)'));
    expect(parsed.features).toHaveLength(1);
    expect(parsed.features[0].geometry.coordinates).toEqual([28.97, 41.01]);
    expect(parsed.features[0].properties.city).toBe('Istanbul');
  });
});
