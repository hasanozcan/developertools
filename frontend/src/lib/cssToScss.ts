export function convertCssToScss(css: string): string {
  return css.replace(/([a-zA-Z0-9_\.-]+)\s+([a-zA-Z0-9_\.-]+)\s*\{/g, '$1 {\n  $2 {').trim();
}
