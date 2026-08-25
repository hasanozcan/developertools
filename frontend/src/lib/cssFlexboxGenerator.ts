export interface FlexboxConfig {
  direction: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justify: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  align: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  wrap: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap: number;
}

export function generateCssFlexbox(config: FlexboxConfig): { css: string; tailwind: string } {
  const css = `.flex-container {
  display: flex;
  flex-direction: ${config.direction};
  justify-content: ${config.justify};
  align-items: ${config.align};
  flex-wrap: ${config.wrap};
  gap: ${config.gap}px;
}`;

  const dirMap = { row: 'flex-row', 'row-reverse': 'flex-row-reverse', column: 'flex-col', 'column-reverse': 'flex-col-reverse' };
  const justMap = { 'flex-start': 'justify-start', center: 'justify-center', 'flex-end': 'justify-end', 'space-between': 'justify-between', 'space-around': 'justify-around', 'space-evenly': 'justify-evenly' };
  const alignMap = { 'flex-start': 'items-start', center: 'items-center', 'flex-end': 'items-end', stretch: 'items-stretch', baseline: 'items-baseline' };
  const wrapMap = { nowrap: 'flex-nowrap', wrap: 'flex-wrap', 'wrap-reverse': 'flex-wrap-reverse' };

  const tailwind = `flex ${dirMap[config.direction]} ${justMap[config.justify]} ${alignMap[config.align]} ${wrapMap[config.wrap]} gap-[${config.gap}px]`;
  return { css, tailwind };
}
