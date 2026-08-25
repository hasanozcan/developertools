export interface GridConfig {
  columns: number;
  rows: number;
  columnGap: number;
  rowGap: number;
}

export function generateCssGrid(config: GridConfig): { css: string; tailwind: string } {
  const css = `.grid-container {
  display: grid;
  grid-template-columns: repeat(${config.columns}, 1fr);
  grid-template-rows: repeat(${config.rows}, 1fr);
  column-gap: ${config.columnGap}px;
  row-gap: ${config.rowGap}px;
}`;

  const tailwind = `grid grid-cols-${config.columns} grid-rows-${config.rows} gap-x-[${config.columnGap}px] gap-y-[${config.rowGap}px]`;
  return { css, tailwind };
}
