export function convertJsxToHtml(jsx: string): string {
  return jsx
    .replace(/className=/g, 'class=')
    .replace(/htmlFor=/g, 'for=')
    .replace(/\{\/\*([\s\S]*?)\*\/\}/g, '<!--$1-->');
}
