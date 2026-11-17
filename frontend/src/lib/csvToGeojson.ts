function findCoordinateColumnIndex(
  headers: string[],
  customCol: string,
  aliases: readonly string[],
): number {
  const normalizedCustom = customCol.trim().toLowerCase();
  const candidates = normalizedCustom ? [normalizedCustom, ...aliases] : [...aliases];

  const exactIndex = headers.findIndex((h) => candidates.includes(h.trim().toLowerCase()));
  if (exactIndex !== -1) return exactIndex;

  return headers.findIndex((h) => {
    const normalized = h.trim().toLowerCase();
    return candidates.some((prefix) => normalized.startsWith(prefix));
  });
}

export function convertCsvToGeojson(csvText: string, latCol = 'lat', lonCol = 'lon'): string {
  const lines = csvText.trim().split('\n').filter(Boolean);
  if (lines.length === 0) return JSON.stringify({ type: 'FeatureCollection', features: [] });

  const headers = lines[0].split(',').map((h) => h.trim().replace(/^["']|["']$/g, ''));
  const latIdx = findCoordinateColumnIndex(headers, latCol, ['latitude']);
  const lonIdx = findCoordinateColumnIndex(headers, lonCol, ['longitude', 'lng']);

  const features = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map((v) => v.trim().replace(/^["']|["']$/g, ''));
    const lat = parseFloat(values[latIdx]);
    const lon = parseFloat(values[lonIdx]);

    if (!isNaN(lat) && !isNaN(lon)) {
      const properties: Record<string, any> = {};
      headers.forEach((h, idx) => {
        if (idx !== latIdx && idx !== lonIdx) {
          Object.defineProperty(properties, h, {
            value: values[idx],
            enumerable: true,
            writable: true,
            configurable: true,
          });
        }
      });

      features.push({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [lon, lat] },
        properties,
      });
    }
  }

  return JSON.stringify({ type: 'FeatureCollection', features }, null, 2);
}
