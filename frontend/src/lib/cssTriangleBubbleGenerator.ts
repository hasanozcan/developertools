import type { CSSProperties } from 'react';

export type TriangleDirection = 'top' | 'right' | 'bottom' | 'left';

export interface TriangleOptions {
  direction: TriangleDirection;
  size: number;
  color: string;
  type: 'triangle' | 'bubble';
  bubbleWidth?: number;
  bubblePadding?: number;
  bubbleRadius?: number;
}

const DEFAULT_COLOR = '#4f46e5';

const HEX_COLOR_RE = /^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const RGB_COLOR_RE =
  /^rgba?\(\s*\d{1,3}%?(?:\s+|,\s*)\d{1,3}%?(?:\s+|,\s*)\d{1,3}%?(?:\s*[,/]\s*(?:0|1|0?\.\d+|\d{1,3}%))?\s*\)$/i;
const HSL_COLOR_RE =
  /^hsla?\(\s*\d{1,3}(?:deg|rad|grad|turn)?(?:\s+|,\s*)\d{1,3}%(?:\s+|,\s*)\d{1,3}%(?:\s*[,/]\s*(?:0|1|0?\.\d+|\d{1,3}%))?\s*\)$/i;
const NAMED_COLOR_RE = /^[a-zA-Z]{1,32}$/;

export function sanitizeCssColor(color: string): string {
  if (typeof color !== 'string') return DEFAULT_COLOR;
  const trimmed = color.trim();
  if (
    HEX_COLOR_RE.test(trimmed) ||
    RGB_COLOR_RE.test(trimmed) ||
    HSL_COLOR_RE.test(trimmed) ||
    NAMED_COLOR_RE.test(trimmed)
  ) {
    return trimmed;
  }
  return DEFAULT_COLOR;
}

function sanitizeDimension(value: number | undefined, fallback: number, min: number, max: number): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

function getNormalizedOptions(options: TriangleOptions) {
  return {
    direction: options.direction,
    type: options.type,
    size: sanitizeDimension(options.size, 16, 1, 200),
    color: sanitizeCssColor(options.color),
    bubbleWidth: sanitizeDimension(options.bubbleWidth, 240, 40, 1200),
    bubblePadding: sanitizeDimension(options.bubblePadding, 16, 0, 200),
    bubbleRadius: sanitizeDimension(options.bubbleRadius, 8, 0, 200),
  };
}

export function getCssTriangleBubblePreviewStyles(options: TriangleOptions): {
  containerStyle: CSSProperties;
  tailStyle?: CSSProperties;
} {
  const { direction, size, color, type, bubbleWidth, bubblePadding, bubbleRadius } = getNormalizedOptions(options);

  if (type === 'triangle') {
    const borderWidthMap: Record<TriangleDirection, string> = {
      top: `0 ${size}px ${size}px ${size}px`,
      bottom: `${size}px ${size}px 0 ${size}px`,
      left: `${size}px ${size}px ${size}px 0`,
      right: `${size}px 0 ${size}px ${size}px`,
    };
    const borderColorMap: Record<TriangleDirection, string> = {
      top: `transparent transparent ${color} transparent`,
      bottom: `${color} transparent transparent transparent`,
      left: `transparent ${color} transparent transparent`,
      right: `transparent transparent transparent ${color}`,
    };

    return {
      containerStyle: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: borderWidthMap[direction],
        borderColor: borderColorMap[direction],
      },
    };
  }

  const tailPositions: Record<TriangleDirection, Pick<CSSProperties, 'top' | 'bottom' | 'left' | 'right' | 'borderColor'>> = {
    top: { bottom: '100%', left: '24px', borderColor: `transparent transparent ${color} transparent` },
    bottom: { top: '100%', left: '24px', borderColor: `${color} transparent transparent transparent` },
    left: { right: '100%', top: '20px', borderColor: `transparent ${color} transparent transparent` },
    right: { left: '100%', top: '20px', borderColor: `transparent transparent transparent ${color}` },
  };

  return {
    containerStyle: {
      position: 'relative',
      backgroundColor: color,
      borderRadius: `${bubbleRadius}px`,
      width: `${bubbleWidth}px`,
      padding: `${bubblePadding}px`,
      color: '#ffffff',
      fontFamily: 'system-ui, sans-serif',
    },
    tailStyle: {
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: `${size}px`,
      ...tailPositions[direction],
    },
  };
}

export function generateCssTriangle(options: TriangleOptions): { css: string; html: string } {
  const { direction, size, color, type, bubbleWidth, bubblePadding, bubbleRadius } = getNormalizedOptions(options);

  if (type === 'triangle') {
    let borderWidths = '';
    let borderColors = '';

    switch (direction) {
      case 'top':
        borderWidths = '0 ' + size + 'px ' + size + 'px ' + size + 'px';
        borderColors = 'transparent transparent ' + color + ' transparent';
        break;
      case 'bottom':
        borderWidths = size + 'px ' + size + 'px 0 ' + size + 'px';
        borderColors = color + ' transparent transparent transparent';
        break;
      case 'left':
        borderWidths = size + 'px ' + size + 'px ' + size + 'px 0';
        borderColors = 'transparent ' + color + ' transparent transparent';
        break;
      case 'right':
        borderWidths = size + 'px 0 ' + size + 'px ' + size + 'px';
        borderColors = 'transparent transparent transparent ' + color;
        break;
    }

    const css = '.css-triangle {\n  width: 0;\n  height: 0;\n  border-style: solid;\n  border-width: ' + borderWidths + ';\n  border-color: ' + borderColors + ';\n}';
    const html = '<div class="css-triangle"></div>';
    return { css, html };
  }

  // Speech bubble
  const tailPos = direction === 'top' ? 'bottom: 100%; left: 24px;' : direction === 'bottom' ? 'top: 100%; left: 24px;' : direction === 'left' ? 'right: 100%; top: 20px;' : 'left: 100%; top: 20px;';
  const tailSide = direction === 'top' ? 'bottom' : direction === 'bottom' ? 'top' : direction === 'left' ? 'right' : 'left';

  const css = '.speech-bubble {\n  position: relative;\n  background: ' + color + ';\n  border-radius: ' + bubbleRadius + 'px;\n  width: ' + bubbleWidth + 'px;\n  padding: ' + bubblePadding + 'px;\n  color: #ffffff;\n  font-family: system-ui, sans-serif;\n}\n\n.speech-bubble::after {\n  content: \'\';\n  position: absolute;\n  ' + tailPos + '\n  width: 0;\n  height: 0;\n  border: ' + size + 'px solid transparent;\n  border-' + tailSide + '-color: ' + color + ';\n}';

  const html = '<div class="speech-bubble">Hello! This is a pure CSS speech bubble tooltip.</div>';
  return { css, html };
}
