export function convertGeojsonToCsv(geojsonStr: string): string {
  const parsed = JSON.parse(geojsonStr);
  const features = parsed.features || [];
  if (features.length === 0) return 'latitude,longitude';

  const propKeys = Object.keys(features[0]?.properties || {});
  const headers = ['latitude', 'longitude', ...propKeys];
  const rows = [headers.join(',')];

  for (const f of features) {
    const coords = f.geometry?.coordinates || [0, 0];
    const lon = coords[0];
    const lat = coords[1];
    const propVals = propKeys.map(k => '"' + (f.properties?.[k] || '') + '"');
    rows.push([lat, lon, ...propVals].join(','));
  }

  return rows.join('\n');
}
