export function generateElevationShadows(elevation: number, colorRgb = '0, 0, 0', opacity = 0.15): string {
  const clampedElevation = Math.max(1, Math.min(24, elevation));
  const layers: string[] = [];

  // Ambient layer
  const ambY = Math.max(1, Math.round(clampedElevation * 0.4));
  const ambBlur = Math.round(clampedElevation * 1.2);
  layers.push('0 ' + ambY + 'px ' + ambBlur + 'px rgba(' + colorRgb + ', ' + (opacity * 0.7).toFixed(3) + ')');

  // Direct layer
  const dirY = Math.round(clampedElevation * 1.5);
  const dirBlur = Math.round(clampedElevation * 2.8);
  layers.push('0 ' + dirY + 'px ' + dirBlur + 'px rgba(' + colorRgb + ', ' + opacity.toFixed(3) + ')');

  // Sharp contact layer
  if (clampedElevation >= 4) {
    layers.push('0 1px 2px rgba(' + colorRgb + ', ' + (opacity * 0.5).toFixed(3) + ')');
  }

  return 'box-shadow: ' + layers.join(',\n             ') + ';';
}
