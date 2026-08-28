export function convertCsvToGeojson(csvText: string, latCol = 'lat', lonCol = 'lon'): string {
  const lines = csvText.trim().split('\n').filter(Boolean);
  if (lines.length === 0) return JSON.stringify({ type: 'FeatureCollection', features: [] });

  const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
  const latIdx = headers.findIndex(h => new RegExp('^(' + latCol + '|latitude)', 'i').test(h));
  const lonIdx = headers.findIndex(h => new RegExp('^(' + lonCol + '|longitude|lng)', 'i').test(h));

  const features = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
    const lat = parseFloat(values[latIdx]);
    const lon = parseFloat(values[lonIdx]);

    if (!isNaN(lat) && !isNaN(lon)) {
      const properties: Record<string, any> = {};
      headers.forEach((h, idx) => {
        if (idx !== latIdx && idx !== lonIdx) properties[h] = values[idx];
      });

      features.push({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [lon, lat] },
        properties
      });
    }
  }

  return JSON.stringify({ type: 'FeatureCollection', features }, null, 2);
}
