export interface ScrollbarOptions {
  width: number; // px (4 - 24)
  thumbColor: string;
  thumbHoverColor: string;
  trackColor: string;
  borderRadius: number; // px (0 - 20)
}

export const DEFAULT_SCROLLBAR: ScrollbarOptions = {
  width: 10,
  thumbColor: '#6366f1',
  thumbHoverColor: '#4f46e5',
  trackColor: '#1e293b',
  borderRadius: 8,
};

export function generateScrollbarCss(options: ScrollbarOptions): string {
  return `/* Modern CSS Scrollbar Standards (Firefox & Modern Chrome/Edge) */
* {
  scrollbar-width: ${options.width <= 8 ? 'thin' : 'auto'};
  scrollbar-color: ${options.thumbColor} ${options.trackColor};
}

/* WebKit / Chromium Browsers */
::-webkit-scrollbar {
  width: ${options.width}px;
  height: ${options.width}px;
}

::-webkit-scrollbar-track {
  background: ${options.trackColor};
  border-radius: ${options.borderRadius}px;
}

::-webkit-scrollbar-thumb {
  background: ${options.thumbColor};
  border-radius: ${options.borderRadius}px;
}

::-webkit-scrollbar-thumb:hover {
  background: ${options.thumbHoverColor};
}`;
}
