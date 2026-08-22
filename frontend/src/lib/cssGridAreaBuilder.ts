export function generateGridTemplateAreasCss(
  rows: string[][],
  gridGap = '16px',
): {
  areasString: string;
  css: string;
  detectedAreas: string[];
} {
  if (!rows || rows.length === 0) {
    return { areasString: '', css: '', detectedAreas: [] };
  }

  const areaRows = rows.map((row) => `  "${row.join(' ')}"`).join('\n');
  const detectedAreas = Array.from(
    new Set(
      rows
        .flat()
        .map((a) => a.trim())
        .filter((a) => a && a !== '.'),
    ),
  );

  const css = `.grid-layout {\n  display: grid;\n  grid-gap: ${gridGap};\n  grid-template-areas:\n${areaRows};\n}`;

  return {
    areasString: areaRows,
    css,
    detectedAreas,
  };
}
