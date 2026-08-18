export type TriangleDirection = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface TriangleOptions {
  direction: TriangleDirection;
  width: number; // px
  height: number; // px
  color: string;
}

export interface TriangleResult {
  css: string;
  styleObject: React.CSSProperties;
}

export function generateCssTriangle(options: TriangleOptions): TriangleResult {
  const { direction, width, height, color } = options;

  let borderStyle = '';
  const styleObject: React.CSSProperties = {
    width: '0px',
    height: '0px',
    borderStyle: 'solid',
  };

  switch (direction) {
    case 'top':
      borderStyle = `border-width: 0 ${width / 2}px ${height}px ${width / 2}px;
border-color: transparent transparent ${color} transparent;`;
      styleObject.borderWidth = `0 ${width / 2}px ${height}px ${width / 2}px`;
      styleObject.borderColor = `transparent transparent ${color} transparent`;
      break;

    case 'bottom':
      borderStyle = `border-width: ${height}px ${width / 2}px 0 ${width / 2}px;
border-color: ${color} transparent transparent transparent;`;
      styleObject.borderWidth = `${height}px ${width / 2}px 0 ${width / 2}px`;
      styleObject.borderColor = `${color} transparent transparent transparent`;
      break;

    case 'left':
      borderStyle = `border-width: ${height / 2}px ${width}px ${height / 2}px 0;
border-color: transparent ${color} transparent transparent;`;
      styleObject.borderWidth = `${height / 2}px ${width}px ${height / 2}px 0`;
      styleObject.borderColor = `transparent ${color} transparent transparent`;
      break;

    case 'right':
      borderStyle = `border-width: ${height / 2}px 0 ${height / 2}px ${width}px;
border-color: transparent transparent transparent ${color};`;
      styleObject.borderWidth = `${height / 2}px 0 ${height / 2}px ${width}px`;
      styleObject.borderColor = `transparent transparent transparent ${color}`;
      break;

    case 'top-left':
      borderStyle = `border-width: ${height}px ${width}px 0 0;
border-color: ${color} transparent transparent transparent;`;
      styleObject.borderWidth = `${height}px ${width}px 0 0`;
      styleObject.borderColor = `${color} transparent transparent transparent`;
      break;

    case 'top-right':
      borderStyle = `border-width: 0 ${width}px ${height}px 0;
border-color: transparent ${color} transparent transparent;`;
      styleObject.borderWidth = `0 ${width}px ${height}px 0`;
      styleObject.borderColor = `transparent ${color} transparent transparent`;
      break;

    case 'bottom-left':
      borderStyle = `border-width: ${height}px 0 0 ${width}px;
border-color: transparent transparent transparent ${color};`;
      styleObject.borderWidth = `${height}px 0 0 ${width}px`;
      styleObject.borderColor = `transparent transparent transparent ${color}`;
      break;

    case 'bottom-right':
      borderStyle = `border-width: 0 0 ${height}px ${width}px;
border-color: transparent transparent ${color} transparent;`;
      styleObject.borderWidth = `0 0 ${height}px ${width}px`;
      styleObject.borderColor = `transparent transparent ${color} transparent`;
      break;
  }

  const css = `width: 0;
height: 0;
border-style: solid;
${borderStyle}`;

  return { css, styleObject };
}
