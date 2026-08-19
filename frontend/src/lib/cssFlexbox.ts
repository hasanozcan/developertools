export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type FlexJustify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
export type FlexAlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type FlexAlignContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch';

export interface FlexboxContainerOptions {
  direction: FlexDirection;
  justifyContent: FlexJustify;
  alignItems: FlexAlignItems;
  flexWrap: FlexWrap;
  alignContent: FlexAlignContent;
  gap: number; // px
  itemCount: number;
}

export interface FlexboxGeneratedCode {
  css: string;
  tailwind: string;
  styleObject: React.CSSProperties;
}

export function generateFlexboxCode(options: FlexboxContainerOptions): FlexboxGeneratedCode {
  const { direction, justifyContent, alignItems, flexWrap, alignContent, gap } = options;

  const styleObject: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    justifyContent,
    alignItems,
    flexWrap,
    alignContent: flexWrap === 'nowrap' ? undefined : alignContent,
    gap: `${gap}px`,
  };

  const css = `.flex-container {
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};${flexWrap !== 'nowrap' ? `\n  align-content: ${alignContent};` : ''}
  gap: ${gap}px;
}`;

  // Map to Tailwind classes
  const twDirection =
    direction === 'row'
      ? 'flex-row'
      : direction === 'row-reverse'
      ? 'flex-row-reverse'
      : direction === 'column'
      ? 'flex-col'
      : 'flex-col-reverse';

  const twJustify =
    justifyContent === 'flex-start'
      ? 'justify-start'
      : justifyContent === 'flex-end'
      ? 'justify-end'
      : justifyContent === 'center'
      ? 'justify-center'
      : justifyContent === 'space-between'
      ? 'justify-between'
      : justifyContent === 'space-around'
      ? 'justify-around'
      : 'justify-evenly';

  const twAlignItems =
    alignItems === 'flex-start'
      ? 'items-start'
      : alignItems === 'flex-end'
      ? 'items-end'
      : alignItems === 'center'
      ? 'items-center'
      : alignItems === 'stretch'
      ? 'items-stretch'
      : 'items-baseline';

  const twWrap =
    flexWrap === 'nowrap' ? 'flex-nowrap' : flexWrap === 'wrap' ? 'flex-wrap' : 'flex-wrap-reverse';

  const tailwind = `flex ${twDirection} ${twJustify} ${twAlignItems} ${twWrap} gap-[${gap}px]`;

  return { css, tailwind, styleObject };
}
