import { describe, it, expect } from 'vitest';
import { convertGeojsonToCsv } from './geojsonToCsv';

describe('geojsonToCsv', () => {
  it('converts GeoJSON to CSV', () => {
    const geo = JSON.stringify({ type: "FeatureCollection", features: [{ type: "Feature", geometry: { coordinates: [20, 10] }, properties: { name: "Spot" } }] });
    expect(convertGeojsonToCsv(geo)).toContain('latitude,longitude,name');
  });
});
