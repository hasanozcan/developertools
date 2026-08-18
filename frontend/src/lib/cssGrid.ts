export interface GridOptions {
  columns: number; // 1 to 12
  rows: number; // 1 to 12
  columnGap: number; // px
  rowGap: number; // px
  colUnit: 'fr' | 'px' | '%';
  rowUnit: 'fr' | 'px' | 'auto';
}

export function generateCssGrid(options: GridOptions): { css: string; html: string } {
  const { columns, rows, columnGap, rowGap, colUnit, rowUnit } = options;

  const colTemplate = Array.from({ length: columns }, () => (colUnit === 'fr' ? '1fr' : colUnit === 'px' ? '120px' : `${(100 / columns).toFixed(1)}%`)).join(' ');
  const rowTemplate = Array.from({ length: rows }, () => (rowUnit === 'fr' ? '1fr' : rowUnit === 'px' ? '80px' : 'auto')).join(' ');

  const css = `.parent {
  display: grid;
  grid-template-columns: ${colTemplate};
  grid-template-rows: ${rowTemplate};
  column-gap: ${columnGap}px;
  row-gap: ${rowGap}px;
}`;

  const items = Array.from({ length: columns * rows }, (_, i) => `  <div class="div${i + 1}">Item ${i + 1}</div>`).join('\n');
  const html = `<div class="parent">\n${items}\n</div>`;

  return { css, html };
}
