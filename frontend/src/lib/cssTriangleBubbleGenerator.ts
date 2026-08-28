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

export function generateCssTriangle(options: TriangleOptions): { css: string; html: string } {
  const { direction, size, color, type, bubbleWidth = 240, bubblePadding = 16, bubbleRadius = 8 } = options;

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
